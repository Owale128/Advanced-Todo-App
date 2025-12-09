import { TodosContext } from "@/app/context/TodoContext";
import { Priority } from "@/app/models/Todo";
import { FormEvent, useContext, useState } from "react";
import AddTodoView from "./AddTodoView";
import { toast } from "sonner";

const AddTodo = () => {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState<Priority | undefined>(undefined);
  const { add } = useContext(TodosContext);

    const priorityColors = {
    low: {
      base: "bg-green-500 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-600",
      selected: "bg-green-600 dark:bg-green-700 ring-2 ring-green-800 dark:ring-green-300"
    },
    medium: {
      base: "bg-yellow-500 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600",
      selected: "bg-yellow-600 dark:bg-yellow-700 ring-2 ring-yellow-800 dark:ring-yellow-300"
    },
    high: {
      base: "bg-red-500 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600",
      selected: "bg-red-600 dark:bg-red-700 ring-2 ring-red-800 dark:ring-red-300"
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      toast.error("Du måste skriva en uppgift!");
      return;
    }

    if (!priority) {
      toast.error("Du måste välja en prioritet!");
      return;
    }

    add(inputValue, priority, "General", null);
    setInputValue("");
    setPriority(undefined);
  };

  return (
    <section>
      <AddTodoView
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        priority={priority}
        setPriority={setPriority}
        priorityColors={priorityColors}
      />
    </section>
  );
};

export default AddTodo;
