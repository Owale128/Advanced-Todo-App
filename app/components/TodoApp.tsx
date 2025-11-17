import { useState } from "react";
import { TodosContextValue } from "../models/TodosContextValue";
import { Todo } from "../models/Todo";
import { addTodo } from "../utils/todoUtilities";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd: TodosContextValue["add"] = (text) => {
    setTodos((prev) => addTodo(prev, text));
  };

  return <div></div>;
};

export default TodoApp;
