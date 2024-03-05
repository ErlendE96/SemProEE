// Layout.js
import React from 'react';
import Header from './Header/HeaderElement';
import Footer from './Footer/FooterElement';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
