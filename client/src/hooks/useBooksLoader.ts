import {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks.ts';
import {addBooks, resetBooks, setHasMore, setPage} from '../app/api/booksSlice.ts';
import {booksApi} from '../app/api/booksApi.ts';
import type {FiltersState} from "../types.ts";


export const useBooksLoader = (filters: FiltersState) => {
    const dispatch = useAppDispatch();
    const books = useAppSelector(state => state.books.books);
    const currentPage = useAppSelector(state => state.books.currentPage);
    const hasMore = useAppSelector(state => state.books.hasMore);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(resetBooks());
        setLoading(true);
        (async () => {
            const res1 = await dispatch(booksApi.endpoints.getBooks.initiate({...filters, page: 1}));
            if (res1.data) {
                dispatch(addBooks(res1.data));
                dispatch(setPage(2));
            }
            setLoading(false);
        })();
    }, [dispatch, filters]);

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;
        setLoading(true);
        dispatch(booksApi.endpoints.getBooks.initiate({...filters, page: currentPage}))
            .then(res => {
                if (res.data && res.data.length > 0) {
                    dispatch(addBooks(res.data));
                    dispatch(setPage(currentPage + 1));
                } else {
                    dispatch(setHasMore(false));
                }
                setLoading(false);
            });
    }, [loading, hasMore, currentPage, dispatch, filters]);

    return {books, loading, loadMore, hasMore};
};
