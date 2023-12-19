import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { TWishlist } from '../types/wishlist.type';
import { TProduct } from '../types/product.type';

export const useCartItems = (userId: string) => {
  const [cartItems, setCartItems] = useState<TWishlist[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const q = query(collection(db, 'cart'), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const items = querySnapshot.docs.map((doc) => doc.data() as TWishlist);
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    if (userId) {
      console.log('Fetching cart items for userId:', userId);
      fetchCartItems();
    }

  }, [userId]);

  console.log('Cart items:', cartItems);
  return cartItems;
};

export const addToCart = async (userId: string, product: TProduct) => {
  try {
    const cartCollection = collection(db, 'cart');

    await addDoc(cartCollection, {
      userId: userId,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image,
      quantity: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log('Product added to cart:', product);

  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};
