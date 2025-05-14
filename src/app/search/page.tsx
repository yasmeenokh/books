import { Suspense } from 'react';
import SearchResults from '../components/SearchResults';
import Loader from '../components/Loader';

export default function SearchPage() {
  return (
    <Suspense fallback={<div><Loader/></div>}>
      <SearchResults />
    </Suspense>
  );
}
