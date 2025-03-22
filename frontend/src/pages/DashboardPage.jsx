import React, { useEffect, useState } from 'react';
import { Typography, Button, message, Table, Form, Input, Modal, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAccounts, transferMoney } from '../services/authService';

const { Title } = Typography;
const { Option } = Select;

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (!token) {
        message.error('Bạn chưa đăng nhập!');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:1010/adminuser/get-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User data:', response.data);
        if (response.data.ourUsers) {
          setUser(response.data.ourUsers);
        } else {
          message.error('Dữ liệu người dùng không hợp lệ!');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        message.error('Không thể lấy thông tin người dùng!');
        navigate('/');
      }
    };

    const fetchAccounts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Bạn chưa đăng nhập!');
        navigate('/');
        return;
      }

      try {
        const accountsData = await getAccounts(token);
        setAccounts(accountsData);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        message.error('Không thể lấy danh sách tài khoản!');
      }
    };

    fetchUserProfile();
    fetchAccounts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Đăng xuất thành công!');
    navigate('/');
  };

  const handleTransfer = async (values) => {
    const token = localStorage.getItem('token');
    setLoading(true);

    try {
      // Nếu chỉ có một tài khoản, tự động gán sourceAccountId
      if (accounts.length === 1) {
        values.sourceAccountId = accounts[0].id;
      }

      console.log('Dữ liệu gửi đến API:', values);

      await transferMoney(token, values);
      message.success('Chuyển tiền thành công!');

      // Gọi lại API để cập nhật danh sách tài khoản
      const updatedAccounts = await getAccounts(token);
      setAccounts(updatedAccounts);

      setIsModalVisible(false);
    } catch (error) {
      console.error('Lỗi khi chuyển tiền:', error);
      message.error(error.message || 'Chuyển tiền thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'accountType',
      key: 'accountType',
    },
    {
      title: 'Số dư',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance) => balance.toLocaleString(),
    },
    {
      title: 'Loại tiền tệ',
      dataIndex: 'currency',
      key: 'currency',
    },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center' }}>
      <Title level={2}>Dashboard</Title>
      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        {user ? (
          <div>
            <p><strong>Tên người dùng:</strong> {user.username}</p> {/* Sử dụng username */}
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Đang tải thông tin người dùng...</p>
        )}
      </div>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px' }}>
        Chuyển tiền
      </Button>
      <Button type="primary" onClick={handleLogout} style={{ marginBottom: '20px', marginLeft: '10px' }}>
        Đăng xuất
      </Button>
      <Table
        dataSource={accounts}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />
      <Modal
        title="Chuyển tiền"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleTransfer} layout="vertical">
          {accounts.length > 1 ? (
            <Form.Item
              name="sourceAccountId"
              label="Tài khoản nguồn"
              rules={[{ required: true, message: 'Vui lòng chọn tài khoản nguồn!' }]}
            >
              <Select placeholder="Chọn tài khoản nguồn">
                {accounts.map((account) => (
                  <Option key={account.id} value={account.id}>
                    {account.accountNumber} - {account.balance.toLocaleString()}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <p>
              Tài khoản nguồn: {accounts[0]?.accountNumber} - {accounts[0]?.balance.toLocaleString()}
            </p>
          )}
          <Form.Item
            name="destinationAccountId"
            label="ID tài khoản đích"
            rules={[{ required: true, message: 'Vui lòng nhập ID tài khoản đích!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Số tiền"
            rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Chuyển tiền
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardPage;