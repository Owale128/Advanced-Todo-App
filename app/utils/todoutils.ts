import { Todo } from "../models/Todo";

export function addTodo(todos: Todo[], text: string): Todo[] {

    const newTodo: Todo = {
        id: todos.length + 1,
        text,
        done: false
    }
    return [...todos, newTodo];
}