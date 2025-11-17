"use client";
import { useState } from "react";
import { TodosContextValue } from "../models/TodosContextValue";
import { Todo } from "../models/Todo";
import { addTodo, removeTodo, toggleTodo } from "../utils/todoUtilities";
import { TodosContext } from "../context/TodoContext";
import Header from "./Header";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd: TodosContextValue["add"] = (text) => {
    setTodos((prev) => addTodo(prev, text));
  };

  const handleToggle: TodosContextValue["toggle"] = (id) => {
    setTodos((prev) => toggleTodo(prev, id));
  };

  const handleRemove: TodosContextValue["remove"] = (id: number) => {
    setTodos((prev) => removeTodo(prev, id));
  };

  const value: TodosContextValue = {
    todos,
    add: handleAdd,
    toggle: handleToggle,
    remove: handleRemove,
  };

  return (
    <TodosContext.Provider value={value}>
      <div className="space-y-8">
        <Header />
        <AddTodo />
        <Todos />
      </div>
    </TodosContext.Provider>
  );
};

export default TodoApp;
