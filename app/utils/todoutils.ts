import { Todo } from "../models/Todo";

export function addTodo(todos: Todo[], text: string): Todo[] {

    text = text.trim();

    if(text === "") {
        return todos
    }

    const newTodo: Todo = {
        id: todos.length + 1,
        text,
        done: false
    }
    return [...todos, newTodo];
}

export const toggleTodo = (todo: Todo[], id: number): Todo[] => {

    throw new Error("Not implemented yet")
}