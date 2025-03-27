import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Switch, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';

const { Option } = Select;

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  // Hàm lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      if (response) {
        setUsers(response.ourUsersList);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      message.error('Không thể lấy danh sách người dùng!');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm xử lý mở modal thêm/sửa người dùng
  const handleAddOrEdit = (user) => {
    setCurrentUser(user);
    form.setFieldsValue(user || { username: '', email: '', role: 'USER', enabled: true });
    setIsModalVisible(true);
  };

  // Hàm xử lý đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  // Hàm xử lý thêm hoặc sửa người dùng
  const handleSubmit = async (values) => {
    console.log("Data being sent to register:", values);
    try {
      if (currentUser) {
        // Cập nhật người dùng
        await UserService.updateUser(currentUser.id, values);
        const updatedUsers = users.map((user) =>
          user.id === currentUser.id ? { ...user, ...values } : user
        );
        setUsers(updatedUsers);
        message.success('Cập nhật người dùng thành công!');
      } else {
        // Thêm người dùng mới
        await UserService.register(values);
        const newUser = { ...values, id: users.length + 1 };
        setUsers([...users, newUser]);
        message.success('Thêm người dùng thành công!');
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Lỗi khi thêm/sửa người dùng:', error);
      message.error('Có lỗi xảy ra!');
    }
  };

  // Hàm xử lý xóa người dùng với xác nhận
  const handleDelete = (userId) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa người dùng này?',
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await UserService.deleteUser(userId); // API để xóa người dùng
          setUsers(users.filter(user => user.id !== userId));
          message.success('Xóa người dùng thành công!');
        } catch (error) {
          console.error('Lỗi khi xóa người dùng:', error);
          message.error('Có lỗi xảy ra khi xóa người dùng!');
        }
      },
    });
  };

  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled) => (
        <span>
          {enabled ? (
            <CheckCircleOutlined style={{ color: 'green', fontSize: '16px' }} />
          ) : (
            <CloseCircleOutlined style={{ color: 'red', fontSize: '16px' }} />
          )}
        </span>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleAddOrEdit(record)}
            style={{ marginRight: 10 }}
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <h2>Quản lý người dùng</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleAddOrEdit(null)}
        style={{ marginBottom: 20 }}
      >
        Thêm người dùng
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={false}
      />
      <Modal
        title={currentUser ? 'Sửa người dùng' : 'Thêm người dùng'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={currentUser || { username: '', email: '', role: 'USER', enabled: true }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Select>
              <Option value="USER">USER</Option>
              <Option value="ADMIN">ADMIN</Option>
            </Select>
          </Form.Item>

          {/* Thêm mật khẩu ở vị trí hợp lý */}
          {!currentUser && ( // Mật khẩu chỉ cần khi thêm người dùng mới
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item
            label="Enabled"
            name="enabled"
            valuePropName="checked"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái người dùng!' }]}
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {currentUser ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </div>
  );
}

export default UserManagementPage;
