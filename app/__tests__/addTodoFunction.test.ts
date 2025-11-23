import { Todo } from "../models/Todo";
import { addTodo } from "../utils/todoUtilities";

describe("addTodo", () => {
  it("should add a new todo item to the list", () => {
    const todos: Todo[] = [];
    const result = addTodo(todos, "New Todo");

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 1,
      text: "New Todo",
      done: false,
    });
  });

  it("should trim whitespace from the todo text", () => {
    const todos: Todo[] = [];
    const result = addTodo(todos, "  Trimmed Todo  ");

    expect(result[0].text).toBe("Trimmed Todo");
  });

  it("should not add an empty todo item", () => {
    const todos: Todo[] = [];
    const result = addTodo(todos, " ");

    expect(result).toHaveLength(0);
  });
});
