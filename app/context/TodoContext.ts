import { createContext } from "react";
import { TodosContextValue } from "../models/TodosContextValue";

export const TodosContext = createContext<TodosContextValue>({
todos: [],
add: () => {},
toggle: () => {},
remove: () => {},
updateOrder: () => {},
updatePriority: () => {}
})