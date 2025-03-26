import React from 'react';
import { Card, Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import './AccountCard.scss'; // Import file SCSS

const AccountCard = ({ accounts }) => {
  return (
    <Row gutter={16} justify="center" style={{ marginTop: '20px' }}>
      {accounts.map((account) => (
        <Col span={8} key={account.id}>
          <Card
            title={`Tài khoản: ${account.accountNumber}`}
            className="account-card"
          >
            <p className="card-info">
              <strong>Số dư: </strong>{account.balance.toLocaleString()} {account.currency}
            </p>
            <p className="card-info">
              <strong>Loại tài khoản: </strong>{account.accountType}
            </p>

            {/* Nút chuyển hướng đến Lịch sử giao dịch */}
            <Link to={`/transaction-history/${account.accountNumber}`}>
              <Button type="link" className="ant-btn-link" block>
                Lịch sử giao dịch
              </Button>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AccountCard;
