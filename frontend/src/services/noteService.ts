import api from "../api/axios";
import type { Note, ApiResponse } from "../types/note.ts";

export async function getNotes(): Promise<Note[]> {
  const res = await api.get<ApiResponse<Note[]>>("/notes");
  return res.data.data;
}

export async function createNote(
  title: string,
  content: string
): Promise<void> {
  await api.post("/notes", { title, content });
}

export async function deleteNoteById(id: number): Promise<void> {
  await api.delete(`/notes/${id}`);
}
