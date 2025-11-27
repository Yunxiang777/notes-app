import { Router } from "express";
import * as notesController from "../controllers/notes.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { CreateNoteDtoSchema } from "../dto/note-create.dto";
import { UpdateNoteDtoSchema } from "../dto/note-update.dto";
import { NoteIdDtoSchema } from "../dto/note-id.dto";
import { validateDto } from "../middlewares/validate.middleware";

const router = Router();

router.use(requireAuth);

router.get("/", notesController.listNotes);
router.post("/", validateDto(CreateNoteDtoSchema), notesController.createNote);
router.get("/:id", validateDto(NoteIdDtoSchema, "params"), notesController.getNote);
router.put("/:id", validateDto(UpdateNoteDtoSchema), notesController.updateNote);
router.delete("/:id", validateDto(NoteIdDtoSchema, "params"), notesController.deleteNote);

export default router;
