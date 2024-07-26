"use client"

import { useRef } from "react";
import { HiSearch } from "react-icons/hi";

interface SearchBarProps {
    handleSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    handleSearch
}) => {
    return (
        <div className="flex items-center border-ppmb-blue-800 border-[2px] bg-ppmb-000 rounded-3xl px-3 py-[6px] lg:py-2 lg:px-4 gap-[2px] lg:gap-1 max-w-[700px] w-full">
            <div className="text-[18px] lg:text-[20px]"><HiSearch /></div>
            <input 
                placeholder="Cari temanmu" 
                className="ml-2 outline-none border-none bg-inherit text-[16px] md:text-[18px]"
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}