import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {Book, BooksParams } from '../../types.ts';

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://book-seek-app-ie2d.vercel.app/api/' }),
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], BooksParams>({
            query: ({ seed, lang, avgLikes, avgReviews, page }) =>
                `books?seed=${seed}&lang=${lang}&avgLikes=${avgLikes}&avgReviews=${avgReviews}&page=${page}`,
        }),
    }),
});

export const { useGetBooksQuery } = booksApi;
