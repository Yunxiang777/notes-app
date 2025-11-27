// src/controllers/notes.controller.ts
import { Response, NextFunction } from "express";
import * as notesService from "../services/notes.service";
import { AuthRequest } from "../types/auth";
import { CreateNoteDto } from "../dto/note-create.dto";
import { UpdateNoteDto } from "../dto/note-update.dto";
import { NoteIdDto } from "../dto/note-id.dto";

export async function listNotes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const notes = await notesService.listNotes(req.user!.id);
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

export async function createNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const body = req.body as CreateNoteDto;
        const note = await notesService.createNote(req.user!.id, body.title, body.content ?? "");
        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
}

export async function getNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const params = req.params as NoteIdDto;
        const note = await notesService.getNote(req.user!.id, Number(params.id));
        res.json(note);
    } catch (err) {
        next(err);
    }
}

export async function updateNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const params = req.params as NoteIdDto;
        const body = req.body as UpdateNoteDto;
        const note = await notesService.updateNote(req.user!.id, Number(params.id), body);
        res.json(note);
    } catch (err) {
        next(err);
    }
}

export async function deleteNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const params = req.params as NoteIdDto;
        await notesService.deleteNote(req.user!.id, Number(params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
