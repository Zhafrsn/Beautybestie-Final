/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Productcard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { TProduct } from 'types/product.type';
import { TWishlist } from 'types/wishlist.type';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface ProductCardProps extends TProduct {
  addToCart: (userId: string, product: TWishlist) => void;
  addToWishlist: (userId: string, product: TWishlist) => void;
}

const Productcard: React.FC<ProductCardProps> = ({
  id,
  name,
  category,
  price,
  image,
  addToCart,
  addToWishlist
}) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(''); 
      }
    });

    return () => unsubscribe();
  }, []);

  const onAddToWishlist = () => {
    const productDetails = {
      productId: id, 
      productName: name, 
      productPrice: price, 
      productImage: image,
      createdAt: Date(),
      updatedAt: Date(),
    };
    addToWishlist(userId, productDetails);
    setIsInWishlist(true);
  };
  
  const onAddToCart = () => {
    const productDetails = {
      productId: id, 
      productName: name, 
      productPrice: price, 
      productImage: image,
      quantity: 1,
      createdAt: Date(),
      updatedAt: Date(),
    };
    addToCart(userId, productDetails);
  };

  return (
    <div className='Products-Card'>
      <FontAwesomeIcon
        icon={faHeart}
        className={`productCard-heart ${isInWishlist ? 'in-wishlist' : ''}`}
        onClick={onAddToWishlist}
      />
      <img src={image ?? ""} alt={name} className='ProductsCard-img' />
      <Link to={`/product-detail/${id}`} className='productsCard-detail'>
        <h2 className='productCard-title'>{name}</h2>
        <p className='productCard-category'>{category}</p>
        <p className='productCard-price'>{`IDR ${price}`}</p>
      </Link>
      <button className='ProductsCard-btn' onClick={onAddToCart}>
        <FontAwesomeIcon icon={faCartShopping} />
        Add to Cart
      </button>
    </div>
  );
};

export default Productcard;
