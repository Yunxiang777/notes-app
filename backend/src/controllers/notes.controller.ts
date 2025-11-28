import { Response, NextFunction } from "express";
import * as notesService from "../services/notes.service";
import { AuthRequest } from "../types/auth";
import { CreateNoteDto } from "../dto/note-create.dto";
import { UpdateNoteDto } from "../dto/note-update.dto";
import { NoteIdDto } from "../dto/note-id.dto";

// 所有
export async function listNotes(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const notes = await notesService.listNotes(req.user!.id);
    return res.json({ success: true, data: notes });
  } catch (err) {
    next(err);
  }
}

// 新增
export async function createNote(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body as CreateNoteDto;
    const note = await notesService.createNote(
      req.user!.id,
      body.title,
      body.content ?? ""
    );
    return res.status(201).json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
}

// 取得目標
export async function getNote(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const params = req.params as NoteIdDto;
    const note = await notesService.getNote(req.user!.id, Number(params.id));
    return res.json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
}

// 更新
export async function updateNote(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const params = req.params as NoteIdDto;
    const body = req.body as UpdateNoteDto;
    const note = await notesService.updateNote(
      req.user!.id,
      Number(params.id),
      body
    );
    return res.json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
}

// 刪除
export async function deleteNote(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const params = req.params as NoteIdDto;
    await notesService.deleteNote(req.user!.id, Number(params.id));
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
