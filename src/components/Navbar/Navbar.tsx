/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import '../../styles/Navbar.css';
import { Navitems } from './Navitems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Sidebar } from 'components/Sidebar';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const Navbar: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      {windowWidth <= 1024 ? (
        <div className="navbar__mobile">
          <div className="navbar__web-title">
            <img src={'images/logo.png'} className="navbar__logo-image" alt="logo" />
            <span className="navbar__title">eautyBestie</span>
          </div>
          <button className="navbar__menu-button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      ) : (
        <>
          <Navitems onSearchChange={() => {}}/>
        </>
      )}
    </header>
  );
};
