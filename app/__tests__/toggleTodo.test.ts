import { Todo } from "../models/Todo";
import { toggleTodo } from "../utils/todoUtilities";

describe("toggleTodo", () => {
  it("should toggle done for todo with right id", () => {
    const todos: Todo[] = [
      { id: 1, text: "First todo", done: false },
      { id: 2, text: "Second todo", done: false },
    ];
    const result = toggleTodo(todos, 2);

    expect(result[0].done).toBe(false);
    expect(result[1].done).toBe(true);
  });

  it("should not change todos if id not found", () => {
    const todos: Todo[] = [{ id: 1, text: "My todo", done: false }];
    const result = toggleTodo(todos, 999);

    expect(result).toEqual(todos);
  });
});
