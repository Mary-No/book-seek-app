import seedrandom from 'seedrandom'

const SUPPORTED_LOCALES = ['en', 'ru', 'de'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];


async function fetchWords(meaning: string, max = 50): Promise<string[]> {
    const url = `https://api.datamuse.com/words?ml=${encodeURIComponent(meaning)}&max=${max}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.map((item: any) => item.word);
}


async function translateText(text: string, targetLang: Locale): Promise<string> {
    if (targetLang === 'en') return text;

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;

    const res = await fetch(url);
    if (!res.ok) {
        const errorText = await res.text();
        console.log(errorText);
        throw new Error(`Translation failed: ${res.status}, message: ${errorText}`);
    }

    const data = await res.json();


    return data.responseData?.translatedText ?? text;
}

async function fetchRelatedAdjectives(noun: string, max = 20): Promise<string[]> {
    const url = `https://api.datamuse.com/words?rel_jjb=${encodeURIComponent(noun)}&max=${max}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.map((item: any) => item.word);
}

export async function generateBookTitle(locale: Locale, seed: string): Promise<string> {
    if (!SUPPORTED_LOCALES.includes(locale)) {
        throw new Error(`Unsupported locale: ${locale}`);
    }
    const rng = seedrandom(seed);

    const nouns = await fetchWords('story');
    if (nouns.length < 2) {
        return await translateText('Untitled Story', locale);
    }

    const noun = nouns[Math.floor(rng() * nouns.length)];

    let adjectives = await fetchRelatedAdjectives(noun);
    if (adjectives.length === 0) {
        adjectives = await fetchWords('theme');
    }
    const adjective = adjectives.length > 0 ? adjectives[0] : 'Interesting';
    const pick = (arr: string[]) => arr[Math.floor(rng() * arr.length)];

    const templates = [
        `The ${pick(adjectives)} ${noun}`,
        `A Tale of ${noun} and ${pick(nouns)}`,
        `The ${noun} of ${pick(nouns)}`,
        `About the ${pick(adjectives)} ${adjective} ${noun}`,
    ];

    const englishTitle = templates[Math.floor(rng() * templates.length)];

    return  await translateText(englishTitle, locale);
}

