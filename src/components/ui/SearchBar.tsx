// "use client";

import { HiSearch } from "react-icons/hi";

interface SearchBarProps {
  handleSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
}: SearchBarProps) => {
  return (
    <div className="placeholder-neutral-medium flex w-full max-w-[700px] items-center gap-[2px] bg-white px-3 py-[6px] lg:gap-1 lg:px-4 lg:py-2">
      <label
        htmlFor="search-input"
        className="text-neutral-medium text-[18px] lg:text-[20px]"
      >
        <HiSearch />
      </label>
      <input
        id="search-input"
        placeholder="Cari temanmu"
        className="ml-2 border-none bg-inherit text-[16px] outline-none md:text-[18px]"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
