// src/dto/note-id.dto.ts
import { z } from "zod";

export const NoteIdDtoSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
});

export type NoteIdDto = z.infer<typeof NoteIdDtoSchema>;
