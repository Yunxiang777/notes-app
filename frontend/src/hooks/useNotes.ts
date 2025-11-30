import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Note } from "../types/note";
import { getNotes, createNote, deleteNoteById } from "../services/noteService";
import { AxiosError } from "axios";

export function useNotes() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function isAxiosError(error: unknown): error is AxiosError {
    return !!(error && typeof error === "object" && "isAxiosError" in error);
  }

  async function load() {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 401) navigate("/login");
      } else {
        console.error("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  async function add(title: string, content: string) {
    await createNote(title, content);
    load();
  }

  async function remove(id: number) {
    if (!confirm("確定要刪除？")) return;
    await deleteNoteById(id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return { notes, loading, add, remove };
}
