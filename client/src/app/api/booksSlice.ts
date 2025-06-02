import type {Book, BooksState, ViewMode} from '../../types.ts';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';


const initialState: BooksState = {
    books: [],
    currentPage: 1,
    hasMore: true,
    viewMode: 'table'
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        resetBooks(state) {
            state.books = [];
            state.currentPage = 1;
            state.hasMore = true;
        },
        addBooks: (state, action: PayloadAction<Book[]>) => {
            const newBooks = action.payload.filter(
                (newBook: Book) => !state.books.some((book: Book) => book.id === newBook.id)
            );
            state.books.push(...newBooks);
        },
        incrementPage(state) {
            state.currentPage += 1;
        },
        setHasMore(state, action: PayloadAction<boolean>) {
            state.hasMore = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setViewMode(state, action: PayloadAction<ViewMode>) {
            state.viewMode = action.payload;
        },
    },
});

export const {resetBooks, addBooks, incrementPage, setHasMore, setPage, setViewMode} = booksSlice.actions;
export default booksSlice.reducer;
