import {Image, List, Modal, Rate, Typography} from "antd";
import type {Book, Review} from "../../types";
import {t} from "../../utils/translate.ts";
import {useAppSelector} from "../../hooks.ts";

const {Title, Paragraph} = Typography;

type Props = {
    book: Book | null;
    open: boolean;
    onClose: () => void;
};

export const BookModal = ({book, open, onClose}: Props) => {
    const filters = useAppSelector((state) => state.filters);
    if (!book) return null;
    return (
        <Modal open={open} onCancel={onClose} footer={null} width="60%" centered>
            <div>
                <div style={{display: "flex"}}><Image
                    src={book.coverUrl}
                    alt={book.title}
                    width={130}
                    height={200}
                    style={{marginBottom: 16}}
                    preview={false}
                />
                    <div style={{marginLeft: "16px"}}><Title level={4}>{book.title}</Title>
                        <Paragraph type="secondary">{book.author}</Paragraph>
                        <Rate
                            defaultValue={book.rating}
                            disabled
                        />
                    </div>
                </div>
                <div>
                    <h3>{t(filters.lang, 'reviews')}</h3>
                    {book.reviews.length === 0 ? (
                        <Paragraph>No reviews</Paragraph>
                    ) : (
                        <List
                            dataSource={book.reviews}
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
        </Modal>
    );
};
