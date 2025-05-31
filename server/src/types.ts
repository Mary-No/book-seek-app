export type Book = {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    likes: number;
    reviews: Review[];
    coverUrl: string;
}

export type Review = {
    text: string;
    author: string;
    rating: number;
}

export const SUPPORTED_LOCALES = ['en', 'ru', 'de'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];