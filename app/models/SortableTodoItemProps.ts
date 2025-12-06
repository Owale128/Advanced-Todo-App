import { Priority, Todo } from "./Todo";

export interface SortableTodoItemProps {
  todo: Todo;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  updatePriority: (id: string, priority: Priority) => void;
}