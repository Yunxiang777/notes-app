// src/dto/note-create.dto.ts
import { z } from "zod";

export const CreateNoteDtoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().optional(),
});

export type CreateNoteDto = z.infer<typeof CreateNoteDtoSchema>;
