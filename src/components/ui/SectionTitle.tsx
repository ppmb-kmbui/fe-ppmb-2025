import { JSX } from "react";

export function SectionTitle({ text }: { text: string }): JSX.Element {
  return (
    <span className="bg-neutral-dark w-fit px-3 py-1 text-[18px] font-semibold text-white md:text-lg lg:px-5 lg:py-2 lg:text-2xl">
      {text}
    </span>
  );
}
