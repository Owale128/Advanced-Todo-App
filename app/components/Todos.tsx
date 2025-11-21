import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";

const Todos = () => {
  const { todos, toggle, remove } = useContext(TodosContext);
  return (
    <ul className="space-y-0">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-3 md:gap-6 py-3 border-b border-gray-200 group"
        >
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggle(todo.id)}
            className="w-5 h-5 cursor-pointer accent-gray-700"
          />
          <span
            className={`flex-1 text-xl text-center wrap-break-word overflow-hidden ${
              todo.done
                ? "line-through text-red-800"
                : "text-green-800"
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => remove(todo.id)}
            className="text-gray-600 text-3xl hover:text-gray-400 transition duration-150 cursor-pointer"
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Todos;
