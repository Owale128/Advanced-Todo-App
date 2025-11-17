import { useState } from "react";
import { TodosContextValue } from "../models/TodosContextValue";
import { Todo } from "../models/Todo";
import { addTodo, toggleTodo } from "../utils/todoUtilities";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd: TodosContextValue["add"] = (text) => {
    setTodos((prev) => addTodo(prev, text));
  };

  const handleToggle: TodosContextValue["toggle"] = (id) => {
    setTodos((prev) => toggleTodo(prev, id))
  }
  return <div></div>;
};

export default TodoApp;
