import {Form, Select, Input, Checkbox, Modal} from 'antd';

const { Option } = Select;

const ShareModal = ({ visible, handleOk, handleCancel }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        console.log('Form values:', values);
        handleOk();
    };

    return (
        <Modal
            title="Share File"
            visible={visible}
            onOk={form.submit}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Select Permissions"
                    name="permissions"
                    rules={[{ required: true, message: 'Please select permissions' }]}
                >
                    <Select mode="multiple" placeholder="Select permissions">
                        <Option value="read">Read</Option>
                        <Option value="write">Write</Option>
                        <Option value="delete">Delete</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Enter User Email"
                    name="userEmail"
                    rules={[
                        { required: true, message: 'Please enter user email' },
                        { type: 'email', message: 'Please enter a valid email' }
                    ]}
                >
                    <Input placeholder="Enter user email" />
                </Form.Item>

                <Form.Item
                    name="notify"
                    valuePropName="checked"
                >
                    <Checkbox>Notify user by email</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ShareModal;
