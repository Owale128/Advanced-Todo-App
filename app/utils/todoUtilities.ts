import { Todo } from "../models/Todo";

export const addTodo = (todos: Todo[], text: string): Todo[] => {
  text = text.trim();

  if (text === "") {
    return todos;
  }

  const maxOrder = todos.length > 0 ? Math.max(...todos.map(t => t.order)) : -1;
  const newOrder = maxOrder + 1;

  const newTodo: Todo = {
    _id: String(todos.length + 1),
    text,
    done: false,
    order: newOrder,
    priority: "medium",
    category: "General",
    dueDate: null,
  };
  return [...todos, newTodo];
};

export const toggleTodo = (todo: Todo[], id: string): Todo[] => {
  return todo.map((todo) =>
    todo._id === id ? { ...todo, done: !todo.done } : todo
  );
};

export const removeTodo = (todos: Todo[], id: string): Todo[] => {
  return todos.filter((todo) => todo._id !== id);
};
