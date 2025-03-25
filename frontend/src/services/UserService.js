import axiosInstance from "./axiosInstance";

class UserService {
  static async login(credentials) {
    const response = await axiosInstance.post(`/auth/login`, credentials);
    return response.data;
  }

  static async register(userData) {
    const response = await axiosInstance.post(`/auth/register`, userData);
    return response.data;
  }

  static async getAllUsers() {
    const response = await axiosInstance.get(`/admin/get-all-users`);
    return response.data;
  }

  static async getYourProfile() {
    const response = await axiosInstance.get(`/adminuser/get-profile`);
    return response.data;
  }

  static async getUserById(userId) {
    const response = await axiosInstance.get(`/admin/get-users/${userId}`);
    return response.data;
  }

  static async deleteUser(userId) {
    const response = await axiosInstance.delete(`/admin/delete/${userId}`);
    return response.data;
  }

  static async updateUser(userId, userData) {
    const response = await axiosInstance.put(`/admin/update/${userId}`, userData);
    return response.data;
  }

  // AUTHENTICATION CHECKER

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("storage")); // 🔥 Thông báo cập nhật UI
  }

  static isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  static isAdmin() {
    return localStorage.getItem("role") === "ADMIN";
  }

  static isUser() {
    return localStorage.getItem("role") === "USER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;

// const API_URL = 'http://localhost:1010/auth';
// const ACCOUNT_API_URL = 'http://localhost:1010/api/accounts'; // Thêm URL cho API accounts

// export const login = async (credentials) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, credentials);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// // Thêm hàm getAccounts
// export const getAccounts = async (token) => {
//   try {
//     const response = await axios.get(ACCOUNT_API_URL, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// export const transferMoney = async (token, transferData) => {
//   try {
//     console.log('Dữ liệu gửi đến backend:', transferData); // Thêm dòng này để kiểm tra dữ liệu
//     const response = await axios.post(`${ACCOUNT_API_URL}/transfer`, transferData, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Lỗi từ backend:', error.response?.data); // Thêm dòng này để kiểm tra lỗi từ backend
//     throw error.response.data;
//   }
// };

// export const getTransactionHistory = async (accountNumber) => {
//   const token = localStorage.getItem('token');
//   const response = await axios.get(`http://localhost:1010/api/transactions/${accountNumber}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };