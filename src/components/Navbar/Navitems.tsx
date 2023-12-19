/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faHeart, faHome, faInfoCircle, faRightFromBracket, faSearch, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/config"
import '../../styles/Navbar.css';

interface NavitemsProps {
  onSearchChange: (searchTerm: string) => void;
}

export const navItems = [
  { label: 'Home', href: '/', icon: <FontAwesomeIcon icon={faHome} /> },
  { label: 'Products', href: '/products', icon: <FontAwesomeIcon icon={faCube} /> },
  { label: 'About Us', href: '/aboutUs', icon: <FontAwesomeIcon icon={faInfoCircle} /> },
];

export const Navitems: React.FC<NavitemsProps> = ({ onSearchChange }) => {
  const [user] = useAuthState(auth);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event: React.MouseEvent, page: string) => {
    if (!isLoggedIn) {
      event.preventDefault();
      alert(`Please log in to view your ${page}.`);
      navigate('/login');
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Logout successful');
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed', error);
      });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearchChange(searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="navbar__web-title">
        <img src={'images/logo.png'} className="navbar__logo-image" alt="logo" />
        <span className="navbar__title">BeautyBestie</span>
      </div>
      <div className="nav-item">
        {navItems.map(item => (
          <a key={item.label}
            href={item.href}
            className={`navbar__navitem ${location.pathname === item.href ? 'active' : ''}`}
            aria-label={item.label}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="navbar__item">
        <div className="navbar__search-container">
          <FontAwesomeIcon icon={faSearch} className="navbar__search-icon" />
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search here"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <NavLink to="/wishlist" className="nav-link" onClick={(e) => handleClick(e, 'wishlist')}>
          <FontAwesomeIcon icon={faHeart} />
        </NavLink>
        <NavLink to="/cart" className="nav-link" onClick={(e) => handleClick(e, 'cart')}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </NavLink>
        {user ? (
          <div className="navbar__user-info">
            <button className="navbar__user-name" onClick={toggleProfile}>
              <FontAwesomeIcon icon={faUserCircle} className='navbar__profile-icon'/>
              Hi, {user.displayName?.split('')}
            </button>
            <div>
              {isProfileOpen && (
                <div className='profile-dropdown'>
                  <button className="navbar__profile-button">
                    <a href='/profile' className='my-profile-text'>My Profile</a>
                    <FontAwesomeIcon icon={faUserCircle} className='profile-icon'/>
                  </button>
                  <hr/>
                  <button onClick={handleLogout} className="navbar__profile-button">
                    Logout
                    <FontAwesomeIcon icon={faRightFromBracket} className='profile-icon'/>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="navbar__login-buttons">
            <a href="/login" className="navbar__login-button">
              <span className="navbar__login-text">Login</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navitems;

function onSearchChange(searchTerm: string) {
  throw new Error('Function not implemented.');
}
