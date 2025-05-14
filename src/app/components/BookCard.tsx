import { useState } from "react";
import { BookItem } from "../utils/interfaces";
import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";

interface BookCardProps {
  bookData: BookItem;
}

export default function BookCard({ bookData }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [favoriteList, setIsFavoriteList] = useState<string[]>(
    JSON.parse(localStorage.getItem("favoriteBooksList") || "[]"),
  );

  const ToggleFavorite = (id: string) => {
    const isFavorite = favoriteList.includes(id);
    const updatedList = isFavorite
      ? favoriteList.filter((item) => item !== id)
      : [...favoriteList, id];

    setIsFavoriteList(updatedList);
    localStorage.setItem("favoriteBooksList", JSON.stringify(updatedList));
  };

  return (
    <div
      className={`relative`}
      onMouseMoveCapture={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}>
      <div
        className=" absolute right-0 z-20 w-8 h-8 top-2"
        onClick={() => {
          ToggleFavorite(bookData.id);
        }}>
        {isHovered && !favoriteList.includes(bookData.id) && (
          <Icon id="star-outline" className="w-10 h-10 drop-shadow-2xl" />
        )}
        {favoriteList.includes(bookData.id) && (
          <Icon
            id="star"
            className="text-[#FFB703] w-10 h-10 drop-shadow-2xl"
          />
        )}
      </div>
      <div className={`h-full flex`}>
        <div className="h-72 relative shrink-0 w-1/2">
          {bookData.volumeInfo.imageLinks ? (
            <Image
              src={bookData.volumeInfo.imageLinks.smallThumbnail}
              fill
              alt={bookData.volumeInfo.title}
              className="max-w-full max-h-full rounded-sm object-fill"
              sizes="(max-width: 640px) 100%, 320px"
            />
          ) : (
            <Image
              src="/assets/placeHolderImage.png"
              fill
              alt={bookData.volumeInfo.title}
              className="max-w-full max-h-full rounded-sm object-fill"
              sizes="(max-width: 640px) 100%, 320px"
            />
          )}
        </div>
        <div className="py-6 pl-3 pr-7">
          <h2 className="mt-3 mb-2 font-poppins font-bold text-xl line-clamp-2 break-words break-all whitespace-normal leading-6">
            {bookData.volumeInfo.title}
          </h2>
          {bookData.volumeInfo.authors && (
            <ul className="flex flex-wrap gap-0.5 mb-2 items-center text-sm max-w-full">
              authors:
              {Array.isArray(bookData.volumeInfo.authors) &&
                bookData.volumeInfo.authors?.map((auth, i) => (
                  <li
                    key={`${auth}-${i}`}
                    className="font-semibold text-sm break-words whitespace-normal basis-full">
                    {auth}
                    {i < bookData.volumeInfo.authors.length - 1 && ","}
                  </li>
                ))}
            </ul>
          )}
          <div className=" absolute bottom-2 right-6 capitalize text-blue-500 cursor-pointer font-semibold">
            <Link
              href={`/books/${bookData.id}`}
              className="block"
              prefetch>
              learn more &#10095;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
