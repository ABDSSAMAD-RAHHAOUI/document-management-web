import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../services/SecurityService.js";
import '../index.css';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginMutation = useLogin();

    function onFinish() {
        navigate('/dashboard');
    }

    const handleSubmit = async (values) => {
        setLoading(true);
        const { email, password } = values;

        try {
            await loginMutation.mutateAsync({ email, password });
            message.success('Logged in successfully!');
            onFinish();
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
        }

        setLoading(false);
    };

    return (
        <div className="container">
            <div className="login-form">
                <h2 className="form-title">Login</h2>
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="">Forgot password</a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Log in
                        </Button>
                        Or <a href="/register">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
