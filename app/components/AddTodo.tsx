import { FormEvent, useContext, useState } from "react";
import { TodosContext } from "../context/TodoContext";

const AddTodo = () => {
    const [inputValue, setInputValue] = useState("");
    const { add } = useContext(TodosContext)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        add(inputValue)
        setInputValue("")
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-2xl">
      <input 
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="border border-black rounded-md p-1 text-center font-medium"
      />
      <button type="submit" className="border cursor-pointer hover:bg-black hover:text-white transition duration-200">
        Spara
      </button>
    </form>
  )
}

export default AddTodo
