"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("color-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDarkMode = stored === "dark" || (!stored && prefersDark);
    document.documentElement.classList.toggle("dark", isDarkMode);
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("color-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-40 flex-none w-full mx-auto bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800">
      <div className="p-4 flex items-center justify-between max-w-[1280px] mx-auto gap-2">
        <div className="flex items-center gap-6">
          <Link href="/" prefetch>
            <Image
              src="/assets/book-icon.svg"
              width={50}
              height={50}
              alt="book logo"
              priority
              className="cursor-pointer"
            />
          </Link>
          <Link
            prefetch
            href="/favorites"
            className="cursor-pointer text-lg font-bold text-black dark:text-white">
            Favorite Books
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Search />
          <button
            onClick={toggleTheme}
            className=" cursor-pointer py-2 px-3 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition"
            aria-label="Toggle Dark Mode">
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
