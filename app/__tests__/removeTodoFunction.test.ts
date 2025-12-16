import { Todo } from "../models/Todo";
import { removeTodo } from "../utils/todoUtilities";

describe("removeTodo", () => {
  it("should remove todo with correct id", () => {
    const todos: Todo[] = [
      {
        _id: "1", text: "First todo", done: false,
        order: 0,
        priority: "low",
        category: "",
        dueDate: null
      },
      {
        _id: "2", text: "Second todo", done: false,
        order: 0,
        priority: "low",
        category: "",
        dueDate: null
      },
      {
        _id: "3", text: "Third todo", done: false,
        order: 0,
        priority: "low",
        category: "",
        dueDate: null
      },
    ];
    const result = removeTodo(todos, "1");

    expect(result).toEqual([
      { _id: "2", text: "Second todo", done: false, order: 0, priority: "low", category: "", dueDate: null },
      { _id: "3", text: "Third todo", done: false, order: 0, priority: "low", category: "", dueDate: null },
    ]);
    expect(result).toHaveLength(2);
  });

  it("should leave the list unchaged if id does not exist ", () => {
    const todos: Todo[] = [
      {
        _id: "1", text: "First todo", done: false,
        order: 0,
        priority: "low",
        category: "",
        dueDate: null
      },
      {
        _id: "2", text: "Second todo", done: false,
        order: 0,
        priority: "low",
        category: "",
        dueDate: null
      },
    ];
    const result = removeTodo(todos, "999");

    expect(result).toEqual(todos);
    expect(result).toHaveLength(2);
  });
});
