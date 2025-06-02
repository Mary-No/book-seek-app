import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {FiltersState} from '../../types.ts';

const initialState: FiltersState = {
    seed: 1,
    lang: 'ru',
    avgLikes: 3.7,
    avgReviews: 3,
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<Partial<FiltersState>>) {
            return {...state, ...action.payload};
        },
    },
});

export const {setFilters} = filtersSlice.actions;
export default filtersSlice.reducer;
