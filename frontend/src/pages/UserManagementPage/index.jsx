import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Switch, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { CheckCircleOutlined, CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';
import './UserManagementPage.scss';

const { Option } = Select;

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);  // State lưu trữ dữ liệu đã lọc
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState(''); // Lưu giá trị tìm kiếm

  // Hàm lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      if (response) {
        setUsers(response.ourUsersList);
        setFilteredUsers(response.ourUsersList); // Lưu danh sách ban đầu vào filteredUsers
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      message.error('Không thể lấy danh sách người dùng!');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm tìm kiếm người dùng theo username hoặc email
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);  // Cập nhật giá trị tìm kiếm
    if (value) {
      const filtered = users.filter((user) => 
        user.username.toLowerCase().includes(value.toLowerCase()) || 
        user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Nếu không có gì tìm kiếm, hiển thị tất cả người dùng
    }
  };

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
        setFilteredUsers(updatedUsers);  // Cập nhật dữ liệu đã lọc sau khi cập nhật người dùng
        message.success('Cập nhật người dùng thành công!');
      } else {
        // Thêm người dùng mới
        await UserService.register(values);
        const newUser = { ...values, id: users.length + 1 };
        setUsers([...users, newUser]);
        setFilteredUsers([...users, newUser]); // Cập nhật dữ liệu đã lọc sau khi thêm người dùng
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
          const updatedUsers = users.filter(user => user.id !== userId);
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);  // Cập nhật dữ liệu đã lọc sau khi xóa người dùng
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
    <>
      <div className="manage">
        <h2>Quản lý người dùng</h2>
      </div>
      <div className="container">
        {/* Thanh tìm kiếm */}
        <Input
          size="large"
          placeholder="Tìm kiếm theo Username hoặc Email"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 20, width: '100%', maxWidth: '400px' }}
          prefix={<SearchOutlined />}
        />
        <Button
          size="large"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleAddOrEdit(null)}
          style={{ margin: 20 }}
        >
          Thêm người dùng
        </Button>
        <Table
          columns={columns}
          dataSource={filteredUsers}  // Hiển thị dữ liệu đã lọc
          rowKey="id"
          pagination={{ pageSize: 5 }}
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
    </>
  );
}

export default UserManagementPage;
