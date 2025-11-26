import { Response, NextFunction } from "express";
import * as notesService from "../services/notes.service";
import { AuthRequest } from "../middlewares/auth.middleware";

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
        const { title, content } = req.body;
        const note = await notesService.createNote(req.user!.id, title, content);
        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
}

export async function getNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const note = await notesService.getNote(req.user!.id, Number(req.params.id));
        res.json(note);
    } catch (err) {
        next(err);
    }
}

export async function updateNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const payload = req.body;
        const note = await notesService.updateNote(req.user!.id, Number(req.params.id), payload);
        res.json(note);
    } catch (err) {
        next(err);
    }
}

export async function deleteNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        await notesService.deleteNote(req.user!.id, Number(req.params.id));
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
