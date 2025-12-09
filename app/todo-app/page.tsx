"use client";
import axios from "axios";
import { Todo } from "../models/Todo";
import Todos from "../components/Todos";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddTodo from "../components/addTodo/AddTodo";
import { TodosContext } from "../context/TodoContext";
import { TodosContextValue } from "../models/TodosContextValue";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todos");
        setTodos(response.data.todos);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push("/");
        } else {
          console.error("Fetch todos error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [router]);

  const handleAdd: TodosContextValue["add"] = async (text, priority, category, dueDate) => {
    try {
      const response = await axios.post("/api/todos", {
        text,
        priority: priority || "medium",
        category: category || "General",
        dueDate: dueDate || null
      });
      setTodos((prev) => [response.data.todo, ...prev]);
    } catch (error) {
      console.error("Add todo error:", error);
      alert("Kunde inte lägga till todo");
    }
  };

  const handleToggle: TodosContextValue["toggle"] = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`);
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? response.data.todo : todo
        )
      );
    } catch (error) {
      console.error("Toggle todo error:", error);
      alert("Kunde inte uppdatera todo");
    }
  };

  const handleRemove: TodosContextValue["remove"] = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Remove todo error:", error);
      alert("Kunde inte ta bort todo");
    }
  };

  const handleUpdateOrder: TodosContextValue["updateOrder"] = async (reorderedTodos) => {
    try {
      const todosWithOrder = reorderedTodos.map((todo, index) => ({
        _id: todo._id,
        order: index,
      }));

      await axios.put("/api/todos", { todos: todosWithOrder });
      setTodos(reorderedTodos);
    } catch (error) {
      console.error("Update order error:", error);
      alert("Kunde inte uppdatera ordningen");
    }
  };

  const handleUpdatePriority: TodosContextValue["updatePriority"] = async (id, priority) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, { priority });
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? response.data.todo : todo
        )
      );
    } catch (error) {
      console.error("Update priority error:", error);
      alert("Kunde inte uppdatera prioritet");
    }
  };

  const value: TodosContextValue = {
    todos,
    add: handleAdd,
    toggle: handleToggle,
    remove: handleRemove,
    updateOrder: handleUpdateOrder,
    updatePriority: handleUpdatePriority,
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen p-4 bg-[#F5F6F8] dark:bg-gray-900">
        <div className="flex items-center gap-3 text-xl text-gray-900 dark:text-gray-200">
          <div
            className="h-6 w-6 rounded-full border-4 border-gray-300 border-t-gray-700 dark:border-gray-700 dark:border-t-gray-200 animate-spin"
            aria-label="Laddar"
          />
          <span>Laddar...</span>
        </div>
      </main>
    );
  }

  return (
    <TodosContext.Provider value={value}>
      <main className="flex items-center justify-center min-h-screen p-4 bg-[#F5F6F8] dark:bg-gray-900">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 md:p-12 space-y-8 relative">
          <Header />
          <AddTodo />
          <Todos />
        </div>
      </main>
    </TodosContext.Provider>
  );
};

export default TodoApp;
