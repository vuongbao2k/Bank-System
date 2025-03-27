import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Dropdown, Menu, Space } from 'antd';
import { FormOutlined, LoginOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';
import logo from '../../assets/logo-white.png';

function Header() {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      UserService.logout(); // Gọi API logout nếu có
    }
  };

  // Menu items for logged-in user
  const items = [
    {
      key: 'profile',
      label: <NavLink to="/profile">Xem Profile</NavLink>,
    },
    {
      type: 'divider',
    },
    ...(UserService.isAdmin() ? [
      {
        key: 'admin',
        label: <NavLink to="/admin">Quản lý</NavLink>,
        icon: <FormOutlined />,
      },
    ] : []),
    {
      key: 'settings',
      label: 'Cài đặt',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: <NavLink to="/login">Đăng xuất</NavLink>,
    },
  ];

  return (
    <header className="layout-default__header">
      {/* Logo JB Bank với liên kết đến trang chủ */}
      <div className="layout-default__logo">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="Logo JB Bank" />
        </NavLink>
      </div>

      {/* Navbar */}
      <nav className="layout-default__nav">
        <NavLink to="/about" className="nav-link">
          Về JB Bank
        </NavLink>
        <NavLink to="/news" className="nav-link">
          Tin tức
        </NavLink>
        <NavLink to="/investor" className="nav-link">
          Nhà đầu tư
        </NavLink>
        <NavLink to="/network" className="nav-link">
          Mạng lưới
        </NavLink>
        <NavLink to="/recruitment" className="nav-link">
          Tuyển dụng
        </NavLink>
      </nav>

      {/* Các nút tài khoản */}
      <div className="layout-default__account">
        {UserService.isAuthenticated() ? (
          <Dropdown
            overlay={<Menu items={items} onClick={handleMenuClick} />}
            trigger={['hover']}
            open={open} 
            onOpenChange={(flag) => setOpen(flag)}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined style={{ fontSize: 30, cursor: 'pointer' }} />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <NavLink to='/login'>
            <Button icon={<LoginOutlined />} size="large">Đăng nhập</Button>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
