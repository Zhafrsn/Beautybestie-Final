import React, { useState } from 'react';
import '../../styles/ProductComp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { TProduct } from 'types/product.type';

export const ProductComp: React.FC<TProduct> = ({name, category, price}) => {
  const [itemCount, setItemCount] = useState(1);
  const handleIncrement = () => {
    setItemCount(itemCount + 1);
  };
  
  const handleDecrement = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };
  
  return (
    <div className='product_Comp'>
      <div className='product_Comp1'>
        <h1>{name}</h1>
        <p>{category}</p>
        <div className='star'>
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} />
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} />
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} />
          <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} />
          <FontAwesomeIcon icon={faStar} style={{color: "#ffd43b",}} />
        </div>
      </div>
      <h2>{`IDR ${price}`}</h2>
      <div className='product_Comp_btn'>
        <div className='product_comp_btnitem'>
          <button onClick={handleDecrement}>-</button>
          <span>{itemCount}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <button className='cart_btn'>Add to cart</button>
      </div>
      <div className='btn_wishlist'>
        <FontAwesomeIcon icon={faHeart} style={{color: "#cfcfcf",}} className='faHeart' />
        <button>Add to Wishlist</button>
      </div>
    </div>
  );
};
 
export default ProductComp;