import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./config";
import { TProduct } from "types/product.type";

export const getAllProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'products'));
      const data: TProduct[] = [];
  
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        data.push({
            id: doc.id,
            name: productData.name,
            category: productData.category,
            price: productData.price,
            image: productData.image,
            brand: productData.brand,
            stock: productData.stock,
            description: productData.description,
            bestSeller: productData.bestSeller
        });
      });
      console.log('Fetched data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      throw error;
    }
  };