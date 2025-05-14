import { notFound } from "next/navigation";
import Image from "next/image";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

async function fetchBook(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) return null;
  return res.json();
}

interface BookPageProps {
  params: Promise<{ id: string }>;
};

export default async function BookDetailPage({ params }: BookPageProps) {
  const { id } = await params
  const book = await fetchBook(id);

  if (!book) return notFound();

  const info = book.volumeInfo;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {
        
      }
      <h1 className="text-3xl font-bold mb-4">{info.title}</h1>
      <div className="flex flex-col gap-6 ">
        {info.imageLinks?.thumbnail ? (
          <Image
            src={info.imageLinks.thumbnail}
            alt={info.title}
            width={400}
            height={300}
            className="rounded-md max-w-full w-full max-h-[400px] object-fill"
          />
        ) : (
          <Image
            src="/assets/placeHolderImage.png"
            alt={info.volumeInfo.title}
            className="max-w-full max-h-full rounded-md"
            width={700}
            height={300}
          />
        )}
        <div className="flex-1">
          <p className="mb-2">
            <strong>Authors:</strong> {info.authors?.join(", ") || "Unknown"}
          </p>
          <p className="mb-2">
            <strong>Publisher:</strong> {info.publisher || "N/A"}
          </p>
          <p className="mb-2">
            <strong>Published Date:</strong> {info.publishedDate || "N/A"}
          </p>
          <div
            className=" mt-4"
            dangerouslySetInnerHTML={{
              __html: info.description || "No description available for this book.",
            }}
          />
        </div>
      </div>
    </main>
  );
}
