"use client";

import { cn } from "@/app/libs/utils/utils";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useMemo } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues = FieldValues, TOption = unknown> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: TOption[];
  placeholder?: string;
  getOptionLabel: (option: TOption) => string;
  getOptionValue: (option: TOption) => string | boolean | number;
  className?: string;
  required?: true;
}

export function FormSelectableField<
  T extends FieldValues = FieldValues,
  TOption = unknown,
>({
  name,
  control,
  options,
  placeholder,
  getOptionLabel,
  getOptionValue,
  label,
  required,
  className,
}: Props<T, TOption>) {
  const mappedOptions = useMemo(() => {
    return options.map((option) => {
      const value = getOptionValue(option);
      const stringValue = String(value);
      const labelText = getOptionLabel(option);
      return { key: stringValue, stringValue, rawValue: value, labelText };
    });
  }, [options, getOptionLabel, getOptionValue]);

  return (
    <div className={cn("w-full flex flex-col gap-1", className)}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const currentValue = String(field.value ?? "");
          const handleChange = (event: SelectChangeEvent<string>) => {
            const value = event.target.value;
            const matched = mappedOptions.find(
              (opt) => opt.stringValue === value,
            );
            if (matched) {
              field.onChange(matched.stringValue);
            } else {
              field.onChange(value);
            }
          };

          const selectedOption = mappedOptions.find(
            (o) => o.stringValue === currentValue,
          );
          const selectedLabel = selectedOption ? selectedOption.labelText : "";

          return (
            <>
              <label
                htmlFor={name}
                className={cn(
                  "flex gap-1 text-xs font-medium cursor-pointer text-slate-800",
                )}
              >
                {label}
                {required && (
                  <span
                    className="text-red-500 font-bold dark"
                    aria-hidden="true"
                  >
                    *
                  </span>
                )}
                {required && <span className="sr-only">(اجباری)</span>}
              </label>

              <FormControl fullWidth size="small" error={!!fieldState.error}>
                <Select
                  id={String(name)}
                  value={currentValue}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected || selected === "") {
                      return <em>{placeholder || "انتخاب کنید"}</em>;
                    }
                    return selectedLabel;
                  }}
                >
                  {mappedOptions.map((opt) => (
                    <MenuItem key={opt.key} value={opt.stringValue}>
                      {opt.labelText}
                    </MenuItem>
                  ))}
                </Select>
                {fieldState?.error && (
                  <p className="text-red-500 text-[0.625rem] font-medium mt-0.5">
                    {fieldState.error.message}
                  </p>
                )}
              </FormControl>
            </>
          );
        }}
      />
    </div>
  );
}
