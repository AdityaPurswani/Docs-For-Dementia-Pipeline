// src/components/layout/Layout.jsx
import React from 'react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="flex mt-15">
        <Sidebar />
        {/* Main content area with proper offset for navbar and sidebar */}
        <main className="flex-1 ml-80 pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
