import { Router } from "express";
import * as notesController from "../controllers/notes.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { CreateNoteDtoSchema } from "../dto/note-create.dto";
import { UpdateNoteDtoSchema } from "../dto/note-update.dto";
import { NoteIdDtoSchema } from "../dto/note-id.dto";
import { validateDto } from "../middlewares/validate.middleware";

const router = Router();

router.use(requireAuth);

router.get("/", notesController.listNotes); //取得所有
router.post("/", validateDto(CreateNoteDtoSchema), notesController.createNote); //新增資料
router.get("/:id", validateDto(NoteIdDtoSchema, "params"), notesController.getNote); //取得資料
router.put("/:id", validateDto(UpdateNoteDtoSchema), notesController.updateNote); //更新資料
router.delete("/:id", validateDto(NoteIdDtoSchema, "params"), notesController.deleteNote); //刪除資料

export default router;
