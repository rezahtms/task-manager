import { LucideIcon } from "lucide-react";

export type TaskStatus = "todo" | "in-development" | "validation" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  status: TaskStatus;
}

export interface ColumnConfig {
  id: string;
  title: string;
  count: number;
  icon: LucideIcon;
  filter:
  | { type: "input"; placeholder: string; focusColor: string }
  | {
    type: "select";
    options: string[];
    focusColor: string;
    placeholder: string;
  };
  status: TaskStatus;
}
export type DraggingContext = {
  isDragging: boolean;
  activeTaskId: string | null;
  sourceColumnId: string | null;
};

export type InputFilter = {
  type: "input";
  placeholder: string;
  focusColor: string;
};

export type SelectFilter = {
  type: "select";
  options: string[];
  focusColor: string;
  placeholder: string;
};

export interface UseDragAndDropReturn {
  draggingContext: DraggingContext;
  handleDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
    sourceStatus: string,
  ) => void;
  handleDragEnd: () => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (
    e: React.DragEvent<HTMLDivElement>,
    destinationStatus: string,
  ) => void;
}

export interface UseTaskFiltersReturn {
  filters: Record<string, string>;
  handleFilterChange: (columnId: string, value: string) => void;
  getFilteredTasksForStatus: (status: TaskStatus, tasks: Task[]) => Task[];
}

export interface FilterConfig {
  columnId: string;
  filterValue: string;
  columnIndex: number;
  tasks: Task[];
}