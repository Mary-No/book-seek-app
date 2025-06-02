import { translations, type Lang, type TranslationKey} from './translations.ts';

export function t(lang: Lang, key: TranslationKey): string {
    return translations[lang]?.[key] ?? key;
}