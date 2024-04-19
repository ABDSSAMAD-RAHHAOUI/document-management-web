import { Table, Spin, Layout, Button } from 'antd';
import Header from "../components/Header.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useGetSharedFiles } from '../services/SharedFilesService.js';
import { DownloadOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;

const SharedFiles = () => {
    const { data: sharedFiles, isLoading, isError } = useGetSharedFiles();

    const handleSearch = (value) => {
        console.log('Searched:', value);
    };

    const renderActions = (permission) => {
        switch (permission) {
            case 'READ':
                return <Button type="link" icon={<DownloadOutlined />} />;
            case 'WRITE':
                return (
                    <>
                        <Button type="link" icon={<DownloadOutlined />} />
                        <Button type="link" icon={<UploadOutlined />} />
                    </>
                );
            case 'DELETE':
                return (
                    <>
                        <Button type="link" icon={<DownloadOutlined />} />
                        <Button type="link" icon={<UploadOutlined />} />
                        <Button type="link" icon={<DeleteOutlined />} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Layout>
                <Sidebar />
                <Content style={{ margin: '0 16px' }}>
                    <SearchBar onSearch={handleSearch} showUploadButton={false} />

                    {isLoading ? (
                        <Spin />
                    ) : isError ? (
                        <div>Error fetching data</div>
                    ) : (
                        <Table dataSource={sharedFiles}>
                            <Table.Column title="Name" dataIndex={['document', 'name']} key="name" render={text => <a href="#">{text}</a>} />
                            <Table.Column title="Size" dataIndex={['document', 'metadata', 0, 'value']} key="size" />
                            <Table.Column title="Creation Date" dataIndex={['document', 'creationDate']} key="creationDate" />
                            <Table.Column title="Shared By" dataIndex={['document', 'user', 'email']} key="user" />
                            <Table.Column
                                title="Permission"
                                dataIndex="permission"
                                key="permission"
                                render={permission => permission && permission.type ? permission.type : "-"}
                            />
                            <Table.Column
                                title="Actions"
                                key="actions"
                                render={(text, record) => renderActions(record.permission && record.permission.type)}
                            />
                        </Table>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default SharedFiles;