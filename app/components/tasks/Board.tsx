export default function Board({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="board"
      className="flex flex-row flex-nowrap gap-4 py-4 min-h-[calc(100vh-4rem)]"
    >
      {children}
    </div>
  );
}
