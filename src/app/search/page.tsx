'use client';
import { useSearchParams } from 'next/navigation';
import { useGoogleBooks } from "../hooks/useFetch"
import BookCard from '../components/BookCard';
import { BookItem } from '../utils/interfaces';
import Loader from '../components/Loader';
import ErrorModal from '../components/ErrorModal';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { data, isLoading, error } = useGoogleBooks({ search: query });

  if (isLoading) return <Loader />;
  if (error) return <ErrorModal message={"error.message"}/>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">Search Results for: &quot;{query}&quot;</h1>
      <div className="flex gap-[24px] md:gap-[32px] flex-wrap justify-center items-stretch">
      {data?.items?.length > 0 ? (
          data.items.map((book: BookItem) => (
           <div key={book.id} className="rounded-md shadow-lg border-1 border-gray-200 hover:scale-[1.05] cursor-pointer w-full max-w-[620px] lg:w-[calc(30%-22px)] min-w-[350px] md:w-[calc(50%-22px)]">
            <BookCard key={book.id} bookData={book} />
            </div>
          ))
        ) : (
          <p className="text-xl font-bold my-6 mx-auto">No results found.</p>
        )}
      </div>
    </div>
  );
}
