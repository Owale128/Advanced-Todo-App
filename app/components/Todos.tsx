import { useContext, useState } from "react";
import { TodosContext } from "../context/TodoContext";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import SortableTodoItem from "./sortableTodoItem/SortableTodoItem";

const Todos = () => {
  const { todos, toggle, remove, updateOrder, updatePriority } =
    useContext(TodosContext);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = todos.findIndex((todo) => todo._id === active.id);
    const newIndex = todos.findIndex((todo) => todo._id === over.id);

    const reorderedTodos = [...todos];
    const [movedTodo] = reorderedTodos.splice(oldIndex, 1);
    reorderedTodos.splice(newIndex, 0, movedTodo);

    updateOrder(reorderedTodos);
  };

  const activeTodo = activeId
    ? todos.find((todo) => todo._id === activeId)
    : null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todos.map((todo) => todo._id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-4">
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <SortableTodoItem
                key={todo._id}
                todo={todo}
                toggle={toggle}
                remove={remove}
                updatePriority={updatePriority}
              />
            ))}
          </AnimatePresence>
        </ul>
      </SortableContext>
      <DragOverlay>
        {activeTodo ? (
          <div className="cursor-grabbing">
            <SortableTodoItem
              todo={activeTodo}
              toggle={toggle}
              remove={remove}
              updatePriority={updatePriority}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Todos;
