"use client";

import { useRef } from "react";
import { HiChevronDown } from "react-icons/hi";
import { tv } from "tailwind-variants";

interface AccordionProps {
  variant?: "yellow" | "turquoise" | "orange";
  selected: number;
  setSelected: Function;
  question: string;
  answer: string;
  value: number;
}

const accordionVariants = tv({
  base: "flex flex-col items-center justify-between rounded-lg py-2 lg:py-[14px] text-[14px] md:text-[16px] lg:text-[18px] leading-[1.8] px-4 lg:px-8 cursor-pointer",
  variants: {
    variant: {
      yellow: "bg-yellow-200",
      turquoise: "bg-turquoise-200",
      orange: "bg-orange-200",
      // rounded: "rounded-3xl px-5"
    },
  },
  defaultVariants: {
    variant: "yellow",
  },
});

export const Accordion: React.FC<AccordionProps> = ({
  variant,
  answer,
  question,
  selected,
  setSelected,
  value,
}) => {
  const ref = useRef(null);
  return (
    <div className="md:w-3/4 lg:w-2/3">
      <div
        className={accordionVariants({ variant })}
        onClick={() => setSelected(value == selected ? -1 : value)}
      >
        <div className="flex w-full items-center justify-between">
          <div></div>
          <p className="text-center">{question}</p>
          <div
            className={`${value == selected && "rotate-180"} transition-transform duration-500 ease-in-out`}
          >
            <HiChevronDown size={22} />
          </div>
        </div>

        <div
          className={`${value == selected ? "mb-3 max-h-[300px] py-3" : "invisible max-h-0 opacity-0"} transition-all duration-300 ease-out`}
        >
          <hr />
          <div className="flex py-2 text-center text-xs leading-[1.3rem] md:text-sm lg:py-3 lg:text-[16px] lg:leading-[1.65rem]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};
