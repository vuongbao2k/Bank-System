import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import UserService from '../../services/UserService';

function Header() {
  return (
    <header className="layout-default__header">
      {/* Logo JB Bank với liên kết đến trang chủ */}
      <div className="layout-default__logo">
        <NavLink to='/' className="logo-link">
          JB Bank
        </NavLink>
      </div>

      {/* Các nút tài khoản */}
      <div className='layout-default__account'>
        {UserService.isAuthenticated() ? (
          <>
            {UserService.isAdmin() && (
              <span className="ml-10">
                <NavLink to='/admin'>
                  <Button icon={<HomeOutlined />} size="large">Quản lý</Button>
                </NavLink>
              </span>
            )}
            <span className="ml-10">
              <NavLink to='/profile'>
                <Button icon={<UserOutlined />} size="large">Xem Profile</Button>
              </NavLink>
            </span>
            <span className="ml-10">
              <NavLink to='/logout'>
                <Button icon={<LoginOutlined />} size="large">Đăng xuất</Button>
              </NavLink>
            </span>
          </>
        ) : (
          <>
            <span className="ml-10">
              <NavLink to='/login'>
                <Button icon={<LoginOutlined />} size="large">Đăng nhập</Button>
              </NavLink>
            </span>

            <span className="ml-10">
              <NavLink to='/register'>
                <Button type='primary' icon={<UserAddOutlined />} size="large">Đăng ký</Button>
              </NavLink>
            </span>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
