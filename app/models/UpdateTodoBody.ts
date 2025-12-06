import { Priority } from "./Todo";

export interface UpdateTodoBody {
  done?: boolean;
  text?: string;
  priority?: Priority;
  category?: string;
  dueDate?: string | null;
}
