import { useState } from 'react';
import { Table, Spin } from 'antd';
import Header from "../components/Header.jsx";
import '../index.css';
import SearchBar from "../components/SearchBar.jsx";
import UploadModal from "../components/UploadModal.jsx";
import { useGetDocuments } from '../services/DocumentService';

const Dashboard = () => {
    const { data: documents, isLoading, isError } = useGetDocuments(); // Fetch documents data

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleSearch = (value) => {
        // Handle search functionality
        console.log('Searched:', value);
    };

    const handleUpload = () => {
        setModalVisible(true);
    };

    const onFinish = (values) => {
        console.log('Received values:', values);
        // Perform submit logic here
    };

    return (
        <div>
            <Header />
            <SearchBar onSearch={handleSearch} onUpload={handleUpload} />
            {isLoading ? (
                <Spin />
            ) : isError ? (
                <div>Error fetching data</div>
            ) : (
                <Table dataSource={documents}>
                    <Table.Column title="Name" dataIndex="name" key="name" render={text => <a href="#">{text}</a>} />
                    <Table.Column title="Type" dataIndex="type" key="type" />
                    <Table.Column title="Creation Date" dataIndex="creationDate" key="creationDate" />
                    <Table.Column title="User" dataIndex="user" key="user" render={user => user.username} />
                </Table>
            )}
            <UploadModal
                visible={modalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                onFinish={onFinish}
            />
        </div>
    );
};

export default Dashboard;