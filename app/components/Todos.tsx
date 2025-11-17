import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";

const Todos = () => {
  const { todos, toggle, remove } = useContext(TodosContext);
  return (
    <ul className="font-medium text-2xl">
      {todos.map((todo) => (
        <li className={todo.done ? "line-through" : ""} key={todo.id}>
          <span className="cursor-pointer">
            {todo.text}
          </span>
          <button onClick={() => toggle(todo.id)} className="mx-6 cursor-pointer">Done</button>
          <button
            onClick={() => remove(todo.id)}
            className="cursor-pointer hover:bg-black hover:text-white transition duration-200"
          >
            Ta bort
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Todos;
