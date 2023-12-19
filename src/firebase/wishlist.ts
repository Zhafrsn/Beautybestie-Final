import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { TWishlist } from 'types/wishlist.type';
import { TProduct } from 'types/product.type';

export const useWishlistItems = (userId: string) => {
  const [wishlistItems, setWishlistItems] = useState<TWishlist[]>([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const q = query(collection(db, 'wishlist'), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const items = querySnapshot.docs.map((doc) => doc.data() as TWishlist);
        setWishlistItems(items);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };
    if (userId) {
      console.log('Fetching wishlist items for userId:', userId);
      fetchWishlistItems();
    }

  }, [userId]);

  console.log('Wishlist items:', wishlistItems);
  return wishlistItems;
};

export const addToWishlist = async (userId: string, product: TProduct) => {
  try {
    const wishlistCollection = collection(db, 'wishlist');

    await addDoc(wishlistCollection, {
      userId: userId,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log('Product added to wishlist:', product);

  } catch (error) {
    console.error('Error adding to wishlist:', error);
  }
};
