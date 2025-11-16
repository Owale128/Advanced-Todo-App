import { Todo } from "./Todo";

export interface TodosContextValue {
    todos: Todo[];
    addTodo: (title: string) => void;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}