import React from 'react';
import '../../styles/Category.css';
import { useNavigate } from 'react-router-dom';

interface CardProps {
 image: string;
 title: string;
}

export const Category: React.FC<CardProps> = ({ image, title }) => {
  const navigate = useNavigate();

  const navigateToCategory = (categoryLabel: string) => {
    navigate(`/products/${categoryLabel}`);
  };

  return (
    <div className="cardCategory" onClick={() => navigateToCategory(title)}>
      <img className="imageCategory" src={image} alt={title} />
      <h3 className='titleCategory'>{title}</h3>
    </div>
  );
};


