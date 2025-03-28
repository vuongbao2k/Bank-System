import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Space, Badge, Tooltip } from 'antd'; // Thêm Badge vào đây
import { FormOutlined, BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';
import logo from '../../assets/logo-white.png';

function HeaderAdmin() {
  return (
    <header className="layout-admin__header">
      {/* Logo JB Bank với liên kết đến trang chủ */}
      <div className="layout-admin__logo">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="Logo JB Bank" />
        </NavLink>
      </div>

      {/* Các biểu tượng quản lý, thông báo và đăng xuất */}
      <div className="layout-admin__actions">
        {/* Icon Quản lý - Chỉ hiển thị với vai trò Admin */}
        {UserService.isAdmin() && (
          <Tooltip title="Quản lý">
            <NavLink to="/admin">
              <UserOutlined style={{ fontSize: 30, color: 'white', marginLeft: '20px', cursor: 'pointer' }} />
            </NavLink>
          </Tooltip>
        )}

        {/* Icon Thông báo */}
        <Badge count={5} style={{ cursor: 'pointer' }}>
          <BellOutlined style={{ fontSize: 30, color: 'white', marginLeft: '20px' }} />
        </Badge>

        {/* Icon Đăng xuất */}
        <NavLink to="/login">
          <Button
            type="link"
            icon={<LogoutOutlined />}
            style={{ color: 'white', marginLeft: '20px' }}
          >
            Đăng xuất
          </Button>
        </NavLink>
      </div>
    </header>
  );
}

export default HeaderAdmin;
