import { Input, Button } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = ({ onSearch, onUpload }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
                <Search placeholder="Search..." onSearch={onSearch} style={{ width: 200 }} prefix={<SearchOutlined />} />
            </div>
            <div>
                <Button type="primary" onClick={onUpload} icon={<UploadOutlined />}>Upload File</Button>
            </div>
        </div>
    );
};

export default SearchBar;
