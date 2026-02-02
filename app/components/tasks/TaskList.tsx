export default function TaskList({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <ul
      role="list"
      aria-label={ariaLabel}
      className="flex-1 overflow-y-auto mt-3 space-y-3 pl-3 custom-scrollbar"
      style={{
        msOverflowStyle: "auto",
        scrollbarWidth: "thin",
      }}
    >
      {children}
    </ul>
  );
}
