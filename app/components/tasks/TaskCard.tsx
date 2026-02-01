import WorkflowSwitcher from "@/app/components/tasks/WorkflowSwitcher";
import { Task } from "@/app/libs/types/task";
import { User } from "lucide-react";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <li role="listitem">
      <article
        aria-labelledby={task.id}
        className="bg-white rounded-lg card-shadow text-black border border-slate-100 p-4 peer-checked:p-2 peer-checked:text-xs"
      >
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

          <WorkflowSwitcher status={task.status} />
        </div>
      </article>
    </li>
  );
}
