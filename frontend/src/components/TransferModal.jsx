// src/components/TransferModal.js
import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const TransferModal = ({ isModalVisible, setIsModalVisible, accounts, handleTransfer, loading }) => {
  return (
    <Modal
      title="Chuyển tiền"
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Form onFinish={handleTransfer} layout="vertical">
        <Form.Item
          name="sourceAccountId"
          label="Tài khoản nguồn"
          rules={[{ required: true, message: 'Vui lòng chọn tài khoản nguồn!' }]}
        >
          <Select placeholder="Chọn tài khoản nguồn">
            {accounts.map((account) => (
              <Option key={account.id} value={account.id}>
                {account.accountNumber} - {account.balance.toLocaleString()} {account.currency}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="destinationAccountNumber"
          label="Số tài khoản đích"
          rules={[{ required: true, message: 'Vui lòng nhập số tài khoản đích!' }]}
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
  );
};

export default TransferModal;
