import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

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
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
      <Title level={2}>Đăng ký tài khoản</Title>
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
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
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
  );
};

export default RegisterPage;
