"use client"

import { useRef } from "react";
import { HiChevronDown } from "react-icons/hi"

interface AccordionProps {
    selected: number;
    setSelected: Function;
    question: string;
    answer: string;
    value: number;
}

export const Accordion: React.FC<AccordionProps> = ({
    answer, question, selected, setSelected, value
}) => {
    const ref = useRef(null);
    return (
        <div className="md:w-[700px]">
            <div className="flex flex-row bg-ppmb-blue-600 items-center justify-between rounded-lg py-2 lg:py-5 text-xs md:text-sm lg:text-[18px] leading-[1.7] text-ppmb-000 px-4 lg:px-8 cursor-pointer" onClick={() => setSelected(value == selected ? -1 : value)}>
                <text>{question}</text>
                <div className={`${value == selected && "rotate-180"} transition-transform duration-500 ease-in-out`}>
                    <HiChevronDown size={22} />
                </div>
            </div>

            <div className={`${value == selected ? "max-h-[200px] mb-3" : "max-h-0"} bg-white px-4 lg:px-7 rounded-lg mt-2 overflow-hidden transition-max-height ease-in-out duration-300`}>
                <div className="flex py-2 lg:py-3 text-xs md:text-sm lg:text-[16px] lg:leading-[1.65rem]">
                    {answer}
                </div>
            </div>
        </div>
    )
}
