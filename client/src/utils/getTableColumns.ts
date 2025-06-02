import {t} from "./translate";
import type {Lang} from "./translations";


export const getTableColumns = (lang: Lang) => [
    {
        title: t(lang, 'index'),
        key: 'index',
        width: 100,
        render: (_text: any, _record: any, index: number) => index + 1,
    },
    {
        title: t(lang, 'isbn'),
        dataIndex: 'isbn',
        key: 'isbn',
        width: 100,
    },
    {
        title: t(lang, 'rating'),
        dataIndex: 'rating',
        key: 'rating',
        width: 110,
    },
    {
        title: t(lang, 'title'),
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: t(lang, 'author'),
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: t(lang, 'publisher'),
        dataIndex: 'publisher',
        key: 'publisher',
    },
];
