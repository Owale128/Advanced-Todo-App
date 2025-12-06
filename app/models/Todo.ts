export type Priority = "low" | "medium" | "high";

export interface Todo {
  _id: string;
  text: string;
  done: boolean;
  order: number;
  priority: Priority;
  category: string;
  dueDate: string | null;
}