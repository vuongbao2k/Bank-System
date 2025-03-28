import React from 'react';
import { Button, Row, Col } from 'antd';
import { PayCircleOutlined, PhoneOutlined, CoffeeOutlined, AppstoreAddOutlined } from '@ant-design/icons'; // Import các icon từ Ant Design
import './FunctionIcons.scss'; // Import SCSS

const FunctionIcons = () => {
  return (
    <Row gutter={[16, 16]} justify="center" style={{ marginTop: '30px' }} className="function-icons">
      <Col span={6}>
        <Button
          icon={<PayCircleOutlined />}
          block
        />
        <span>Thanh toán hóa đơn</span>
      </Col>
      <Col span={6}>
        <Button
          icon={<PhoneOutlined />}
          block
        />
          Nạp tiền điện thoại
      </Col>
      <Col span={6}>
        <Button
          icon={<CoffeeOutlined />}
          block
        />
          Mua vé xem phim
      </Col>
      <Col span={6}>
        <Button
          icon={<AppstoreAddOutlined />}
          block
        />
          Du lịch - Đi lại
      </Col>
    </Row>
  );
};

export default FunctionIcons;
