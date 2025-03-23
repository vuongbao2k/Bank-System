import axios from 'axios';

const API_URL = 'http://localhost:1010/auth';
const ACCOUNT_API_URL = 'http://localhost:1010/api/accounts'; // Thêm URL cho API accounts

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Thêm hàm getAccounts
export const getAccounts = async (token) => {
  try {
    const response = await axios.get(ACCOUNT_API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const transferMoney = async (token, transferData) => {
  try {
    console.log('Dữ liệu gửi đến backend:', transferData); // Thêm dòng này để kiểm tra dữ liệu
    const response = await axios.post(`${ACCOUNT_API_URL}/transfer`, transferData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi từ backend:', error.response?.data); // Thêm dòng này để kiểm tra lỗi từ backend
    throw error.response.data;
  }
};

export const getTransactionHistory = async (accountNumber) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`http://localhost:1010/api/transactions/${accountNumber}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};