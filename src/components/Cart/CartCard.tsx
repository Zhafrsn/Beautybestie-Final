import React from 'react';
import '../../styles/Cart.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TWishlist } from 'types/wishlist.type';

interface CartCardProps extends TWishlist{
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemoveFromCart: () => void;
}

export const CartCard: React.FC<CartCardProps> = ({
  productId,
  productName,
  productPrice,
  productImage,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  // onMoveToWishlist,
}) => {
  const Subtotal = productPrice * quantity;

  const handleRemoveFromCart = () => {
    if (productId.length - 1 === 0) {
      onRemoveFromCart();
    } else {
      onRemoveFromCart();
    }
  };

  return (
      <div className='cartCard__items-container'>
        <div className='cartCard__product'>
        <img className='cartCard__product-img' src={productImage} alt={productName} />
          <div className='cartCard__product-detail'>
          <p className='cartCard__Product-header'>{productName}</p>
          <p className='cartCard__Product-price'>Price : {`IDR ${productPrice}`}</p>
          <p className='cartCard__Product-subtotal'>Subtotal: {`IDR ${Subtotal}`}</p>
          </div>
        </div>
        <hr/>
        <div className='cartCard__cart-action'>
          <p className='cartCard__mv-to-wishlist'>Move To Whishlist</p>
          <p className='cartCard__mv-to-wishlist'>|</p>
        <FontAwesomeIcon
          icon={faTrash}
          className="cartCard__trash-icon"
          onClick={handleRemoveFromCart}
        />
          <div className="cartCard__quantity">
            <button className='cartCard__quantity-btn' onClick={onDecreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button className='cartCard__quantity-btn' onClick={onIncreaseQuantity}>+</button>
          </div>
        </div>
      </div>
  );
};
