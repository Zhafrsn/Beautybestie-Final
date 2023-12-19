import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/Wishlist.css';
import { TWishlist } from '../../types/wishlist.type';
// import { addToCart } from '../../firebase/cart';

interface WishlistCardProps extends TWishlist {
  onRemoveFromWishlist: () => void;
  userId: string;
}

export const WishlistCard: React.FC<WishlistCardProps> = (
  {
  // userId,
  productId,
  productName,
  productPrice,
  productImage,
  onRemoveFromWishlist,
  }) => {
  
  const handleRemoveFromWishlist = () => {
    if (productId.length - 1 === 0) {
      onRemoveFromWishlist();
    } else {
      onRemoveFromWishlist();
    }
  };
  
  // const handleAddToCart = () => {
  //   try {
  //     if (userId) {
  //       addToCart(userId, {
  //         productId,
  //         productName,
  //         productPrice,
  //         productImage,
  //         userId,
  //       });
  //       console.log(`Product with ID ${productId} added to Cart`);
  //       handleRemoveFromWishlist(); 
  //     } else {
  //       console.log('User is not authenticated.');
  //     }
  //   } catch (error) {
  //     console.error('Error adding to Cart:', error);
  //   }
  // };
  
  return (
    <div className='wishlist__products-item'>
      <div className='wishlist__product-container'>
        <div className='wishlist__product-container2'>
          <img src={productImage} alt={productName} className='wishlist__product-img'/>
          <div className='wishlist__detail-product'>
            <p className='wishlist__product-name'>{productName}</p>
            <p className='wishlist__idr'>{`IDR ${productPrice}`}</p>
          </div>
        </div>
        <div className='wishlist__action'>
          <button className='wishlist__addtocart'>
            <FontAwesomeIcon icon={faPlus} className='wishlist__plus-icon'/>
              Add to Cart
          </button>
          <button className='wishlist__buy'>Buy</button>
          <FontAwesomeIcon icon={faTrashAlt}
            className='wishlist__trash-icon'
            onClick={handleRemoveFromWishlist}
          />
        </div>
      </div>
      <hr/>
    </div>
  );
};
