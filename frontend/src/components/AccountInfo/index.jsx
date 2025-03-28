import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import UserService from '../../services/UserService';
import './AccountInfo.scss'

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
        const response = await UserService.getYourProfile();
        if (response.ourUsers) {
          setUser(response.ourUsers);
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
    <div className="account-info-container">
      {user ? (
        <div className="greeting-message">
          <p className="greeting-text">Xin chào, {user.username}!</p>
          <p className="subtext">Chúc bạn một ngày tốt lành</p>
        </div>
      ) : (
        <p>Đang tải thông tin người dùng...</p>
      )}
    </div>
  );
};

export default AccountInfo;
