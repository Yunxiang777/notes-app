import { Router } from "express";
import * as notesController from "../controllers/notes.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

router.use(requireAuth);

router.get("/", notesController.listNotes);
router.post("/", notesController.createNote);
router.get("/:id", notesController.getNote);
router.put("/:id", notesController.updateNote);
router.delete("/:id", notesController.deleteNote);

export default router;
