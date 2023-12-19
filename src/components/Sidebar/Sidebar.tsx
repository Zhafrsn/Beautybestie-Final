import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { navItems } from "../Navbar/Navitems";

import "../../styles/Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  contentId? : string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar__header">
        <div className="sidebar__container">
          <button className="sidebar__close-button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} className="sidebar__times-icon"/>
          </button>
        </div>
      </div>
      <hr className="sidebar-divider" />
      <div className="sidebar__content">
        <button className="sidebar__search-container">
          <FontAwesomeIcon icon={faSearch} className='sidebar__search-icon'/>
          <input
            type="text"
            className="sidebar__search-input"
            placeholder="Search here"
          />
        </button>
          <div className="sidebar__menu-item">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => window.location.href = item.href}
                className="sidebar__button"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={() => window.location.href = "/wishlist"}
              className="sidebar__button"
            >
              <FontAwesomeIcon icon={faHeart} className="sidebar__icons"/> 
              Wishlist
            </button>
            <button
              onClick={() => window.location.href = "/cart"}
              className="sidebar__button"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="sidebar__icons"/> 
              Cart
            </button>
          </div>
        <div className="sidebar-login">
          <button
            onClick={() => window.location.href = "/login"}
            className="sidebar__btn-login"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
