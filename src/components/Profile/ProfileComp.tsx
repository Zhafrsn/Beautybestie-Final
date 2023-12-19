/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import '../../styles/Profile.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faLocationDot, faBasketShopping, faClockRotateLeft, faCommentDots, faBell } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export const profileItems = [
    { label: 'Profile', href: '/profile', icon: <FontAwesomeIcon icon={faUserCircle} className="profileComp__icon"/> },
    { label: 'Address', href: '/address', icon: <FontAwesomeIcon icon={faLocationDot} className="profileComp__icon2"/> },
    { label: 'Order', href: '/order', icon: <FontAwesomeIcon icon={faBasketShopping} className="profileComp__icon"/> },
    { label: 'History', href: '/history', icon: <FontAwesomeIcon icon={faClockRotateLeft} className="profileComp__icon"/> },
    { label: 'Chat', href: '/chat', icon: <FontAwesomeIcon icon={faCommentDots} className="profileComp__icon"/> },
    { label: 'Notification', href: '/notification', icon: <FontAwesomeIcon icon={faBell} className="profileComp__icon"/> },
  ];

const ProfileComp: React.FC = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!user);
  
  const handleClick = (event: React.MouseEvent, page: string, href: string) => {
    if (!isLoggedIn) {
      event.preventDefault();
      alert(`Please log in to view your ${page}.`);
      navigate('/login');
    } else {
      navigate(href);
    }
  };
  
  return (
    <div className="profileComp__container">
    <div className="profileComp__container2">
     {profileItems.map((item) => (
       <div key={item.label} className={`profileComp__container3 ${location.pathname.startsWith(item.href) ? 'active' : ''}`}>
         {item.icon}
         <a href={item.href} className="profileComp__font" onClick={(e) => handleClick(e, item.label, item.href)}>{item.label}</a>
       </div>
     ))}
    </div>
   </div>   
  );

};

export default ProfileComp;
