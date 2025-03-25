// import React, { useEffect, useState } from 'react';
// import { Typography, Button, message, Table, Form, Input, Modal, Select } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { getAccounts, transferMoney } from '../services/UserService';

// const { Title } = Typography;
// const { Option } = Select;

// const DashboardPage = () => {
//   const [user, setUser] = useState(null);
//   const [accounts, setAccounts] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [transactions, setTransactions] = useState([]); // Không cần state selectedAccount
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         message.error('Bạn chưa đăng nhập!');
//         navigate('/');
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost:1010/adminuser/get-profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (response.data.ourUsers) {
//           setUser(response.data.ourUsers);
//         } else {
//           message.error('Dữ liệu người dùng không hợp lệ!');
//         }
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//         message.error('Không thể lấy thông tin người dùng!');
//         navigate('/');
//       }
//     };

//     const fetchAccounts = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         message.error('Bạn chưa đăng nhập!');
//         navigate('/');
//         return;
//       }

//       try {
//         const accountsData = await getAccounts(token);
//         setAccounts(accountsData);
//       } catch (error) {
//         console.error('Error fetching accounts:', error);
//         message.error('Không thể lấy danh sách tài khoản!');
//       }
//     };

//     fetchUserProfile();
//     fetchAccounts();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const allTransactions = [];

//         for (const account of accounts) {
//           // Lấy lịch sử giao dịch mà tài khoản là nguồn (Chuyển tiền)
//           const sentTransactions = await axios.get(
//             `http://localhost:1010/api/transactions/source/${account.accountNumber}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           sentTransactions.data.forEach((transaction) => {
//             transaction.type = 'Chuyển tiền';
//           });

//           // Lấy lịch sử giao dịch mà tài khoản là đích (Nhận tiền)
//           const receivedTransactions = await axios.get(
//             `http://localhost:1010/api/transactions/destination/${account.accountNumber}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           receivedTransactions.data.forEach((transaction) => {
//             transaction.type = 'Nhận tiền';
//           });

//           // Gộp giao dịch gửi và nhận
//           allTransactions.push(...sentTransactions.data, ...receivedTransactions.data);
//         }

//         // Sắp xếp giao dịch theo thời gian (mới nhất trước)
//         allTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//         setTransactions(allTransactions);
//       } catch (error) {
//         console.error('Lỗi khi lấy lịch sử giao dịch:', error);
//         message.error('Không thể lấy lịch sử giao dịch!');
//       }
//     };

//     if (accounts.length > 0) {
//       fetchTransactions();
//     }
//   }, [accounts]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     message.success('Đăng xuất thành công!');
//     navigate('/');
//   };

//   const handleTransfer = async (values) => {
//     const token = localStorage.getItem('token');
//     setLoading(true);

//     try {
//       if (accounts.length === 1) {
//         values.sourceAccountNumber = accounts[0].accountNumber;
//       } else {
//         const selectedAccount = accounts.find(account => account.id === values.sourceAccountId);
//         if (selectedAccount) {
//           values.sourceAccountNumber = selectedAccount.accountNumber;
//         } else {
//           throw new Error('Tài khoản nguồn không hợp lệ!');
//         }
//       }

//       delete values.sourceAccountId;

//       await transferMoney(token, values);
//       message.success('Chuyển tiền thành công!');

//       const updatedAccounts = await getAccounts(token);
//       setAccounts(updatedAccounts);

//       setIsModalVisible(false);
//     } catch (error) {
//       console.error('Lỗi khi chuyển tiền:', error);
//       message.error(error.message || 'Chuyển tiền thất bại!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns = [
//     {
//       title: 'Số tài khoản',
//       dataIndex: 'accountNumber',
//       key: 'accountNumber',
//     },
//     {
//       title: 'Loại tài khoản',
//       dataIndex: 'accountType',
//       key: 'accountType',
//     },
//     {
//       title: 'Số dư',
//       dataIndex: 'balance',
//       key: 'balance',
//       render: (balance) => balance.toLocaleString(),
//     },
//     {
//       title: 'Loại tiền tệ',
//       dataIndex: 'currency',
//       key: 'currency',
//     },
//   ];

//   const transactionColumns = [
//     {
//       title: 'Loại giao dịch',
//       dataIndex: 'type',
//       key: 'type',
//     },
//     {
//       title: 'Số tài khoản nguồn',
//       dataIndex: 'sourceAccountNumber',
//       key: 'sourceAccountNumber',
//     },
//     {
//       title: 'Số tài khoản đích',
//       dataIndex: 'destinationAccountNumber',
//       key: 'destinationAccountNumber',
//     },
//     {
//       title: 'Số tiền',
//       dataIndex: 'amount',
//       key: 'amount',
//       render: (amount) => amount.toLocaleString(),
//     },
//     {
//       title: 'Trạng thái',
//       dataIndex: 'status',
//       key: 'status',
//     },
//     {
//       title: 'Thời gian',
//       dataIndex: 'timestamp',
//       key: 'timestamp',
//       sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp), // Sắp xếp theo thời gian
//       render: (timestamp) => new Date(timestamp).toLocaleString(), // Hiển thị thời gian ở định dạng dễ đọc
//     },
//   ];

//   return (
//     <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center' }}>
//       <Title level={2}>Dashboard</Title>
//       <div style={{ marginBottom: '20px', textAlign: 'left' }}>
//         {user ? (
//           <div>
//             <p><strong>Tên người dùng:</strong> {user.username}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//           </div>
//         ) : (
//           <p>Đang tải thông tin người dùng...</p>
//         )}
//       </div>
//       <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '20px' }}>
//         Chuyển tiền
//       </Button>
//       <Button type="primary" onClick={handleLogout} style={{ marginBottom: '20px', marginLeft: '10px' }}>
//         Đăng xuất
//       </Button>
//       <Table
//         dataSource={accounts}
//         columns={columns}
//         rowKey="id"
//         pagination={false}
//         bordered
//       />
//       <Modal
//         title="Chuyển tiền"
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form onFinish={handleTransfer} layout="vertical">
//           <Form.Item
//             name="sourceAccountId"
//             label="Tài khoản nguồn"
//             rules={[{ required: true, message: 'Vui lòng chọn tài khoản nguồn!' }]}
//             initialValue={undefined}
//           >
//             <Select placeholder="Chọn tài khoản nguồn">
//               {accounts.map((account) => (
//                 <Option key={account.id} value={account.id}>
//                   {account.accountNumber} - {account.balance.toLocaleString()} {account.currency}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             name="destinationAccountNumber"
//             label="Số tài khoản đích"
//             rules={[{ required: true, message: 'Vui lòng nhập số tài khoản đích!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="amount"
//             label="Số tiền"
//             rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
//           >
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading} block>
//               Chuyển tiền
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//       <div>
//         <h2>Lịch Sử Giao Dịch</h2>
//         <Table
//           dataSource={transactions} // Hiển thị toàn bộ giao dịch
//           columns={transactionColumns}
//           rowKey={(record) => `${record.id}-${record.type}`}
//           pagination={false}
//           bordered
//         />
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;