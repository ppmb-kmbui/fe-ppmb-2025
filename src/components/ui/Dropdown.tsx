"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { body } from "@/styles/fonts";
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
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row items-center gap-1 text-neutral-800">
        <div className="text-[18px]">{icon}</div>
        <p className="font-medium text-neutral-800 lg:text-lg">{label}</p>
      </div>

      <div
        className="border-b-neutral-medium relative border-b-2 bg-white p-1"
        ref={ref}
      >
        <div
          className="flex cursor-pointer flex-row items-center justify-between px-3 py-[5px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`${getDisplay(dropdownValue) == null && "select-none" ? "text-neutral-400" : "font-medium text-neutral-800"} text-md font-normal lg:text-lg`}
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
          className={`${isOpen ? "flex" : "hidden"} absolute top-[105%] max-h-[30vh] w-full flex-col items-center overflow-y-auto rounded-b-md font-medium transition-all duration-300`}
        >
          {options.map(({ display, value }, key) => (
            <div key={key} className="flex w-full flex-col text-[14px]">
              <div
                className={`${value != dropdownValue ? "block" : "hidden"} z-50 flex cursor-pointer flex-row items-center gap-2 bg-white px-3 py-2 font-medium`}
                onClick={() => {
                  (setDropdownValue(value), setIsOpen(false));
                }}
              >
                {display}
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-ppmb-red-500 text-sm">{error}</p>}
    </div>
  );
};
