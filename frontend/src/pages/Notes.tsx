import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface Note {
    id: number;
    title: string;
    content: string;
}

function Notes() {
    const [notes, setNotes] = useState<Note[] | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function loadNotes() {
        try {
            const res = await api.get<{ success: boolean; data: Note[] }>("/notes");
            setNotes(res.data.data);
        } catch (err: any) {
            if (err.response?.status === 401) {
                navigate("/login");
            } else {
                console.error(err);
            }
        }
    }

    async function addNote(e: React.FormEvent) {
        e.preventDefault();
        try {
            await api.post("/notes", { title, content });
            setTitle("");
            setContent("");
            loadNotes();
        } catch (err: any) {
            if (err.response?.status === 401) return navigate("/login");
            console.error(err);
        }
    }

    async function deleteNote(id: number) {
        try {
            await api.delete(`/notes/${id}`);
            loadNotes();
        } catch (err: any) {
            if (err.response?.status === 401) return navigate("/login");
            console.error(err);
        }
    }

    useEffect(() => {
        loadNotes();
    }, []);

    if (notes === null)
        return (
            <div className="container mt-5 text-center text-muted fs-4">
                Loading...
            </div>
        );

    return (
        <div className="container mt-4" style={{ maxWidth: "650px" }}>
            <h2 className="text-center mb-4">📝 我的筆記</h2>

            {/* 新增筆記表單 */}
            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={addNote}>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="標題"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                placeholder="內容"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="form-control"
                                rows={4}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            ➕ 新增筆記
                        </button>
                    </form>
                </div>
            </div>

            {/* Notes 列表 */}
            <div className="d-flex flex-column gap-3">
                {notes.map((n) => (
                    <div className="card" key={n.id}>
                        <div className="card-body">
                            <h5 className="card-title">{n.title}</h5>
                            <p className="card-text">{n.content}</p>

                            <button
                                onClick={() => deleteNote(n.id)}
                                className="btn btn-danger btn-sm"
                            >
                                刪除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;
