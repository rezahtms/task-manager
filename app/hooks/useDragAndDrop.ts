import { useAppDispatch } from "@/app/libs/hooks/useRedux";
import { moveTask } from "@/app/libs/stores/tasksSlice";
import { DraggingContext, TaskStatus, UseDragAndDropReturn } from "@/app/libs/types/task";
import { useState } from "react";

export const useDragAndDrop = (): UseDragAndDropReturn => {
  const dispatch = useAppDispatch();
  const [draggingContext, setDraggingContext] = useState<DraggingContext>({
    isDragging: false,
    activeTaskId: null,
    sourceColumnId: null,
  });

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

  return {
    draggingContext,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  };
};
