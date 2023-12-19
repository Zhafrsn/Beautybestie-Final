import React from 'react';
import '../../styles/Brand.css';

interface CardProps {
 logo: string;
}

const Brand: React.FC<CardProps> = ({ logo }) => {
 return (
    <div className="cardBrand">
      <img className="logoBrand" src={logo} alt="logo" />
    </div>
 );
};

export default Brand;