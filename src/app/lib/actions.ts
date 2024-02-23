import { z } from 'zod';

export const GoalSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  categoryId: z.string().min(1, { message: 'Category is required.' }),
  description: z.string(),
  status: z.string().min(1, { message: 'Status is required.' }),
});