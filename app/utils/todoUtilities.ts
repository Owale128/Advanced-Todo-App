import { Todo } from "../models/Todo";

export const addTodo = (todos: Todo[], text: string): Todo[] => {
  text = text.trim();

  if (text === "") {
    return todos;
  }

  const newTodo: Todo = {
    id: todos.length + 1,
    text,
    done: false,
  };
  return [...todos, newTodo];
};

export const toggleTodo = (todo: Todo[], id: number): Todo[] => {
  return todo.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
};

export const removeTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.filter((todo) => todo.id !== id);
};
