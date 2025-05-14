"use client";
import { BookItem } from "./utils/interfaces";
import { useGoogleBooks } from "./hooks/useFetch";
import BookCard from "./components/BookCard";
import Loader from "./components/Loader";
import ErrorModal from "./components/ErrorModal";

export default function Home() {

  const { data, isLoading, error } = useGoogleBooks();

  if (isLoading) return <Loader />;
  if (error) return <ErrorModal message={"error.message"} />;

  return (
    <main>
        <>
          <h1 className="text-3xl font-bold mb-10 text-center">
            Popular Books
          </h1>
          <div className="flex gap-[24px] md:gap-[32px] flex-wrap justify-center items-stretch">
            {data?.items?.map((book: BookItem) => (
              <div
                key={book.id}
                className="rounded-md shadow-lg border-1 border-gray-200 hover:scale-[1.05] cursor-pointer w-full max-w-[620px] lg:w-[calc(30%-22px)] min-w-[350px] md:w-[calc(50%-22px)]">
                <BookCard bookData={book} />
              </div>
            ))}
          </div>
        </>
    </main>
  );
}
