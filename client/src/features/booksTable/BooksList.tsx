import { useMemo } from 'react';
import { Table, Typography, List, Rate } from 'antd';
import { useAppSelector } from '../../hooks.ts';
import type { Book, Review } from '../../types.ts';
import { getTableColumns } from '../../utils/getTableColumns.ts';
import { t } from '../../utils/translate.ts';
import s from './BooksList.module.scss';
import BookCoverWithText from '../../components/BookCoverWithText.tsx';
import { useBooksLoader } from '../../hooks/useBooksLoader';
import { createInfiniteScrollHandler } from '../../utils/infiniteScrollHandler.ts';


const { Text } = Typography;

export const BooksList = () => {
    const filters = useAppSelector((state) => state.filters);
    const { books, loading, loadMore } = useBooksLoader(filters);

    const expandedRowRender = (record: Book) => (
        <div style={{ display: 'flex', gap: 20 }}>
            <BookCoverWithText
                key={record.id}
                author={record.author}
                imageUrl={record.coverUrl}
                title={record.title}
                width={200}
                height={300}
            />
            <div style={{ flex: 1 }}>
                <div>
                    <h3>{record.title}</h3>
                    <p>{record.author}</p>
                </div>
                <h3>{t(filters.lang, 'reviews')}</h3>
                {record.reviews.length === 0 ? (
                    <Text>No reviews</Text>
                ) : (
                    <List
                        dataSource={record.reviews}
                        renderItem={(review: Review) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <div>
                                            <p>{review.author}</p>
                                            <div>
                                                <p>{t(filters.lang, 'readerRating')}</p>
                                                <Rate
                                                    defaultValue={review.rating}
                                                    disabled
                                                    className="custom-rate"
                                                />
                                            </div>
                                        </div>
                                    }
                                    description={review.text}
                                />
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </div>
    );

    const columns = useMemo(() => getTableColumns(filters.lang), [filters.lang]);

    return (
        <div className={s.tableWrapper} >
            <Table
                rowKey="id"
                columns={columns}
                dataSource={books}
                loading={loading}
                expandable={{
                    expandedRowRender,
                    rowExpandable: () => true,
                }}
                pagination={false}
                scroll={{ y: 'calc(100vh - 150px)' }}
                onScroll={createInfiniteScrollHandler(loadMore, 100)}
            />
        </div>
    );
};
