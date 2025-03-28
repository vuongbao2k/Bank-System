import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

// Import logo
import logo from '../../assets/logo-white.png';
import './RegisterPage.scss'

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const dataWithRole = { ...values, role: 'USER' };
      // eslint-disable-next-line no-unused-vars
      const data = await UserService.register(dataWithRole);
      message.success('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.error || 'Đăng ký thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <img src={logo} alt="Logo" className="logo" />
      <div className="register-card">
        <Title level={1} className="register-title">JB Bank</Title>
        <Text className="greeting-text">Xin kính chào Quý khách</Text>
        <Form
          name="register"
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
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng ký
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => navigate('/login')} block>
              Đã có tài khoản? Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
