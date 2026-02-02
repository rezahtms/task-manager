import { COLUMNS } from "@/app/libs/constants/tasks";
import { FilterConfig, Task, TaskStatus } from "@/app/libs/types/task";



export const filterTasks = ({
  filterValue,
  columnIndex,
  tasks,
}: FilterConfig): Task[] => {
  if (!filterValue) {
    return tasks;
  }

  switch (columnIndex) {
    case 0:
      return tasks.filter((task) =>
        task.title.toLowerCase().includes(filterValue),
      );
    case 1:
      return tasks.filter(
        (task) => task.assignee.toLowerCase() === filterValue.toLowerCase(),
      );
    case 2:
      return tasks.filter((task) =>
        task.title.toLowerCase().includes(filterValue),
      );
    case 3:
      return tasks.filter(
        (task) =>
          task.description?.toLowerCase().includes(filterValue) ?? false,
      );
    default:
      return tasks;
  }
};

export const getFilteredTasks = (
  status: TaskStatus,
  filters: Record<string, string>,
  tasks: Task[],
): Task[] => {
  const column = COLUMNS.find((col) => col.status === status);
  if (!column) return [];

  const filterValue = filters[column.id] || "";
  const tasksForStatus = tasks.filter((task) => task.status === status);

  const columnIndex = COLUMNS.findIndex((col) => col.status === status);

  return filterTasks({
    columnId: column.id,
    filterValue,
    columnIndex,
    tasks: tasksForStatus,
  });
};
