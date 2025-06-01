export type Review = {
    text: string;
    author: string;
    rating: number;
}

export const SUPPORTED_LOCALES = ['en', 'ru', 'de'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];