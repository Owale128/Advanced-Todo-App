import { Menu } from "lucide-react";
import ConfirmDialog from "../ConfirmDialog";
import { motion } from "framer-motion";
import { SortableTodoItemViewProps } from "@/app/models/SortableTodoItemViewProps";

const SortableTodoItemView = ({
  todo,
  style,
  setNodeRef,
  attributes,
  listeners,
  priorityColors,
  toggle,
  remove,
  cyclePriority,
  showDeleteConfirm,
  setShowDeleteConfirm,
}: SortableTodoItemViewProps) => {
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
          <Menu size={20} />
        </motion.button>
        <motion.button
          onClick={cyclePriority}
          className={`inline-block w-4 h-4 md:w-3 md:h-3 rounded-full cursor-pointer ${
            priorityColors[todo.priority]
          }`}
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
          className="w-5 h-5 md:w-4 md:h-4 cursor-pointer accent-gray-700 dark:accent-gray-400"
        />
        <motion.span
          className={`flex-1 text-xl wrap-break-word overflow-hidden text-center px-2 sm:px-6 ${
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
          onClick={() => setShowDeleteConfirm(true)}
          className="text-gray-600 dark:text-gray-300 text-3xl hover:text-gray-400 dark:hover:text-gray-500 transition duration-150 cursor-pointer"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          x
        </motion.button>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Ta bort todo?"
        message="Är du säker på att du vill ta bort denna uppgift?"
        confirmText="Ta bort"
        cancelText="Avbryt"
        onConfirm={() => {
          remove(todo._id);
          setShowDeleteConfirm(false);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </motion.li>
  );
};

export default SortableTodoItemView;
