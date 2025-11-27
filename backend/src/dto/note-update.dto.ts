// src/dto/note-update.dto.ts
import { z } from "zod";

export const UpdateNoteDtoSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
}).refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field must be provided" }
);

export type UpdateNoteDto = z.infer<typeof UpdateNoteDtoSchema>;
