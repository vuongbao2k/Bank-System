import './Home.scss';  // Import file CSS hoặc SCSS cho trang chủ
import { UserOutlined } from '@ant-design/icons'; // Icon Ant Design
import { useMorning } from '../../contexts/MorningContext';


function Home() {
  const isMorning = useMorning();

  return (
    <div className={`home ${isMorning ? '' : 'night'}`}>
      <div className="home__content">
        <div className="home__greeting">
          <UserOutlined className="home__greeting-icon" />
          <div>
            <div className="home__greeting-text">{isMorning ? 'Chào buổi sáng!' : 'Chào buổi tối!'}</div>
            <div className="home__subtext">Quý khách đang tìm kiếm gì hôm nay?</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
