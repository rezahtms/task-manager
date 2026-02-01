import Board from "@/app/components/tasks/Board";
import Column from "@/app/components/tasks/Column";
import ColumnHeader from "@/app/components/tasks/ColumnHeader";
import TaskCard from "@/app/components/tasks/TaskCard";
import TaskList from "@/app/components/tasks/TaskList";
import { COLUMNS, TASKS } from "@/app/libs/constants/tasks";
import { Task } from "@/app/libs/types/task";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "مدیریت وظایف" },
  description:
    "وایب یک ابزار مدیریت وظایف شبیه Jira برای برنامه‌ریزی، پیگیری و همکاری تیم‌هاست.",
};

export default function Home() {
  const tasksByStatus = TASKS.reduce<Record<string, Task[]>>((acc, task) => {
    (acc[task.status] ??= []).push(task);
    return acc;
  }, {});

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
              >
                <ColumnHeader
                  id={`col-${column.id}-title`}
                  title={column.title}
                  count={tasksByStatus[column.status]?.length ?? 0}
                  Icon={column.icon}
                  filter={column.filter}
                />

                <TaskList ariaLabel={`لیست وظایف ${column.title}`}>
                  {(tasksByStatus[column.status] ?? []).map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </TaskList>
              </Column>
            ))}
          </Board>
        </div>
      </section>
    </div>
  );
}
