import seedrandom from 'seedrandom';
import { Locale, SUPPORTED_LOCALES } from '../types';

const NOUN_TOPICS = ['kindness', 'adventure', 'revenge', 'mystery', 'forest', 'city', 'dream', 'secret'];
const ADJECTIVE_TOPICS = ['fairy tale', 'ancient', 'lost', 'dark', 'magic', 'eternal', 'strange', 'forgotten'];

function capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function getRandomTopic(topics: string[], seed: string): string {
    const rng = seedrandom(seed);
    return topics[Math.floor(rng() * topics.length)];
}

async function fetchNounsRelatedTo(meaning: string, max = 50): Promise<string[]> {
    const url = `https://api.datamuse.com/words?ml=${encodeURIComponent(meaning)}&max=${max}&md=p`;
    const res = await fetch(url);
    const data = await res.json();
    return data.filter((item: any) => item.tags?.includes("n")).map((item: any) => item.word);
}

async function fetchRelatedAdjectives(noun: string, max = 20): Promise<string[]> {
    const url = `https://api.datamuse.com/words?rel_jjb=${encodeURIComponent(noun)}&max=${max}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.map((item: any) => item.word);
}

async function translateText(text: string, targetLang: Locale): Promise<string> {
    if (targetLang === 'en') return text;

    const fallbackTitles: Record<Locale, string> = {
        en: 'Tales of the World',
        ru: 'Сказки народов мира',
        de: 'Märchen der Welt'
    };

    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
        const res = await fetch(url);
        if (!res.ok) {
            const errorText = await res.text();
            console.log(errorText);
            throw new Error(`Translation failed: ${res.status}, message: ${errorText}`);
        }
        const data = await res.json();
        const translated = data.responseData?.translatedText?.trim();
        if (!translated || translated.toLowerCase() === text.toLowerCase()) {
            return fallbackTitles[targetLang];
        }

        return translated;
    } catch (error) {
        console.warn('Translation error:', error);
        return fallbackTitles[targetLang];
    }
}


export async function generateBookTitle(locale: Locale, seed: string): Promise<string> {
    if (!SUPPORTED_LOCALES.includes(locale)) {
        throw new Error(`Unsupported locale: ${locale}`);
    }

    const rng = seedrandom(seed);
    const pick = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];

    const nounTopic = getRandomTopic(NOUN_TOPICS, seed + 'noun');
    const adjTopic = getRandomTopic(ADJECTIVE_TOPICS, seed + 'adj');

    const nouns = await fetchNounsRelatedTo(nounTopic);
    if (nouns.length < 2) {
        return await translateText('Untitled Story', locale);
    }

    const noun = pick(nouns);
    let adjectives = await fetchRelatedAdjectives(noun);
    if (!adjectives.length) {
        adjectives = await fetchNounsRelatedTo(adjTopic);
    }

    const filteredAdjectives = adjectives.filter(adj => !noun.toLowerCase().includes(adj.toLowerCase()));
    const adjective = filteredAdjectives.length > 0 ? pick(filteredAdjectives) : 'Strange';
    const secondNoun = pick(nouns.filter(n => n !== noun));

    const templates = [
        `The ${adjective} ${noun}`,
        `A Tale of ${noun} and ${secondNoun}`,
        `The ${noun} of ${secondNoun}`,
        capitalizeFirstLetter(`${adjective} ${noun}`),
        `Legacy of the ${adjective} ${secondNoun}`,
        `Chronicles of the ${adjective} ${noun}`,
        `Beyond the ${adjective} ${noun}`,
        `About the ${adjective} ${noun}`,
        capitalizeFirstLetter(`${noun}`)
    ];

    const englishTitle = pick(templates);
    return await translateText(englishTitle, locale);
}
