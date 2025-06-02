import { Button, Space } from 'antd';
import { TableOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setViewMode } from '../../app/api/booksSlice';


const ViewModeSwitcher = () => {
    const dispatch = useAppDispatch();
    const viewMode = useAppSelector(state => state.books.viewMode);

    return (
        <Space>
            <Button
                type={viewMode === 'table' ? 'primary' : 'default'}
                icon={<TableOutlined />}
                onClick={() => dispatch(setViewMode('table'))}
                aria-label="Table View"
            />
            <Button
                type={viewMode === 'gallery' ? 'primary' : 'default'}
                icon={<AppstoreOutlined />}
                onClick={() => dispatch(setViewMode('gallery'))}
                aria-label="Gallery View"
            />
        </Space>
    );
};

export default ViewModeSwitcher;
