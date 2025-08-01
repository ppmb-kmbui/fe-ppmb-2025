import { ReactNode } from "react";

export function GridView<T>({
  children,
  iterable,
  emptyMessage,
}: {
  children: ReactNode;
  iterable: T[];
  emptyMessage: string;
}) {
  const iterableIsEmpty = iterable.length === 0;

  return (
    <>
      <div
        className={`${iterableIsEmpty ? "text-neutral-dark flex justify-center md:justify-start lg:text-lg" : "grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6"} w-full gap-3 md:gap-4 lg:gap-6`}
      >
        {iterableIsEmpty ? (
          <p className="text-center text-sm lg:text-lg">{emptyMessage}</p>
        ) : (
          children
        )}
      </div>
    </>
  );
}
