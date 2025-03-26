import React from 'react';
import { Button, Row, Col } from 'antd';
import { PayCircleOutlined, PhoneOutlined, CoffeeOutlined, AppstoreAddOutlined } from '@ant-design/icons'; // Import các icon từ Ant Design

const FunctionIcons = () => {
  return (
    <Row gutter={[16, 16]} justify="center" style={{ marginTop: '30px' }}>
      <Col span={6}>
        <Button 
          icon={<PayCircleOutlined style={{ fontSize: '24px', display: 'block', margin: '0 auto' }} />} 
          block
          style={{ textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}
        >
          Thanh toán hóa đơn
        </Button>
      </Col>
      <Col span={6}>
        <Button 
          icon={<PhoneOutlined style={{ fontSize: '24px', display: 'block', margin: '0 auto' }} />} 
          block
          style={{ textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}
        >
          Nạp tiền điện thoại
        </Button>
      </Col>
      <Col span={6}>
        <Button 
          icon={<CoffeeOutlined style={{ fontSize: '24px', display: 'block', margin: '0 auto' }} />} 
          block
          style={{ textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}
        >
          Mua vé xem phim
        </Button>
      </Col>
      <Col span={6}>
        <Button 
          icon={<AppstoreAddOutlined style={{ fontSize: '24px', display: 'block', margin: '0 auto' }} />} 
          block
          style={{ textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}
        >
          Du lịch - Đi lại
        </Button>
      </Col>
    </Row>
  );
};

export default FunctionIcons;
