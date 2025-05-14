import { useQuery } from '@tanstack/react-query';

type UseGoogleBooksOptions = {
  search?: string;
  id?: string;
};

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const useGoogleBooks = ({ search, id }: UseGoogleBooksOptions = {}) => {
  return useQuery({
    queryKey: ['googleBooks', { search, id }],
    queryFn: async () => {
      let url: string;
      if (id) {
        url = `${BASE_URL}/${id}`;
      } else if (search) {
        url = `${BASE_URL}?q=${encodeURIComponent(search)}&maxResults=20`;
      } else {
        url = `${BASE_URL}?q=orderBy=newest&langRestrict=en&maxResults=20`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch from Google Books API');
      return res.json();
    },
    retry: false,
  });
};
