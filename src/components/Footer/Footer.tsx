import React from 'react';
import '../../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__items">
        <div className="footer__web-title">
          <img src={'images/logo.png'} className="footer__logo-image" alt="logo" />
          <p>BeautyBestie</p>
        </div>
        <div className="footer__more-info">
          <h3>More Info</h3>
          <p>Shipping Policy</p>
          <p>Return Policy</p>
          <p>Terms & Conditions</p>
          <p>FAQ</p>
        </div>
        <div className="footer__contact-us">
          <h3>Contact Us</h3>
          <p>cs@beautybestie.com</p>
          <p>Beauty Store</p>
        </div>
        <div className="footer__follow-us">
          <h3>Follow Us</h3>
          <div className="footer__follow-us-icons">
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faWhatsapp} />
          </div>
          <p>Learn more about beautybestie</p>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer__copyright-text">
        <p>Copyright &copy; 2023 BeautyBestie</p>
      </div>
    </footer>
  );
};
