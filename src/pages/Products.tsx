/* eslint-disable @typescript-eslint/no-unused-vars */
import { MainLayout } from 'layout';
import '../styles/Products.css';
import Productcard  from '../components/productcard/Productcard';
import { Dropdown } from '../components/DropDown/DropDown';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../firebase/getAllProducts';
import { TProduct } from 'types/product.type';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsByCategory } from '../firebase/getProductsByCategory';
import { DropdownSortBy } from 'components/DropDown/DropDownSortby';
import '../styles/loading.css'
import { addToCart, useCartItems } from '../firebase/cart';
import { addToWishlist } from '../firebase/wishlist';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const Products: React.FC = () => {
  const [cardData, setCardData] = useState<TProduct[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { category } = useParams();

  console.log('Current Category:', category); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = category ? await getProductsByCategory(category) : await getAllProducts();
        setCardData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchData();
  }, [category]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null); 
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCategoryChange = (selectedValue: string) => {
    if (selectedValue === 'all') {
      navigate('/products');
    } else {
      navigate(`/products/${selectedValue}`);
    }
  };

  if (loading) {
    return (
      <div className='loading-spinner-container'>
        <div className='loading-spinner'></div>
      </div>
    ); 
  }  

  if (error) {
    return <div className='error-message'>{error}</div>; 
  }

  const handleSortChange = (selectedValue: string) => {
    if (selectedValue === 'lowest-price') {
      setCardData([...cardData].sort((a, b) => a.price - b.price));
    } else if (selectedValue === 'highest-price') {
      setCardData([...cardData].sort((a, b) => b.price - a.price));
    }
  };

  const handleAddToWishlist = (product: TProduct) => {
    try {
      if (userId) {
        addToWishlist(userId, product);
        setWishlist((prevWishlist) => [...prevWishlist, product.id]);
        console.log(`Product with ID ${product.id} added to wishlist`);
      } else {
        console.log('User is not authenticated.');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleAddToCart = (product: TProduct) => {
    try {
      if (userId) {
        addToCart(userId, product);
        setCart((prevCart) => [...prevCart, product.id]);
        console.log(`Product with ID ${product.id} added to Cart`);
      } else {
        console.log('User is not authenticated.');
      }
    } catch (error) {
      console.error('Error adding to Cart:', error);
    }
  };

  interface Option {
    label: string;
    value: string;
  }

  const Option1: Option[] = [
    { label: 'Face Wash', value: 'face-wash' },
    { label: 'Toner', value: 'toner' },
    { label: 'Serum', value: 'serum' },
    { label: 'Mask', value: 'mask' },
    { label: 'Moisturizer', value: 'moisturizer' },
    { label: 'Sunscreen', value: 'sunscreen' },
    { label: 'Lip Care', value: 'lip-care' }
  ];
  const Option2: Option[] = [
    {label: 'Lowest Price', value: 'lowest-price'},
    {label: 'Highest Price', value: 'highest-price'}
  ];

  return (
    <MainLayout>
      <div className='productsPage-container'>
        <div className="Products-Judul">
          <h1>{category ? `${category}` : 'Our Products'}</h1>
        </div>
        <div className='Products-Dropdown'>
          <div className='products-dd-category'>
            <p className='products-option-title'>Category :</p>
            <Dropdown options={Option1} onSelect={handleCategoryChange} />
          </div>
          <div className='products-dd-sortby'>
            <p className='products-option-title'>Sort By :</p>
            <DropdownSortBy options={Option2} onSelect={handleSortChange} />
          </div>
        </div>
        <div className="Products-Card-Container">
          {cardData.map((card, id) => (
            <Productcard
              key={id}
              {...card}
              addToCart={() => handleAddToCart(card)}
              addToWishlist={() => handleAddToWishlist(card)}
            />
          ))}
        </div>  
      </div>
    </MainLayout>
  );
};
