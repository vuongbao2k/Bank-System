import React from 'react'
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import './LayoutAdmin.scss'


function LayoutAdmin() {
  return (
    <>
      <div className="layout-admin">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}

export default LayoutAdmin