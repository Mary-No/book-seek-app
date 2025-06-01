import { Faker } from "@faker-js/faker";
import { Locale } from "../types";
import { localeMap } from "../index";
import { reviewPhrases } from "./reviewPhrases";

type Review = {
    text: string;
    author: string;
    rating: number;
};

export function generateReviews(
    avgReviews: number,
    locale: Locale,
    seed: number,
    likes: number
): Review[] {
    if (avgReviews <= 0) return [];

    const faker = new Faker({ locale: [localeMap[locale]] });
    faker.seed(seed);

    const phrases = reviewPhrases[locale];
    const getRandom = (arr: string[]) =>
        arr[faker.number.int({ min: 0, max: arr.length - 1 })];

    const baseCount = Math.floor(avgReviews);
    const fraction = avgReviews - baseCount;
    let count = baseCount;
    if (fraction > 0) {
        const rand = faker.number.float({ min: 0, max: 1 });
        if (rand < fraction) {
            count += 1;
        }
    }

    if (count === 0) return [];

    const ratings: number[] = [];
    let sum = 0;

    for (let i = 0; i < count; i++) {
        const remaining = count - i;
        const remainingTarget = likes * count - sum;
        const min = Math.max(1, Math.floor(remainingTarget - (remaining - 1) * 5));
        const max = Math.min(5, Math.ceil(remainingTarget - (remaining - 1)));
        const rating = faker.number.int({ min, max });
        ratings.push(rating);
        sum += rating;
    }

    return ratings.map((rating) => {
        const isPositive = rating > 3;
        const title = isPositive
            ? getRandom(phrases.positiveTitles)
            : getRandom(phrases.negativeTitles);

        const phrase = isPositive
            ? getRandom(phrases.positiveReviews)
            : getRandom(phrases.negativeReviews);

        const generatedText = faker.lorem.paragraph();

        return {
            text: `${title} ${phrase} ${generatedText}`,
            author: faker.person.fullName(),
            rating,
        };
    });
}
