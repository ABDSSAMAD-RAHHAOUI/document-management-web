import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../services/SecurityService';
import {PageHeader} from "@ant-design/pro-layout";

const Header = () => {
    const navigate = useNavigate();
    const { mutate: logout } = useLogout();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <PageHeader
            className="site-page-header"
            title="Dashboard"
            extra={[
                <div key="search-upload" style={{ display: 'flex', alignItems: 'center' }}>
                    <Button type="primary" onClick={handleLogout}>Logout</Button>
                </div>
            ]}
        />
    );
};

export default Header;
