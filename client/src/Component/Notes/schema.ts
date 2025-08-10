// schemas/noteSchema.ts
import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export type NoteFormData = z.infer<typeof noteSchema>;
// src/types/Note.ts
export interface Note {
    _id: string;
    title: string;
    content: string;
    createdAt: string; // ISO date string
  }
  