import { Todo } from "../models/Todo";
import { addTodo } from "../utils/todoutils";

describe('addTodo', () => {
  it('should add a new todo item to the list', () => {
    const todos: Todo[] = [];
    const result = addTodo( todos, 'New Todo')

    expect(result).toHaveLength(1)

    expect(result[0]).toMatchObject({
        id: 1,
        text:'New Todo',
        done: false
    })
  });
})
