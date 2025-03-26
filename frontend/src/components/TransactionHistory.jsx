// src/components/TransactionHistory.js
import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import UserService from '../services/UserService';

const TransactionHistory = ({ accounts }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const allTransactions = [];

        for (const account of accounts) {
          // Lấy lịch sử giao dịch mà tài khoản là nguồn (Chuyển tiền)
          const sentTransactions = await UserService.getSentTransactions(account.accountNumber);
          sentTransactions.forEach((transaction) => {
            transaction.type = 'Chuyển tiền';
          });

          // Lấy lịch sử giao dịch mà tài khoản là đích (Nhận tiền)
          const receivedTransactions = await UserService.getReceivedTransactions(account.accountNumber);
          receivedTransactions.forEach((transaction) => {
            transaction.type = 'Nhận tiền';
          });

          // Gộp giao dịch gửi và nhận
          allTransactions.push(...sentTransactions, ...receivedTransactions);
        }

        // Sắp xếp giao dịch theo thời gian (mới nhất trước)
        allTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setTransactions(allTransactions);
      } catch (error) {
        console.error('Lỗi khi lấy lịch sử giao dịch:', error);
        message.error('Không thể lấy lịch sử giao dịch!');
      }
    };

    if (accounts.length > 0) {
      fetchTransactions();
    }
  }, [accounts]);

  const transactionColumns = [
    {
      title: 'Loại giao dịch',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Số tài khoản nguồn',
      dataIndex: 'sourceAccountNumber',
      key: 'sourceAccountNumber',
    },
    {
      title: 'Số tài khoản đích',
      dataIndex: 'destinationAccountNumber',
      key: 'destinationAccountNumber',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => amount.toLocaleString(),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      render: (timestamp) => new Date(timestamp).toLocaleString(),
    },
  ];

  return (
    <div>
      <h2>Lịch Sử Giao Dịch</h2>
      <Table
        dataSource={transactions}
        columns={transactionColumns}
        rowKey={(record) => `${record.id}-${record.type}`}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default TransactionHistory;
