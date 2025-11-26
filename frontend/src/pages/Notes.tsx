import { useEffect, useState } from "react";
import api from "../api/axios";

interface Note {
    id: number;
    title: string;
    content: string;
}

function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function loadNotes() {
        const res = await api.get("/notes");
        setNotes(res.data);
    }

    async function addNote(e: React.FormEvent) {
        e.preventDefault();
        await api.post("/notes", { title, content });
        setTitle("");
        setContent("");
        loadNotes();
    }

    async function deleteNote(id: number) {
        await api.delete(`/notes/${id}`);
        loadNotes();
    }

    useEffect(() => {
        loadNotes();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>我的筆記</h2>

            <form onSubmit={addNote}>
                <input
                    placeholder="標題"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br />

                <textarea
                    placeholder="內容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                /><br />

                <button type="submit">新增筆記</button>
            </form>

            <hr />

            <ul>
                {notes.map((n) => (
                    <li key={n.id}>
                        <strong>{n.title}</strong><br />
                        {n.content}<br />
                        <button onClick={() => deleteNote(n.id)}>刪除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notes;
