import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Space, Tooltip } from 'antd';
import { FormOutlined, ScanOutlined, UserOutlined } from '@ant-design/icons';

function FooterAdmin() {
  return (
    <div className="layout-admin__footer">
      {/* Cài đặt Icon */}
      <div className="footer-icon">
        <Tooltip title="Cài đặt">
          <NavLink to="/settings">
            <FormOutlined style={{ fontSize: 24, color: 'white' }} />
          </NavLink>
        </Tooltip>
        <span className="icon-text">Cài đặt</span>
      </div>

      {/* Quét mã QR Icon (Lồi ra ngoài footer) */}
      <div className="footer-icon qr-icon">
        <Tooltip title="Quét mã QR">
          <NavLink to="/qr-code">
            <ScanOutlined style={{ fontSize: 40, color: 'white' }} />
          </NavLink>
        </Tooltip>
        <span className="icon-text">Quét mã QR</span>
      </div>

      {/* Tôi Icon */}
      <div className="footer-icon">
        <Tooltip title="Tôi">
          <NavLink to="/profile">
            <UserOutlined style={{ fontSize: 24, color: 'white' }} />
          </NavLink>
        </Tooltip>
        <span className="icon-text">Tôi</span>
      </div>
    </div>
  );
}

export default FooterAdmin;
