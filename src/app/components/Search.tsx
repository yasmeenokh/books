"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

export default function ResponsiveSearch() {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setExpanded(false);
      setSearchTerm("")
    }
  };

  return (
    <>
      <div className="hidden md:block w-72">
        <SearchFormContent
          value={searchTerm}
          onChange={(val) => setSearchTerm(val)}
          onSubmit={handleSubmit}
        />
      </div>
      <button
        onClick={() => setExpanded(true)}
        className="md:hidden p-2 text-gray-600">
        <Icon id="search" className="w-6 h-6" />
      </button>
      {expanded && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 p-4 flex flex-col">
          <SearchFormContent
            autoFocus
            value={searchTerm}
            onChange={(val) => setSearchTerm(val)}
            onSubmit={handleSubmit}
          />
          <button
            onClick={() => setExpanded(false)}
            className="mt-4 text-sm text-blue-600 dark:text-blue-400 self-end">
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

function SearchFormContent({
  autoFocus = false,
  value,
  onChange,
  onSubmit,
}: {
  autoFocus?: boolean;
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="relative">
        <input
          autoFocus={autoFocus}
          type="search"
          placeholder="Search For Books"
          className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
          <Icon id="search" className="w-4 h-4 text-gray-500" />
        </div>
        <button
          type="submit"
          className="absolute end-2.5 bottom-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1">
          Search
        </button>
      </div>
    </form>
  );
}
