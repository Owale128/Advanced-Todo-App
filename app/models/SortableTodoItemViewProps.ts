import { Todo, Priority } from "@/app/models/Todo";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";

export interface SortableTodoItemViewProps {
  todo: Todo;
  style: React.CSSProperties;
  setNodeRef: (element: HTMLElement | null) => void;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
  priorityColors: Record<Priority, string>;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  cyclePriority: () => void;
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (open: boolean) => void;
}