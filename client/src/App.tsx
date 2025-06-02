import './App.css'
import BooksGallery from './features/booksGallery/BooksGallery.tsx';
import { BooksList } from './features/booksTable/BooksList.tsx'
import FiltersPanel from "./features/filtersPanel/filtersPanel.tsx";
import { useAppSelector } from './hooks.ts';
import {useBooksLoader} from "./hooks/useBooksLoader.ts";
import { createInfiniteScrollHandler } from './utils/infiniteScrollHandler.ts';

function App() {
    const viewMode = useAppSelector((state) => state.books.viewMode);
    const filters = useAppSelector((state) => state.filters);
    const { loadMore } = useBooksLoader(filters);
  return (
      <div>
        <FiltersPanel/>
          {viewMode === 'table' ? <BooksList /> : <BooksGallery onScroll={createInfiniteScrollHandler(loadMore, 100)}/>}
      </div>
  )
}

export default App
