import { MainLayout } from "layout";
import '../styles/Home.css';
import Brand from '../components/Brand/Brand';
import { useNavigate } from 'react-router-dom';
import {Category} from '../components/Category/Category';
import AboutUsComp from "components/AboutUs/AboutUsComp";
import ImageSlider from "components/Ads/Ads";
import { getAllProducts } from "../firebase/getAllProducts";
import { TProduct } from "types/product.type";
import { useEffect, useState } from "react";
import { BestSeller } from "components/Best Seller";
import '../styles/loading.css'

export const Home: React.FC = () => {
  const [Data, setData] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

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

  const adImages = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.png'
  ];
  const brandImage = [
    { logo: 'images/logoSomethic.png' },
    { logo: 'images/logoWardah.png' },
    { logo: 'images/logoEmina.png' },
    { logo: 'images/logoAzarine.png' },
  ];

  const categoryImage = [
    { image: 'images/facewash.jpg', title: 'Face Wash'},
    { image: 'images/toner.jpg', title: 'Toner' },
    { image: 'images/serum.png', title: 'Serum' },
    { image: 'images/moist.jpg', title: 'Moisturizer' },
    { image: 'images/sunscreen.jpg', title: 'Sunscreen' },
    { image: 'images/masker.png', title: 'Mask' },
    { image: 'images/lipmask.jpg', title: 'Lip Mask' },

  ];

  const bestSellerProducts = Data.filter((product) => product.bestSeller === true);
  
  const navigateToProducts = () => {
    navigate('/Products'); 
  };

  return (
    <MainLayout>
      <div className="home-wrapper">
        <div className="Ads">
          <ImageSlider images={adImages} />
        </div>
        <div className="BestSeller">
          <h1>BEST SELLER</h1>
          <button onClick={navigateToProducts} className="bestSeller-btn">See All Product</button>
        </div>
        <div className="BestSellerCard">
        {bestSellerProducts.map((product, index) => (
          <BestSeller key={index} {...product} />
        ))}
        </div>
        <div className="ProductBrand">
          <h1>PRODUCT BRANDS</h1>
          <div className="Brand">
            {brandImage.map((card, index) => (  
            <Brand key={index} logo={card.logo} /> 
            ))}
          </div>
        </div>
        <div className="Category">
          <h1>CATEGORY</h1>
          <div className="CategoryImage">
            {categoryImage.map((card, index) => (  
            <Category key={index} {...card} /> 
            ))}
          </div>
        </div>
        <div className="AboutUs">
          <AboutUsComp  />  
        </div>    
      </div>
      </MainLayout>
  );
};
