import { cn } from "@/app/libs/utils/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};
export default function ModalButton({ children, className, ...props }: Props) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium  rounded-lg transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
