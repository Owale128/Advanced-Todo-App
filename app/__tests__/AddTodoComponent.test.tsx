import { fireEvent, render, screen } from "@testing-library/react";
import { TodosContextValue } from "../models/TodosContextValue";
import AddTodo from "../components/addTodo/AddTodo";
import { TodosContext } from "../context/TodoContext";


describe("AddTodo Component", () => {
  it("should call add with the input value and resets the input field", () => {
    const addMock = jest.fn()

    const mockValue: TodosContextValue = {
        todos: [],
        add: addMock,
        toggle: () => {},
        remove: () => {}
    }

    render(
        <TodosContext.Provider value={mockValue}> 
        <AddTodo />
        </TodosContext.Provider>
    )

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /Lägg till/i})

    fireEvent.change(input, { target: { value: "New Todo Item"}})
    fireEvent.click(button)

    expect(addMock).toHaveBeenCalledWith("New Todo Item")
    expect(addMock).toHaveBeenCalledTimes(1)
});
});