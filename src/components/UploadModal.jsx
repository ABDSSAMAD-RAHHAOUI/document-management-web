import { Modal, Form, Button, Upload, Input, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const UploadModal = ({ visible, handleCancel, onFinish,documentUUID  }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };
    const handleFinish = () => {
        form.setFieldValue('file', fileList[0].originFileObj);
        form
            .validateFields()
            .then((values) => {
                const { file, metadata } = values;
                const formData = new FormData();
                formData.append('file', file);
                console.log(metadata)
                const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
                formData.append('metadata', metadataBlob);
                if (documentUUID) {
                    const documentUUIDBlob = new Blob([JSON.stringify(documentUUID)], { type: 'application/json' });

                    formData.append('documentUUID', documentUUIDBlob);
                    console.log(documentUUID);
                    onFinish(formData);
                } else {
                    onFinish(formData);
                }
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    return (
        <Modal
            title="Upload File"
            visible={visible}
            onOk={handleFinish}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                name="uploadForm"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.List name="metadata">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'key']}
                                        fieldKey={[fieldKey, 'key']}
                                        rules={[{ required: true, message: 'Please enter key' }]}
                                    >
                                        <Input placeholder="Key" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        fieldKey={[fieldKey, 'value']}
                                        rules={[{ required: true, message: 'Please enter value' }]}
                                    >
                                        <Input placeholder="Value" />
                                    </Form.Item>
                                    <Button type="dashed" onClick={() => remove(name)}>Remove</Button>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>Add metadata</Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item name="file" label="Upload File" valuePropName="fileList" getValueFromEvent={handleFileChange}>
                    <Upload
                        fileList={fileList}
                        beforeUpload={() => false}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={handleFinish}>Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UploadModal;
