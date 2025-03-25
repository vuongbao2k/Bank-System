import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import './Home.scss';  // Import file CSS hoặc SCSS cho trang chủ

function Home() {
  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__title">Chào mừng đến với JB Bank</h1>
        <p className="home__description">
          Một ngân hàng đáng tin cậy, cung cấp các dịch vụ tài chính tiên tiến cho khách hàng.
        </p>
        <div className="home__actions">
          <NavLink to="/login">
            <Button type="primary" size="large" style={{ marginRight: '20px' }}>
              Đăng nhập
            </Button>
          </NavLink>
          <NavLink to="/register">
            <Button size="large">
              Đăng ký
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
