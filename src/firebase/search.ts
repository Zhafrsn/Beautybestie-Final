import { TProduct } from '../types/product.type';

export const searchProducts = (products: TProduct[], searchTerm: string): TProduct[] => {
  const normalizedSearchTerm = searchTerm.toLowerCase();

  return products.filter((product) =>
    product.name.toLowerCase().includes(normalizedSearchTerm)
  );
};
