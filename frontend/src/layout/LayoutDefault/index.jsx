import Footer from './Footer';
import Header from './Header';
import './LayoutDefault.scss'
import Main from './Main';
import { useLocation } from 'react-router-dom';
import { useMorning } from '../../contexts/MorningContext';



function LayoutDefault() {

  const isMorning = useMorning();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <div className={`layout-default ${isHomePage ? (isMorning ? 'morning' : 'night') : 'other-pages'}`}>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}

export default LayoutDefault;