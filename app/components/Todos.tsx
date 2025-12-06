import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import SortableTodoItem from "./SortableTodoItem";

const Todos = () => {
  const { todos, toggle, remove, updateOrder, updatePriority } = useContext(TodosContext);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

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

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map((todo) => todo._id)} strategy={verticalListSortingStrategy}>
        <ul className="space-y-0">
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <SortableTodoItem key={todo._id} todo={todo} toggle={toggle} remove={remove} updatePriority={updatePriority} />
            ))}
          </AnimatePresence>
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default Todos;
