import { InputFilter, SelectFilter } from "@/app/libs/types/task";
import { LucideIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function ColumnHeader({
  id,
  title,
  count,
  Icon,
  filter,
  onFilterChange,
}: {
  id: string;
  title: string;
  count: number;
  Icon: LucideIcon;
  filter: InputFilter | SelectFilter;
  onFilterChange?: (value: string) => void;
}) {
  const [filterValue, setFilterValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur border border-slate-100 rounded-t-lg z-10 p-3">
      <div className="flex items-center text-slate-500 gap-2">
        <Icon size={16} />
        <h3 id={id} className="text-sm font-semibold text-slate-800">
          {title}
        </h3>
        <span className="text-xs">({count})</span>
      </div>

      <div className="mt-3">
        {filter.type === "input" ? (
          <>
            <input
              type="text"
              value={filterValue}
              onChange={handleInputChange}
              placeholder={filter.placeholder}
              className={`w-full rounded-md border-2 border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-${filter.focusColor}`}
              aria-label={`فیلتر ${title} - جستجو در وظایف`}
              aria-describedby={`${id}-instructions`}
            />
            <div id={`${id}-instructions`} className="sr-only">
              تایپ کنید تا لیست وظایف فیلتر شود
            </div>
          </>
        ) : (
          <>
            <select
              value={filterValue}
              onChange={handleSelectChange}
              className={`w-full rounded-md border-2 border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-${filter.focusColor}`}
              aria-label={`فیلتر ${title} - انتخاب گزینه`}
              aria-describedby={`${id}-instructions`}
            >
              <option value="">{filter.placeholder}</option>
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div id={`${id}-instructions`} className="sr-only">
              گزینه مورد نظر را انتخاب کنید تا لیست وظایف فیلتر شود
            </div>
          </>
        )}
      </div>
    </div>
  );
}
