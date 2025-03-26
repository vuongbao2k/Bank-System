import React, { useEffect, useState } from 'react';
import { message, Button } from 'antd';
import UserService from '../../services/UserService';

import AccountInfo from '../../components/AccountInfo';
import AccountCard from '../../components/AccountCard';
import TransactionHistory from '../../components/TransactionHistory';
import TransferModal from '../../components/TransferModal';
import FunctionIcons from '../../components/FunctionIcons';
import './DashboardPage.scss'

const DashboardPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsData = await UserService.getAccounts();
        setAccounts(accountsData);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        message.error('Không thể lấy danh sách tài khoản!');
      }
    };

    fetchAccounts();
  }, []);

  const handleTransfer = async (values) => {
    setLoading(true);
    try {
      if (accounts.length === 1) {
        values.sourceAccountNumber = accounts[0].accountNumber;
      } else {
        const selectedAccount = accounts.find(account => account.id === values.sourceAccountId);
        if (selectedAccount) {
          values.sourceAccountNumber = selectedAccount.accountNumber;
        } else {
          throw new Error('Tài khoản nguồn không hợp lệ!');
        }
      }

      delete values.sourceAccountId;

      await UserService.transferMoney(values);
      message.success('Chuyển tiền thành công!');

      // Sau khi chuyển tiền thành công, lấy lại danh sách tài khoản và cập nhật state
      const updatedAccounts = await UserService.getAccounts();
      setAccounts(updatedAccounts);  // Đây là lúc `accounts` được cập nhật và truyền lại vào AccountCard

      setIsModalVisible(false);
    } catch (error) {
      console.error('Lỗi khi chuyển tiền:', error);
      message.error(error.message || 'Chuyển tiền thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '100px auto', textAlign: 'center' }}>
      <AccountInfo />
      
      <AccountCard accounts={accounts} />
      <div className="button-container">
        <button className="button-87" onClick={() => setIsModalVisible(true)}>
          Chuyển tiền
        </button>
      </div>
      <FunctionIcons />

      <TransferModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        accounts={accounts}
        handleTransfer={handleTransfer}
        loading={loading}
      />
      <TransactionHistory accounts={accounts} />
    </div>
  );
};

export default DashboardPage;
