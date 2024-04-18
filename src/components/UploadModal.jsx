import {Modal, Form, Button, Upload, Input, Space} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const UploadModal = ({ visible, handleOk, handleCancel, onFinish }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <Modal
            title="Upload File"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null} // Remove the default OK and Cancel buttons
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
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UploadModal;