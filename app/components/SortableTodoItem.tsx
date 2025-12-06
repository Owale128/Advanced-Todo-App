import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { SortableTodoItemProps } from "../models/SortableTodoItemProps";
import { Priority } from "../models/Todo";

const SortableTodoItem = ({ todo, toggle, remove, updatePriority }: SortableTodoItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todo._id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  const cyclePriority = () => {
    const priorities: Priority[] = ["low", "medium", "high"];
    const currentIndex = priorities.indexOf(todo.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    updatePriority(todo._id, priorities[nextIndex]);
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-2 py-3 border-b border-gray-200 dark:border-gray-600 group"
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
       <div className="flex items-center justify-between text-xs">
        <motion.button
          {...attributes}
          {...listeners}
          className="cursor-grab mb-1 active:cursor-grabbing text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition text-xl"
          aria-label="Drag handle"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ☰
        </motion.button>
        <motion.button
          onClick={cyclePriority}
          className={`inline-block w-3 h-3 rounded-full cursor-pointer ${priorityColors[todo.priority]}`}
          title={`Prioritet: ${todo.priority} (klicka för att ändra)`}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9, rotate: 180 }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggle(todo._id)}
          className="w-4 h-4 cursor-pointer accent-gray-700 dark:accent-gray-400"
        />
        <motion.span
          className={`flex-1 text-lg wrap-break-word overflow-hidden text-center ${
            todo.done
              ? "line-through text-red-800 dark:text-red-500"
              : "text-gray-950 dark:text-white"
          }`}
          animate={{ opacity: todo.done ? 0.6 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {todo.text}
        </motion.span>
        <motion.button
          onClick={() => remove(todo._id)}
          className="text-gray-600 dark:text-gray-300 text-3xl hover:text-gray-400 dark:hover:text-gray-500 transition duration-150 cursor-pointer"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          x
        </motion.button>
      </div>
    </motion.li>
  );
};

export default SortableTodoItem;
