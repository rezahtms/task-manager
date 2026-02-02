import WorkflowSwitcher from "@/app/components/tasks/WorkflowSwitcher";
import { deleteTask } from "@/app/libs/stores/tasksSlice";
import { Task } from "@/app/libs/types/task";
import { Trash, User } from "lucide-react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import TaskDeleteConfirmation from "./TaskDeleteConfirmation";

export default function TaskCard({ task }: { task: Task }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = () => setShowConfirmation(true);

  const handleConfirmDelete = useCallback(() => {
    dispatch(deleteTask({ taskId: task.id, status: task.status }));
    setShowConfirmation(false);
  }, [dispatch, task.id, task.status, setShowConfirmation]);

  const handleCancelDelete = useCallback(() => {
    setShowConfirmation(false);
  }, [setShowConfirmation]);

  return (
    <li role="listitem">
      <article
        aria-labelledby={task.id}
        className="bg-white rounded-lg card-shadow text-black border border-slate-100 p-4 px-3 peer-checked:p-2 peer-checked:text-xs cursor-move relative"
      >
        {showConfirmation && (
          <TaskDeleteConfirmation
            handleConfirmDelete={handleConfirmDelete}
            handleCancelDelete={handleCancelDelete}
          />
        )}

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h4
              id={task.id}
              className="text-sm font-medium peer-checked:text-xs"
            >
              {task.title}
            </h4>

            {task.description && (
              <p className="text-xs text-slate-500 mt-1 peer-checked:hidden">
                {task.description}
              </p>
            )}

            <div className="mt-3 flex items-center gap-1 text-xs text-slate-600">
              <User className="text-[8px]" size={14} />
              <span className=" font-medium text-xs">{task.assignee}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <WorkflowSwitcher status={task.status} />
            <button
              onClick={handleDeleteClick}
              className="text-gray-400 hover:text-red-500 transition-colors "
              aria-label={`Delete task ${task.title}`}
            >
              <Trash size={14} />
            </button>
          </div>
        </div>
      </article>
    </li>
  );
}
