import { Table, Spin, Layout, Button, message } from 'antd';
import Header from "../components/Header.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useGetSharedFiles } from '../services/SharedFilesService.js';
import { DownloadOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteDocument, useDownloadDocument } from "../services/DocumentService";

const { Content } = Layout;

const SharedFiles = () => {
    const { data: sharedFiles, isLoading, isError, refetch } = useGetSharedFiles();
    const deleteSharedFileMutation = useDeleteDocument();
    const downloadDocumentMutation = useDownloadDocument();
    //const uploadDocumentMutation = useUploadDocument();

    const handleSearch = (value) => {
        console.log('Searched:', value);
    };

    const handleDelete = async (record) => {
        try {
            if (record.permission && record.permission.type === 'DELETE') {
                await deleteSharedFileMutation.mutateAsync(record.document.documentUUID);
                message.success('File deleted successfully');
                refetch();
            } else {
                message.error('You do not have permission to delete this file');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            message.error('Error deleting file');
        }
    };

    const handleDownload = async (record) => {
        try {
            await downloadDocumentMutation.mutateAsync({ documentUUID: record.document.documentUUID, type: record.document.type });
        } catch (error) {
            console.error('Error downloading file:', error);
            message.error('Error downloading file');
        }
    };

    /*const handleUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await uploadDocumentMutation.mutateAsync(formData);
            message.success('File uploaded successfully');
            refetch();
        } catch (error) {
            console.error('Error uploading file:', error);
            message.error('Error uploading file');
        }
    };*/

    const renderActions = (record) => {
        const permission = record && record.permission && record.permission.type;
        switch (permission) {
            case 'READ':
                return <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownload(record)} />;
            case 'WRITE':
                return (
                    <>
                        <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownload(record)} />
                        <Button type="link" icon={<UploadOutlined />} />
                    </>
                );
            case 'DELETE':
                return (
                    <>
                        <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownload(record)} />
                        <Button type="link" icon={<UploadOutlined />}  />
                        <Button type="link" onClick={() => handleDelete(record)} icon={<DeleteOutlined />} />
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
                                render={(text, record) => renderActions(record)}
                            />
                        </Table>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default SharedFiles;