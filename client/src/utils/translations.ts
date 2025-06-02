export const translations = {
    en: {
        index: 'Index',
        isbn: 'ISBN',
        rating: 'Rating',
        title: 'Title',
        author: 'Author(s)',
        publisher: 'Publisher',
        reviews: 'Reviews',
        noReviews: 'No reviews',
        readerRating: 'Reader rating:',
        language: 'Language',
    },
    ru: {
        index: 'Индекс',
        isbn: 'ISBN',
        rating: 'Рейтинг',
        title: 'Название',
        author: 'Автор(ы)',
        publisher: 'Издательство',
        reviews: 'Отзывы',
        noReviews: 'Нет отзывов',
        readerRating: 'Оценка читателя:',
        language: 'Язык',
    },
    de: {
        index: 'Index',
        isbn: 'ISBN',
        rating: 'Bewertung',
        title: 'Titel',
        author: 'Autor(en)',
        publisher: 'Verlag',
        reviews: 'Bewertungen',
        noReviews: 'Keine Bewertungen',
        readerRating: 'Leserbewertung:',
        language: 'Sprache',
    },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof typeof translations['en'];