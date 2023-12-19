import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { TProduct } from "types/product.type";

export const getProductById = async (productId: string): Promise<TProduct> => {
    try {
        console.log('Fetching product by ID:', productId);

        const productDocRef = doc(collection(db, 'products'), productId);
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
            const { id, ...productData } = productDocSnapshot.data() as TProduct;
            console.log('Product Data:', productData);

            return { id, ...productData };
        } else {
            console.error('Product not found');
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};
