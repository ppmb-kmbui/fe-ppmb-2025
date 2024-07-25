"use client"

import { useOutsideClick } from "@/hooks/useOutsideClick"
import { useState } from "react"
import { HiChevronDown } from "react-icons/hi"

interface OptionProps {
    display: string
    value: string
}

interface DropdownProps {
    options: OptionProps[]
    dropdownValue: string
    setDropdownValue: (value: string) => void
    icon: React.ReactNode
    label: string
    error?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
    options, dropdownValue, setDropdownValue, icon, label, error
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useOutsideClick(() => setIsOpen(false));

    const getDisplay = (value: string) => {
        const option = options.find((option) => option.value == value)
        return option ? option.display : null
    }

    return (
        <div className="flex flex-col text-lg w-full text-ppmb-800">
            <div className="flex flex-row items-center gap-1 ">
                <div className="text-[18px]">{icon}</div>
                <text className="font-semibold">{label}</text>
            </div>

            <div className={`${isOpen ? "rounded-t-md" : "rounded-md"} border-[2px] border-ppmb-blue-600 relative`} ref={ref}>
                <div className="flex flex-row items-center justify-between px-3 py-[5px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <div className={`${getDisplay(dropdownValue) == null && "text-ppmb-300"} font-normal`}>
                        {getDisplay(dropdownValue) == null ? `Pilih ${label}` : getDisplay(dropdownValue)}
                    </div>
                    <div className={`transform ${isOpen && 'rotate-180'} transition-transform duration-500 ease-in-out`}>
                        <HiChevronDown size={20}/>
                    </div>
                </div>

                <div className={`${isOpen ? "flex" : "hidden"} flex-col absolute top-[105%] w-full items-center overflow-y-auto max-h-[30vh] rounded-b-md transition-all duration-300 font-medium`}>
                    {options.map(({display, value}, key) => (
                        <div key={key} className="flex flex-col w-full text-[14px]">
                            <div className={`${value != dropdownValue ? "block" : "hidden"} flex flex-row cursor-pointer bg-white hover:bg-stonks-100 gap-2 px-3 py-2 items-center font-medium`} onClick={() => {setDropdownValue(value), setIsOpen(false)}}>
                                {display}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            { error && <text className="text-sm text-ppmb-red-500">{error}</text>}
        </div>

    )
}