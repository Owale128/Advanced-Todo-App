import { render, screen, fireEvent } from "@testing-library/react";
import SortableTodoItem from "../components/sortableTodoItem/SortableTodoItem";
import { Todo } from "../models/Todo";
import { DndContext } from "@dnd-kit/core";

jest.mock("framer-motion", () => ({
  motion: {
    li: ({ children, ...props }: React.ComponentPropsWithoutRef<'li'>) => <li {...props}>{children}</li>,
    div: ({ children, ...props }: React.ComponentPropsWithoutRef<'div'>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ComponentPropsWithoutRef<'button'>) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: React.ComponentPropsWithoutRef<'span'>) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

describe("SortableTodoItem Component", () => {
  const mockToggle = jest.fn();
  const mockRemove = jest.fn();
  const mockUpdatePriority = jest.fn();

  const mockTodo: Todo = {
    _id: "test-id-1",
    text: "Test Todo",
    done: false,
    order: 1,
    priority: "low",
    category: "work",
    dueDate: null,
  };

  const renderTodo = (todo: Todo) => {
    return render(
      <DndContext>
        <SortableTodoItem
          todo={todo}
          toggle={mockToggle}
          remove={mockRemove}
          updatePriority={mockUpdatePriority}
        />
      </DndContext>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render todo text", () => {
    renderTodo(mockTodo);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("should toggle when checkbox clicked", () => {
    renderTodo(mockTodo);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockToggle).toHaveBeenCalledWith("test-id-1");
  });

  it("should update priority when clicked", () => {
    renderTodo(mockTodo);
    const priorityButton = screen.getByTitle(/Prioritet: low/i);
    fireEvent.click(priorityButton);
    expect(mockUpdatePriority).toHaveBeenCalledWith("test-id-1", "medium");
  });

  it("should show delete confirmation dialog", () => {
    renderTodo(mockTodo);
    fireEvent.click(screen.getByText("x"));
    expect(screen.getByText("Ta bort todo?")).toBeInTheDocument();
  });
});
