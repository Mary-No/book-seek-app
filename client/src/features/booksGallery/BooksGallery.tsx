import React, {useState} from 'react';
import {Card, Col, Rate, Row} from 'antd';
import BookCoverWithText from "../../components/BookCoverWithText.tsx";
import {useAppSelector} from "../../hooks.ts";
import s from './BooksGallery.module.scss'
import type {Book} from '../../types.ts';
import {BookModal} from './BookModal.tsx';

type Props = {
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};

const BooksGallery: React.FC<Props> = ({onScroll}) => {
    const books = useAppSelector((state) => state.books.books);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    return (
        <div
            className={s.container}
            onScroll={onScroll}
        >
            <Row gutter={[32, 32]}>
                {books.map(book => (
                    <Col key={book.id} xs={24} sm={12} md={12} lg={8} xl={6}>
                        <Card
                            className={s.card}
                            hoverable
                            onClick={() => setSelectedBook(book)}
                            cover={<BookCoverWithText author={book.author} imageUrl={book.coverUrl} title={book.title}
                                                      width={200} height={300}/>}
                            bodyStyle={{padding: 16}}
                        >
                            <Card.Meta className={s.text} title={book.title} description={book.author}/>
                            <Rate
                                className={s.rate}
                                defaultValue={book.rating}
                                disabled
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
            <BookModal
                book={selectedBook}
                open={!!selectedBook}
                onClose={() => setSelectedBook(null)}
            />
        </div>
    );
};

export default BooksGallery;
