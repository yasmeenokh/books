"use client";

import { useEffect, useState } from "react";
import BookCard from "../components/BookCard"; // Update path as needed
import { BookItem } from "../utils/interfaces";
import Loader from "../components/Loader";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export default function FavoritesPage() {
  const [favoriteBooks, setFavoriteBooks] = useState<BookItem[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const stored = localStorage.getItem("favoriteBooksList");
      const ids: string[] = stored ? JSON.parse(stored) : [];

      if (ids.length === 0) {
        setFavoriteBooks([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          ids.map(async (id) => {
            const res = await fetch(`${BASE_URL}/${id}`);
            if (!res.ok) return null;
            return await res.json();
          }),
        );

        setFavoriteBooks(results.filter(Boolean)); // Remove nulls
      } catch (err) {
        console.error("Failed to load favorites", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <Loader/>;
  if (favoriteBooks.length === 0)
    return <p className="p-4">No favorite books yet.</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Favorite Books</h1>
      <div className="flex gap-[24px] md:gap-[32px] flex-wrap justify-center items-stretch">
        {favoriteBooks.map((book) => (
          <div
            key={book.id}
            className="rounded-md shadow-lg border-1 border-gray-200 hover:scale-[1.05] cursor-pointer w-full max-w-[620px] lg:w-[calc(30%-22px)] min-w-[350px] md:w-[calc(50%-22px)]">
            <BookCard bookData={book} />
          </div>
        ))}
      </div>
    </main>
  );
}
