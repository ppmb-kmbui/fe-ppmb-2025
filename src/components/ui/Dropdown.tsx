"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

interface OptionProps {
  display: string;
  value: string;
}

interface DropdownProps {
  options: OptionProps[];
  dropdownValue: string;
  setDropdownValue: (value: string) => void;
  icon?: React.ReactNode;
  label: string;
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  dropdownValue,
  setDropdownValue,
  icon,
  label,
  error,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  const getDisplay = (value: string) => {
    const option = options.find((option) => option.value == value);
    return option ? option.display : null;
  };

  return (
    <div className="flex flex-col text-lg w-full gap-2">
      <div className="flex flex-row items-center gap-1 text-neutral-800">
        <div className="text-[18px]">{icon}</div>
        <p className="font-medium text-neutral-800">{label}</p>
      </div>

      <div
        className= "bg-white border-b-neutral-medium border-b-2 relative p-1"
        ref={ref}
      >
        <div
          className="flex flex-row items-center justify-between px-3 py-[5px] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`${getDisplay(dropdownValue) == null && "select-none" ? "text-neutral-400" : "text-neutral-800 font-medium"} font-normal`}
          >
            {getDisplay(dropdownValue) == null
              ? `Pilih ${label}`
              : getDisplay(dropdownValue)}
          </div>
          <div
            className={`transform ${isOpen && "rotate-180"} transition-transform duration-500 ease-in-out`}
          >
            <HiChevronDown size={20} />
          </div>
        </div>

        <div
          className={`${isOpen ? "flex" : "hidden"} flex-col absolute top-[105%] w-full items-center overflow-y-auto max-h-[30vh] rounded-b-md transition-all duration-300 font-medium`}
        >
          {options.map(({ display, value }, key) => (
            <div key={key} className="flex flex-col w-full text-[14px]">
              <div
                className={`${value != dropdownValue ? "block" : "hidden"} flex flex-row cursor-pointer bg-white hover:bg-stonks-100 gap-2 px-3 py-2 items-center font-medium z-50`}
                onClick={() => {
                  setDropdownValue(value), setIsOpen(false);
                }}
              >
                {display}
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-ppmb-red-500">{error}</p>}
    </div>
  );
};
