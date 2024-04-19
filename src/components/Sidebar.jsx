import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const Sidebar = () => {
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1"><Link to="/dashboard">Dashboard</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/shared">Shared Files</Link></Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
