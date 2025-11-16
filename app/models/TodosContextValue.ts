import { Todo } from "./Todo";

export interface TodosContextValue {
    todos: Todo[];
    add: (title: string) => void;
    toggle: (id: number) => void;
    remove: (id: number) => void;
}