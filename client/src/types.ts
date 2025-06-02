export type Book = {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    coverUrl: string;
    rating: number;
    reviews: Review[];
}
export type Review = {
    text: string;
    author: string;
    rating: number;
}

export type BooksParams = {
    seed: number;
    lang: string;
    avgLikes: number;
    avgReviews: number;
    page: number;
};

export type BooksState = {
    books: Book[];
    currentPage: number;
    hasMore: boolean;
    viewMode: ViewMode
}
export type FiltersState = {
    seed: number;
    lang: 'ru' | 'en' | 'de';
    avgLikes: number;
    avgReviews: number;
};
export type ViewMode = 'table' | 'gallery';