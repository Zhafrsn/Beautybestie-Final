import React from 'react';
import '../../styles/Productcard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { TProduct } from 'types/product.type';
import { Link } from 'react-router-dom';

export const BestSeller: React.FC<TProduct> = ({ id, name, category, price, image}) => {
  return (
    <div className='Products-Card'>
      <FontAwesomeIcon icon={faHeart} className='productCard-heart' />
      <Link to={`/product-detail/${id}`} className='productsCard-detail'>
        <img src={image ?? ""} alt={name} className='ProductsCard-img' />
        <h2 className='productCard-title'>{name}</h2>
        <p className='productCard-category'>{category}</p>
        <p className='productCard-price'>{`IDR ${price}`}</p>
      </Link>
      <button className='ProductsCard-btn'>
        <FontAwesomeIcon icon={faCartShopping} />
        Add to Cart
      </button>
    </div>
  );
};
