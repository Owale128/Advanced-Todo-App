import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { SortableTodoItemProps } from "../../models/SortableTodoItemProps";
import { Priority } from "../../models/Todo";
import SortableTodoItemView from "./SortableTodoItemView";

const SortableTodoItem = ({
  todo,
  toggle,
  remove,
  updatePriority,
}: SortableTodoItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo._id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  const cyclePriority = () => {
    const priorities: Priority[] = ["low", "medium", "high"];
    const currentIndex = priorities.indexOf(todo.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
      updatePriority(todo._id, priorities[nextIndex]);
    };

  return (
    <SortableTodoItemView
      todo={todo}
      style={style}
      setNodeRef={setNodeRef}
      attributes={attributes}
      listeners={listeners}
      priorityColors={priorityColors}
      toggle={toggle}
      remove={remove}
      cyclePriority={cyclePriority}
      showDeleteConfirm={showDeleteConfirm}
      setShowDeleteConfirm={setShowDeleteConfirm}
    />
  );
};

export default SortableTodoItem;
