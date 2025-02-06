import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css'; // 引入自定义样式文件
import { config } from '@/config';

const { Title } = Typography;

const AdminLogin = () => {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        // 检查是否有保存的用户名和密码
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

        if (savedUsername && savedPassword && savedRememberMe) {
            setRememberMe(true);
            form.setFieldsValue({
                username: savedUsername,
                password: savedPassword,
                remember: true, // 设置表单的 remember 字段为 true
            });
        }
    }, []);

    const onFinish = async (values) => {
        try {
            // const response = await axios.post('http://localhost:3000/login', {
            const response = await axios.post(config.login, {
                username: values.username,
                password: values.password,
            });

            if (response.data.success) {
                message.success('登录成功！');
                // 登录成功后，根据用户的选择保存用户名和密码
                if (rememberMe) {
                    localStorage.setItem('username', values.username);
                    localStorage.setItem('password', values.password);
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    localStorage.removeItem('rememberMe');
                }
                // 验证
                localStorage.setItem('auth', 'true');
                // 保存 token 并跳转到后台主页
                localStorage.setItem('token', response.data.token);
                console.log('nav to admin');
                navigate('/admin', { replace: true });
            } else {
                message.error(response.data.message || '登录失败');
            }
        } catch (error) {
            console.error('登录失败:', error);
            message.error('登录失败，请检查用户名和密码是否正确');
        }
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const [form] = Form.useForm();

    return (
        <div className="login-container">
            <Card className="login-card">
                <Title level={3} className="login-title">
                    登录
                </Title>
                <Form
                    form={form}
                    name="login_form"
                    onFinish={onFinish}
                    initialValues={{ remember: false }} // 设置默认值为 false
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="用户名"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox
                            defaultChecked={false} // 设置默认不选中
                            onChange={handleRememberMeChange}
                        >
                            记住密码
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AdminLogin;
