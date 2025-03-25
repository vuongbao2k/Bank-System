import Footer from './Footer';
import Header from './Header';
import './LayoutDefault.scss'
import Main from './Main';

function LayoutDefault() {

  return (
    <>
      <div className="layout-default">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}

export default LayoutDefault;