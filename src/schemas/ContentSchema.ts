// schemas/ContentSchema.ts
import { z } from "zod";

export const ContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Invalid link"),
  description: z.string().max(500, "Max 300 characters").min(1,"description is required"),
  tags: z.array(z.string()).max(3, "Max 3 tags allowed.").min(1,'tags required'),
});

export type ContentFormData = z.infer<typeof ContentSchema>;
