import { createContext } from "react";
import { TodosContextValue } from "../models/TodosContextValue";

export const TodosContext = createContext<TodosContextValue>({
todos: [],
addTodo: () => {},
toggleTodo: () => {},
removeTodo: () => {}
})