import { Task, TaskStatus, UseTaskFiltersReturn } from "@/app/libs/types/task";
import { getFilteredTasks } from "@/app/libs/utils/taskUtils";
import { useCallback, useState } from "react";



export const useTaskFilters = (): UseTaskFiltersReturn => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = useCallback((columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value.toLowerCase(),
    }));
  }, []);

  const getFilteredTasksForStatus = useCallback((status: TaskStatus, tasks: Task[]): Task[] => {
    return getFilteredTasks(status, filters, tasks);
  }, [filters]);

  return {
    filters,
    handleFilterChange,
    getFilteredTasksForStatus,
  };
};
