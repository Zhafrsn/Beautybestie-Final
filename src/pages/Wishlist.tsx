/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MainLayout } from 'layout';
import { WishlistCard } from 'components/Wishlist/WishlistCard';
// import { EmptyStateWishlist } from '../components/Wishlist/EmptyStateWishlist';

import '../styles/Wishlist.css';
import { DropdownSortBy } from 'components/DropDown/DropDownSortby';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { TWishlist } from '../types/wishlist.type';
import { EmptyStateWishlist } from 'components/Wishlist/EmptyStateWishlist';
import { useWishlistItems } from '../firebase/wishlist';

interface Option {
  label: string;
  value: string;
}

const sortby: Option[] = [
  {label: 'Date (Latest)', value: 'date-latest'}, 
  {label: 'Date (Oldest)', value: 'date-oldest'}
];

const Wishlist: React.FC = () => {
  const [cardData, setCardData] = useState<TWishlist[]>([]);
  const [userId, setUserId] = useState<string>(''); 
  const [wishlistItems, setWishlistItems] = useState<TWishlist[]>([]);
  
  const wishlistData = useWishlistItems(userId);
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setWishlistItems(wishlistData)
      } else {
        setUserId('');
        setWishlistItems([]);
      }
    });
    
    return () => unsubscribe();
  }, [wishlistData, userId]);

  const handleSortChange = (selectedValue: string) => {
    const sortedItems = selectedValue === 'date-latest'
      ? [...wishlistItems].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      : [...wishlistItems].sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());

    setCardData(sortedItems);
  };

  return (
    <MainLayout>
      <div className='wishlist-wrapper'>
        <section className="wishlist__kontainer">
          <h1 className="wishlist__title">Wishlist</h1>
          <hr/>
        </section>
        <div className='wishlist__all'>
          <div className='wishlist__kontainer2'>
            <p className='wishlist__total'>Total : {wishlistItems.length} Wishlist</p>
          </div>
          <div className='wishlist__sortby'>
            <p className='wishlist__sortby-text'>Sort By : </p>
            <DropdownSortBy
              options={sortby}
              onSelect={handleSortChange}
            /> 
          </div>
          <div>
          {wishlistItems.length === 0 ? (
              <EmptyStateWishlist />
            ) : (
              wishlistItems.map(item => (
                <WishlistCard
                  key={item.productId}
                  productId={item.productId}
                  productName={item.productName}
                  productPrice={item.productPrice}
                  productImage={item.productImage}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                  onRemoveFromWishlist={() => ({})}
                  userId={userId}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Wishlist;
