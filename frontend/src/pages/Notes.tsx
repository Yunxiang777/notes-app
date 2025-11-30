import { useState } from "react";
import { useNotes } from "../hooks/useNotes";

function Notes() {
  const { notes, loading, add, remove } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await add(title, content);
    setTitle("");
    setContent("");
  }

  if (loading || notes === null)
    return <div className="container mt-5 text-center fs-4">Loading...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "650px" }}>
      <h2 className="text-center mb-4">📝 我的筆記</h2>

      {/* 新增筆記 */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="標題"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="內容"
                value={content}
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              ➕ 新增筆記
            </button>
          </form>
        </div>
      </div>

      {/* 列表 */}
      <div className="d-flex flex-column gap-3">
        {notes.map((n) => (
          <div key={n.id} className="card">
            <div className="card-body">
              <h5 className="card-title">{n.title}</h5>
              <p className="card-text">{n.content}</p>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => remove(n.id)}
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
