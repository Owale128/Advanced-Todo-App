import { TodosContext } from "@/app/context/TodoContext";
import { FormEvent, useContext, useState } from "react";
import AddTodoView from "./AddTodoView";

const AddTodo = () => {
  const [inputValue, setInputValue] = useState("");
  const { add } = useContext(TodosContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    add(inputValue);
    setInputValue("");
  };

  return (
    <section>
      <AddTodoView
      handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </section>
  );
};

export default AddTodo;
