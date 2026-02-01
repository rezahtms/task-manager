type Props = {
  id: string;
  titleId: string;
  children: React.ReactNode;
};

export default function Column({ id, titleId, children }: Props) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={titleId}
      className="shrink-0 grow min-w-70"
    >
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-transparent rounded-lg">
        {children}
      </div>
    </div>
  );
}
