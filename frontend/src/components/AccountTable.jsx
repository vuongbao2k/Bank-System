// src/components/AccountTable.js
import React from 'react';
import { Table } from 'antd';

const AccountTable = ({ accounts }) => {
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
    <Table
      dataSource={accounts}
      columns={columns}
      rowKey="id"
      pagination={false}
      bordered
    />
  );
};

export default AccountTable;
