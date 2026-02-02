"use client";
import { cn } from "@/app/libs/utils/utils";
import { TextareaHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<
  T extends FieldValues,
> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  className?: string;
  required?: true;
}

export function FormTextareaField<T extends FieldValues>({
  control,
  name,
  placeholder = "",
  className,
  label,
  required,
  ...props
}: Props<T>) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "flex gap-1 text-xs font-medium cursor-pointer text-slate-800",
          )}
        >
          {label}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          return (
            <div className="mt-2">
              <textarea
                {...props}
                placeholder={placeholder}
                id={name}
                {...field}
                value={field.value ?? ""}
                className={cn(
                  "border p-1 px-1.5 rounded-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 w-full",
                  `${fieldState?.error && "border-red-500 ring-red-500"}`,
                  className,
                )}
              />
              {fieldState.error && (
                <p
                  className="text-red-500 text-[0.625rem] font-medium mt-0"
                  role="alert"
                  aria-live="assertive"
                >
                  {fieldState.error.message}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
