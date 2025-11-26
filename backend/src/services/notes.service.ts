import { pool } from "../db";

export interface NotePayload {
    title?: string;
    content?: string;
}

export async function listNotes(userId: number) {
    const conn = await pool.getConnection();
    try {
        const [rows]: any = await conn.query("SELECT id, title, content, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC", [userId]);
        return rows;
    } finally {
        conn.release();
    }
}

export async function createNote(userId: number, title: string, content: string) {
    if (!title) throw { status: 400, message: "Title required" };
    const conn = await pool.getConnection();
    try {
        const [result]: any = await conn.query("INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)", [userId, title, content]);
        const id = result.insertId;
        const [rows]: any = await conn.query("SELECT id, title, content, created_at, updated_at FROM notes WHERE id = ?", [id]);
        return rows[0];
    } finally {
        conn.release();
    }
}

export async function getNote(userId: number, id: number) {
    const conn = await pool.getConnection();
    try {
        const [rows]: any = await conn.query("SELECT id, title, content, created_at, updated_at, user_id FROM notes WHERE id = ?", [id]);
        if (rows.length === 0) throw { status: 404, message: "Note not found" };
        const note = rows[0];
        if (note.user_id !== userId) throw { status: 403, message: "Forbidden" };
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            created_at: note.created_at,
            updated_at: note.updated_at
        };
    } finally {
        conn.release();
    }
}

export async function updateNote(userId: number, id: number, payload: NotePayload) {
    const conn = await pool.getConnection();
    try {
        const [rows]: any = await conn.query("SELECT user_id FROM notes WHERE id = ?", [id]);
        if (rows.length === 0) throw { status: 404, message: "Note not found" };
        if (rows[0].user_id !== userId) throw { status: 403, message: "Forbidden" };

        const updates: string[] = [];
        const values: any[] = [];

        if (payload.title !== undefined) { updates.push("title = ?"); values.push(payload.title); }
        if (payload.content !== undefined) { updates.push("content = ?"); values.push(payload.content); }

        if (updates.length === 0) throw { status: 400, message: "Nothing to update" };

        values.push(id);
        await conn.query(`UPDATE notes SET ${updates.join(", ")} WHERE id = ?`, values);

        const [newRows]: any = await conn.query("SELECT id, title, content, created_at, updated_at FROM notes WHERE id = ?", [id]);
        return newRows[0];
    } finally {
        conn.release();
    }
}

export async function deleteNote(userId: number, id: number) {
    const conn = await pool.getConnection();
    try {
        const [rows]: any = await conn.query("SELECT user_id FROM notes WHERE id = ?", [id]);
        if (rows.length === 0) throw { status: 404, message: "Note not found" };
        if (rows[0].user_id !== userId) throw { status: 403, message: "Forbidden" };
        await conn.query("DELETE FROM notes WHERE id = ?", [id]);
    } finally {
        conn.release();
    }
}
