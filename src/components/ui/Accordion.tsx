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
      orange: "bg-orange-200"
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
    <div className="md:w-1/2">
      <div
        className={accordionVariants({ variant })}
        onClick={() => setSelected(value == selected ? -1 : value)}
      >
        <div className="w-full flex justify-between items-center">
          <div></div>
          <p>{question}</p>
          <div
            className={`${value == selected && "rotate-180"} transition-transform duration-500 ease-in-out`}
          >
            <HiChevronDown size={22} />
          </div>
        </div>

        <div className={`${value == selected ? "max-h-[300px] mb-3 py-3" : "max-h-0 opacity-0 invisible"} transition-all ease-out duration-300`}>
          <hr />
          <div className="flex py-2 lg:py-3 text-xs md:text-sm lg:text-[16px] leading-[1.3rem] lg:leading-[1.65rem]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};
