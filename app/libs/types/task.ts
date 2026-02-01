import { LucideIcon } from "lucide-react";

export type TaskStatus =
  | "todo"
  | "in-development"
  | "validation"
  | "done";

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
  | { type: "select"; options: string[]; focusColor: string };
  status: TaskStatus;
}
