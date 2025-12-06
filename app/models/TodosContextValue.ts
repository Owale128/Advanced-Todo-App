import { Todo, Priority } from "./Todo";

export interface TodosContextValue {
    todos: Todo[];
    add: (text: string, priority?: Priority, category?: string, dueDate?: string | null) => void;
    toggle: (id: string) => void;
    remove: (id: string) => void;
    updateOrder: (todos: Todo[]) => void;
    updatePriority: (id: string, priority: Priority) => void;
}