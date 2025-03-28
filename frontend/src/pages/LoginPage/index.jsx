import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';

// Import logo
import logo from '../../assets/logo-white.png';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await UserService.login(values);
      message.success('Đăng nhập thành công!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('role', data.role);
      navigate('/profile');
    } catch (error) {
      message.error(error.message || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <img src={logo} alt="Logo" className="logo" />
      <div className="login-card">
        <Title level={1} className="login-title">JB Bank</Title>
        <Text className="greeting-text">Xin kính chào Quý khách</Text>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => navigate('/register')} block>
              Chưa có tài khoản? Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
