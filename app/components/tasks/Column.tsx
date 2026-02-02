import React from "react";

type Props = {
  id: string;
  titleId: string;
  children: React.ReactNode;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
};

export default function Column({
  id,
  titleId,
  children,
  onDragOver,
  onDrop,
}: Props) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={titleId}
      className="shrink-0 grow min-w-70"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-transparent rounded-lg">
        {children}
      </div>
    </div>
  );
}
