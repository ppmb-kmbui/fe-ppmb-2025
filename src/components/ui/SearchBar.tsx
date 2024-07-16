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
        <div className="flex items-center border-ppmb-blue-800 border-[2px] focus:border-[30px] bg-ppmb-000 rounded-3xl p-2 px-4 gap-1 max-w-[700px] w-full">
            <div className="text-[20px]"><HiSearch /></div>
            <input 
                placeholder="Cari temanmu" 
                className="ml-2 outline-none border-none bg-inherit text-[16px] md:text-[18px]"
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}