"use client";

import Board from "@/app/components/tasks/Board";
import Column from "@/app/components/tasks/Column";
import ColumnHeader from "@/app/components/tasks/ColumnHeader";
import TaskCard from "@/app/components/tasks/TaskCard";
import TaskList from "@/app/components/tasks/TaskList";
import { COLUMNS } from "@/app/libs/constants/tasks";
import { useAppDispatch, useAppSelector } from "@/app/libs/hooks/useRedux";
import { initializeTasks, moveTask } from "@/app/libs/stores/tasksSlice";
import { DraggingContext, Task, TaskStatus } from "@/app/libs/types/task";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DnDBoard() {
  const dispatch = useAppDispatch();
  const { tasks, columns } = useAppSelector((state) => state.tasks);
  const [draggingContext, setDraggingContext] = useState<DraggingContext>({
    isDragging: false,
    activeTaskId: null,
    sourceColumnId: null,
  });

  useEffect(() => {
    import("@/app/libs/constants/tasks").then(({ TASKS }) => {
      dispatch(initializeTasks({ tasks: TASKS }));
    });
  }, [dispatch]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
    sourceStatus: string,
  ) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceStatus", sourceStatus);
    setDraggingContext({
      isDragging: true,
      activeTaskId: taskId,
      sourceColumnId: sourceStatus as TaskStatus,
    });
  };

  const handleDragEnd = () => {
    setDraggingContext({
      isDragging: false,
      activeTaskId: null,
      sourceColumnId: null,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    destinationStatus: string,
  ) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceStatus = e.dataTransfer.getData("sourceStatus");

    if (!taskId || !sourceStatus) return;

    const typedSourceStatus = sourceStatus as TaskStatus;
    const typedDestinationStatus = destinationStatus as TaskStatus;

    if (typedSourceStatus === typedDestinationStatus) {
      handleDragEnd();
      return;
    }

    dispatch(
      moveTask({
        taskId,
        sourceStatus: typedSourceStatus,
        destinationStatus: typedDestinationStatus,
      }),
    );

    handleDragEnd();
  };

  const tasksByStatus: Record<string, Task[]> = {};
  COLUMNS.forEach((column) => {
    tasksByStatus[column.status] = tasks.filter(
      (task) => task.status === column.status,
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <section aria-label="تابلو کانبان" className="mt-6">
        <div id="board-wrapper" className="overflow-x-auto focus:outline-none">
          <Board>
            {COLUMNS.map((column) => (
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
                  count={columns[column.status]?.length ?? 0}
                  Icon={column.icon}
                  filter={column.filter}
                />

                <TaskList ariaLabel={`لیست وظایف ${column.title}`}>
                  <AnimatePresence>
                    {tasksByStatus[column.status]?.map((task) => (
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
                </TaskList>
              </Column>
            ))}
          </Board>
        </div>
      </section>
    </div>
  );
}
