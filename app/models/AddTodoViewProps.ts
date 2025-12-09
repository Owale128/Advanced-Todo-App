import { Priority } from "./Todo";

export interface AddTodoViewProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  priority: Priority | undefined;
  setPriority: (value: Priority | undefined) => void;
  priorityColors: Record<Priority, { base: string; selected: string }>;
}