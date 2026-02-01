import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLSpanElement> & {
  status: "todo" | "in-development" | "validation" | "done";
};

export default function WorkflowSwitcher({ status, ...props }: Props) {
  let workFlowComponent: ReactNode;
  switch (status) {
    case "todo":
      workFlowComponent = (
        <span
          {...props}
          className="inline-flex items-center rounded-full bg-sky-100 text-sky-800 text-xs px-2 py-1"
        >
          در انتظار
        </span>
      );
      break;
    case "in-development":
      workFlowComponent = (
        <span
          {...props}
          className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 text-xs px-2 py-1"
        >
          در حال توسعه
        </span>
      );
      break;
    case "validation":
      workFlowComponent = (
        <span
          {...props}
          className="inline-flex items-center rounded-full bg-violet-100 text-violet-800 text-xs px-2 py-1"
        >
          در حال بررسی
        </span>
      );
      break;
    case "done":
      workFlowComponent = (
        <span
          {...props}
          className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 text-xs px-2 py-1"
        >
          انجام شده
        </span>
      );
      break;
  }
  return workFlowComponent;
}
