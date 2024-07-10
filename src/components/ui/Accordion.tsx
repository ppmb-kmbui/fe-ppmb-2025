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
        <div className="w-[700px]">
            <div className="flex flex-row bg-ppmb-blue-600 items-center justify-between rounded-lg py-3 text-lg text-ppmb-000 px-6 cursor-pointer" onClick={() => setSelected(value == selected ? -1 : value)}>
                <text>{question}</text>
                <div className={`${value == selected && "rotate-180"} transition-transform duration-500 ease-in-out`}>
                    <HiChevronDown size={20} />
                </div>
            </div>

            <div className={`${value == selected ? "max-h-[200px] mb-3" : "max-h-0"} bg-white px-6 rounded-lg mt-1 overflow-hidden transition-max-height ease-in-out duration-300`}>
                <div className="flex py-3">
                    {answer}
                </div>
            </div>
        </div>
    )
}
