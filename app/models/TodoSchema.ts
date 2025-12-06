import mongoose, { Document } from "mongoose";
import { TodoSchema } from "@/lib/schemas/todo";

export type Priority = "low" | "medium" | "high";

export interface TodoSchemaModel extends Document {
  userId: mongoose.Types.ObjectId;
  text: string;
  done: boolean;
  order: number;
  priority: Priority;
  category: string;
  dueDate: Date | null;
  createdAt: Date;
}

export default mongoose.models.Todo || mongoose.model<TodoSchemaModel>("Todo", TodoSchema);
