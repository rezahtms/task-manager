import { LucideIcon } from "lucide-react";

type InputFilter = {
  type: "input";
  placeholder: string;
  focusColor: string;
};

type SelectFilter = {
  type: "select";
  options: string[];
  focusColor: string;
};

export default function ColumnHeader({
  id,
  title,
  count,
  Icon,
  filter,
}: {
  id: string;
  title: string;
  count: number;
  Icon: LucideIcon;
  filter: InputFilter | SelectFilter;
}) {
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
          <input
            type="text"
            placeholder={filter.placeholder}
            className={`w-full rounded-md border-2 border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-${filter.focusColor}`}
          />
        ) : (
          <select
            className={`w-full rounded-md border-2 border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-${filter.focusColor}`}
          >
            {filter.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
