import { Document } from 'mongoose';

export interface Goal extends Document {
  userId: string;
  title: string;
  categoryId: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  status: string;
}