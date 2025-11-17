import { Todo } from "../models/Todo";
import { deleteTodo } from "../utils/todoUtilities";

describe("removeTodo", () => {
  it("should remove todo with correct id", () => {
    const todos: Todo[] = [
      { id: 1, text: "First todo", done: false },
      { id: 2, text: "Second todo", done: false },
      { id: 3, text: "Third todo", done: false },
    ];
    const result = deleteTodo(todos, 1);

    expect(result).toEqual([
      { id: 2, text: "Second todo", done: false },
      { id: 3, text: "Third todo", done: false },
    ]);
    expect(result).toHaveLength(2);
  });

  it("should leave the list unchaged if id does not exist ", () => {
    const todos: Todo[] = [
      { id: 1, text: "First todo", done: false },
      { id: 2, text: "Second todo", done: false },
    ];
    const result = deleteTodo(todos, 999);

    expect(result).toEqual(todos);
  });
});
