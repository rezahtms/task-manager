"use client";

import { cn } from "@/app/libs/utils/utils";
import { InputHTMLAttributes } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

const normalizeNumber = (value: string) =>
  value.replace(/[۰-۹]/g, (d) => {
    const index = "۰۱۲۳۴۵۶۷۸۹".indexOf(d);
    return String(index);
  });

const toPersianDigits = (value: string) =>
  value.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

interface Props<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  type?: HTMLInputElement["type"];
  nuSeparator?: boolean;
  required?: true;
  "aria-describedby"?: string;
}

function FormInputField<T extends FieldValues>({
  label,
  name,
  control,
  className,
  rules,
  type,
  nuSeparator = false,
  required,
  "aria-describedby": ariaDescribedby,
  ...props
}: Props<T>) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "flex gap-1 text-xs font-medium cursor-pointer text-slate-800",
          )}
        >
          {label}
          {required && (
            <span className="text-red-500 font-bold dark" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only">(اجباری)</span>}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => {
          const displayValue =
            field.value === undefined || field.value === null
              ? ""
              : type === "number" && nuSeparator
                ? toPersianDigits(
                    String(field.value).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  )
                : String(field.value);

          return (
            <>
              <input
                {...props}
                type={type}
                id={name}
                inputMode={type === "number" ? "numeric" : undefined}
                value={displayValue}
                onChange={(e) => {
                  if (type !== "number" || !nuSeparator) {
                    field.onChange(e.target.value);
                    return;
                  }

                  const raw = normalizeNumber(e.target.value).replace(/,/g, "");
                  const num = Number(raw);
                  field.onChange(!isNaN(num) ? num : undefined);
                }}
                className={cn(
                  "border p-1 px-1.5 rounded-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                  fieldState.error &&
                    "border border-red-500 text-black focus:ring-2 focus:ring-red-500",
                  "focus:outline-none focus:ring-2 focus:ring-brown-200 focus:ring-offset-2",
                  className,
                )}
                aria-invalid={fieldState.error ? "true" : "false"}
                aria-describedby={`${fieldState.error ? errorId : ""} ${
                  ariaDescribedby || ""
                }`.trim()}
                aria-required={required ? "true" : undefined}
              />
              {fieldState.error && (
                <p
                  id={errorId}
                  className="text-red-500 text-[0.625rem] font-medium mt-0"
                  role="alert"
                  aria-live="assertive"
                >
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

export { FormInputField };
