import { AddTodoViewProps } from "@/app/models/AddTodoViewProps";
import { Priority } from "@/app/models/Todo";
import { motion } from "framer-motion";

const AddTodoView = ({
  handleSubmit,
  inputValue,
  setInputValue,
  priority,
  setPriority,
  priorityColors
}: AddTodoViewProps) => {

  return (
    <form onSubmit={handleSubmit} className="pb-4 -mb-4 border-b border-gray-300 dark:border-gray-600 space-y-3">
      <h2 className="text-center text-lg font-semibold">Prioritet</h2>
      <div className="flex justify-center gap-2 mb-8">
        {(["low", "medium", "high"] as Priority[]).map((p) => (
          <motion.button
            key={p}
            type="button"
            onClick={() => setPriority(p)}
            className={`px-4 py-1.5 rounded text-sm font-medium text-white transition cursor-pointer ${
              priority === p
                ? priorityColors[p].selected
                : priorityColors[p].base
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: priority === p ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {p === "low" ? "Låg" : p === "medium" ? "Medium" : "Hög"}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <motion.input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Lägg till en uppgift..."
          maxLength={100}
          className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-lg dark:text-white"
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        />
        <motion.button
          type="submit"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 text-sm uppercase tracking-wide cursor-pointer font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          + Lägg till
        </motion.button>
      </div>
    </form>
  );
};

export default AddTodoView;
