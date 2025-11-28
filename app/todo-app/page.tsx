"use client";
import { Todo } from "../models/Todo";
import Todos from "../components/Todos";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import AddTodo from "../components/addTodo/AddTodo";
import { TodosContext } from "../context/TodoContext";
import { TodosContextValue } from "../models/TodosContextValue";
import { addTodo, removeTodo, toggleTodo } from "../utils/todoUtilities";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
      <main className="flex items-center justify-center min-h-screen p-4 bg-[#F5F6F8]">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl p-6 md:p-12 space-y-8">
          <Header />
          <AddTodo />
          <Todos />
        </div>
      </main>
    </TodosContext.Provider>
  );
};

export default TodoApp;
