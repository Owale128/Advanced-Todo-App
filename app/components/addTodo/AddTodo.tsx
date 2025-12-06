import { TodosContext } from "@/app/context/TodoContext";
import { Priority } from "@/app/models/Todo";
import { FormEvent, useContext, useState } from "react";
import AddTodoView from "./AddTodoView";
import { toast } from "sonner";

const AddTodo = () => {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState<Priority | undefined>(undefined);
  const { add } = useContext(TodosContext);

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
      />
    </section>
  );
};

export default AddTodo;
