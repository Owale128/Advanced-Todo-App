import { Todo } from "../models/Todo";

export function addTodo(todos: Todo[], text: string): Todo[] {

    text = text.trim();

    const newTodo: Todo = {
        id: todos.length + 1,
        text,
        done: false
    }
    return [...todos, newTodo];
}