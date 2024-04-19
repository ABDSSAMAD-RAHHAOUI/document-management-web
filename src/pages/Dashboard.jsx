import { useState } from 'react';
import {Table, Spin, Layout, Button, message} from 'antd';
import Header from "../components/Header.jsx";
import '../index.css';
import SearchBar from "../components/SearchBar.jsx";
import UploadModal from "../components/UploadModal.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useCreateDocument, useGetDocuments, useDownloadDocument ,useDeleteDocument} from '../services/DocumentService';
import {DeleteOutlined, DownloadOutlined, ShareAltOutlined, UploadOutlined} from "@ant-design/icons";
import ShareModal from "../components/ShareModal.jsx";
import {render} from "react-dom";

const { Content } = Layout;

const Dashboard = () => {
    const [searchValue, setSearchValue] = useState('');
    const { data: documents, isLoading, isError ,refetch: refetchDocuments} = useGetDocuments(searchValue);
    const createDocumentMutation = useCreateDocument();
    const [modalVisible, setModalVisible] = useState(false);
    const downloadDocumentMutation = useDownloadDocument();
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const deleteDocumentMutation = useDeleteDocument();

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const handleDelete = async (record) => {
        try {
            await deleteDocumentMutation.mutateAsync(record.documentUUID);
            message.success('Document deleted successfully');
            refetchDocuments();
        } catch (error) {
            message.error('Error deleting document');
        }
    };

    const handleShare = () => {
        setShareModalVisible(true);
    };

    const handleDownload = async (record) => {
        try {
            await downloadDocumentMutation.mutateAsync({ documentUUID: record.documentUUID, type: record.type });
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const convertBtoMB = (sizeInKB) => {
        return (sizeInKB / 1024/ 1024).toFixed(2);
    };

    const handleUpload = () => {
        setModalVisible(true);
    };

    const onFinish = async (formData) => {
        createDocumentMutation.mutate(formData);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Layout>
                <Sidebar />
                <Content style={{ margin: '0 16px' }}>
                    <SearchBar onSearch={handleSearch} showUploadButton={true} onUpload={handleUpload} />
                    {isLoading ? (
                        <Spin />
                    ) : isError ? (
                        <div>Error fetching data</div>
                    ) : (
                        <Table dataSource={documents}>
                            <Table.Column title="Name" dataIndex="name" key="name" render={text => <a href="#">{text}</a>} />
                            <Table.Column title="Type" dataIndex="type" key="type" />
                            <Table.Column
                                title="Size (MB)"
                                dataIndex="metadata"
                                key="size"
                                render={metadata => convertBtoMB(parseFloat(metadata.find(item => item.key === 'size')?.value || 0))}
                            />
                            <Table.Column title="Creation Date" dataIndex="creationDate" key="creationDate" />
                            <Table.Column
                                title="Actions"
                                key="actions"
                                render={(text, record) => (
                                    <div>
                                        <Button type="link" onClick={() => handleDownload(record)} icon={<DownloadOutlined />} />
                                        <Button type="link" onClick={() => handleDelete(record)} icon={<DeleteOutlined />} />
                                        <Button type="link" onClick={() => handleUpload()} icon={<UploadOutlined />} />
                                        <Button type="link" onClick={() => handleShare(record)} icon={<ShareAltOutlined />} />
                                    </div>
                                )}
                            />
                        </Table>
                    )}
                    <UploadModal
                        visible={modalVisible}
                        handleCancel={handleCancel}
                        onFinish={onFinish}
                    />
                    <ShareModal
                        visible={shareModalVisible}
                        handleOk={() => setShareModalVisible(false)}
                        handleCancel={() => setShareModalVisible(false)}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
