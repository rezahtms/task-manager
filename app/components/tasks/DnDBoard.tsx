"use client";

import Board from "@/app/components/tasks/Board";
import Column from "@/app/components/tasks/Column";
import ColumnHeader from "@/app/components/tasks/ColumnHeader";
import TaskCard from "@/app/components/tasks/TaskCard";
import TaskList from "@/app/components/tasks/TaskList";
import { useDragAndDrop } from "@/app/hooks/useDragAndDrop";
import { useTaskFilters } from "@/app/hooks/useTaskFilters";
import { COLUMNS } from "@/app/libs/constants/tasks";
import { useAppDispatch, useAppSelector } from "@/app/libs/hooks/useRedux";
import { initializeTasks } from "@/app/libs/stores/tasksSlice";
import { TaskStatus } from "@/app/libs/types/task";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function DnDBoard() {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);

  const {
    draggingContext,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useDragAndDrop();
  const { filters, handleFilterChange, getFilteredTasksForStatus } =
    useTaskFilters();

  useEffect(() => {
    import("@/app/libs/constants/tasks").then(({ TASKS }) => {
      dispatch(initializeTasks({ tasks: TASKS }));
    });
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <section aria-label="تابلو کانبان" className="mt-6">
        <div id="board-wrapper" className="overflow-x-auto focus:outline-none">
          <Board>
            {COLUMNS.map((column) => {
              const filteredTasks = getFilteredTasksForStatus(
                column.status as TaskStatus,
                tasks,
              );

              return (
                <Column
                  key={column.id}
                  id={`col-${column.id}`}
                  titleId={`col-${column.id}-title`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.status)}
                >
                  <ColumnHeader
                    id={`col-${column.id}-title`}
                    title={column.title}
                    count={filteredTasks.length}
                    Icon={column.icon}
                    filter={column.filter}
                    onFilterChange={(value) =>
                      handleFilterChange(column.id, value)
                    }
                  />

                  <TaskList ariaLabel={`لیست وظایف ${column.title}`}>
                    <AnimatePresence>
                      {filteredTasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(e, task.id, task.status)
                          }
                          onDragEnd={handleDragEnd}
                        >
                          <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={
                              draggingContext.activeTaskId === task.id
                                ? "opacity-50"
                                : ""
                            }
                          >
                            <TaskCard task={task} />
                          </motion.div>
                        </div>
                      ))}
                    </AnimatePresence>

                    {filteredTasks.length === 0 && filters[column.id] && (
                      <div
                        className="text-center py-8 text-slate-500 italic"
                        role="status"
                        aria-live="polite"
                        aria-label={`هیچ وظیفه‌ای مطابق با فیلتر "${filters[column.id]}" در ستون ${column.title} یافت نشد`}
                      >
                        موردی یافت نشد
                      </div>
                    )}
                  </TaskList>
                </Column>
              );
            })}
          </Board>
        </div>
      </section>
    </div>
  );
}
