import { configureStore } from '@reduxjs/toolkit';
import { booksApi } from './api/booksApi.ts';
import booksReducer from './api/booksSlice.ts';
import filtersReducer from './api/filtersSlice.ts';


export const store = configureStore({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
        books: booksReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
