import express from 'express';
import cors from 'cors';
import { Faker, en, ru, de, LocaleDefinition } from '@faker-js/faker';
import { generateBookTitle } from './utils/generateBookTitle';
import { Locale, SUPPORTED_LOCALES } from './types';
import { generateReviews } from './utils/generateReviews';
import { generateLikes } from './utils/generateLikes';

const app = express();
const PORT = 3001;


export const localeMap: Record<Locale, LocaleDefinition> = { en, ru, de };
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://mary-no.github.io',
    ],
    credentials: true,
}));

app.get('/api/books', async (req, res) => {
    const {
        seed = '42',
        page = '1',
        lang = 'en',
        avgLikes = '0',
        avgReviews = '0',
    } = req.query;
    try {
        const validatedLang: Locale = SUPPORTED_LOCALES.includes(lang as Locale)
            ? (lang as Locale)
            : 'en';

        const faker = new Faker({ locale: [localeMap[validatedLang]] });

        const combinedSeed = Number(seed) + Number(page);
        faker.seed(combinedSeed);


        const books = await Promise.all(
            Array.from({ length: 10 }, async (_, i) => {
                const id = i + 1 + (Number(page) - 1) * 10;

                const bookSeed = combinedSeed + id;
                faker.seed(bookSeed);

                const titleSeed = `seed:${seed}-page:${page}-index:${id}`;
                const title = await generateBookTitle(validatedLang, titleSeed);

                const bookFaker = new Faker({ locale: [localeMap[validatedLang]] });
                bookFaker.seed(bookSeed);


                const isbn = bookFaker.string.numeric(13);
                const author1 = bookFaker.person.fullName();
                let author = author1;

                if (bookFaker.number.float({ min: 0, max: 1 }) < 0.3) {
                    const author2 = bookFaker.person.fullName();
                    author = `${author1} & ${author2}`;
                }
                const publisher = bookFaker.company.name();

                const rating = generateLikes(Number(avgLikes), String(bookSeed + 1));

                const reviewFaker = new Faker({ locale: [localeMap[validatedLang]] });
                reviewFaker.seed(bookSeed + 2);
                const reviews = generateReviews(Number(avgReviews), validatedLang, bookSeed + 2, rating);

                const coverUrl = `https://picsum.photos/seed/book${id}/200/300`;

                return {
                    id,
                    isbn,
                    title,
                    author,
                    publisher,
                    rating,
                    reviews,
                    coverUrl,
                };
            })
        );

        res.json(books);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Generation failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app
