import {useAppDispatch, useAppSelector} from '../../hooks';
import {setFilters} from '../../app/api/filtersSlice.ts';
import {Button, InputNumber, Select, Slider, Space, Tooltip} from 'antd';
import {DownloadOutlined, ReloadOutlined} from '@ant-design/icons';
import type {FiltersState} from "../../types.ts";
import s from './filtersPanel.module.scss'
import {t} from '../../utils/translate.ts';
import ViewModeSwitcher from "./ViewModeSwitcher.tsx";
import {exportToCSV} from '../../utils/exportToCSV.ts';


const languageOptions: { value: FiltersState["lang"]; label: string }[] = [
    {value: 'ru', label: 'Русский'},
    {value: 'en', label: 'English'},
    {value: 'de', label: 'Deutsch'},
];

export const FiltersPanel = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.filters);
    const books = useAppSelector((state) => state.books.books);

    const generateRandomSeed = () => {
        const randomSeed = Math.floor(Math.random() * 10000);
        dispatch(setFilters({seed: randomSeed}));
    };

    return (
        <Space direction="horizontal" size="middle" className={s.filtersContainer}>
            <div className={s.filtersBlock}>
                <label>{t(filters.lang, "language")}</label>
                <Select
                    style={{width: 160}}
                    value={filters.lang}
                    onChange={(value) => dispatch(setFilters({lang: value}))}
                    options={languageOptions}
                />
            </div>

            <div className={s.filtersBlock}>
                <label>Seed</label>
                <Space>
                    <InputNumber
                        min={0}
                        value={filters.seed}
                        onChange={(value) =>
                            dispatch(setFilters({seed: value ?? filters.seed}))
                        }
                    />
                    <Tooltip title="Случайное число">
                        <Button
                            icon={<ReloadOutlined/>}
                            onClick={generateRandomSeed}
                        />
                    </Tooltip>
                </Space>
            </div>

            <div style={{width: 300}} className={s.filtersBlock}>
                <label>{t(filters.lang, "rating")}</label>
                <Slider
                    min={0}
                    max={5}
                    step={0.1}
                    value={filters.avgLikes}
                    onChange={(value) => dispatch(setFilters({avgLikes: value}))}
                    marks={{
                        0: '0',
                        2.5: '2.5',
                        5: '5',
                    }}
                />
            </div>

            <div className={s.filtersBlock}>
                <label>{t(filters.lang, "reviews")}</label>
                <InputNumber
                    min={0}
                    max={5}
                    step={0.1}
                    value={filters.avgReviews}
                    onChange={(value) =>
                        dispatch(setFilters({avgReviews: value ?? filters.avgReviews}))
                    }
                />
            </div>

            <ViewModeSwitcher/>

            <Button
                type="primary"
                icon={<DownloadOutlined/>}
                onClick={() => exportToCSV(books, 'users.csv')}
            >
                CSV
            </Button>
        </Space>
    );
};

export default FiltersPanel;
