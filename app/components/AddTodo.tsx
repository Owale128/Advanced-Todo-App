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
    <form onSubmit={handleSubmit} className="flex items-center gap-2 pb-4 border-b border-gray-300 mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Lägg till en uppgift..."
        maxLength={100}
        className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-lg"
      />
      <button
        type="submit"
        className="text-gray-500 hover:text-gray-700 transition duration-150 text-base uppercase tracking-wide cursor-pointer"
      >
        + Lägg till
      </button>
    </form>
  )
}

export default AddTodo
