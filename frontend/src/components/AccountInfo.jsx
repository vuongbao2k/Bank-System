// src/components/AccountInfo.js
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import axios from 'axios';

const AccountInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Bạn chưa đăng nhập!');
        return;
      }

      try {
        const response = await axios.get('http://localhost:1010/adminuser/get-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.ourUsers) {
          setUser(response.data.ourUsers);
        } else {
          message.error('Dữ liệu người dùng không hợp lệ!');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        message.error('Không thể lấy thông tin người dùng!');
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
      {user ? (
        <div>
          <p><strong>Tên người dùng:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Đang tải thông tin người dùng...</p>
      )}
    </div>
  );
};

export default AccountInfo;
