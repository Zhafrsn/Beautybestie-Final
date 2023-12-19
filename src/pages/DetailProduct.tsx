import React, { useEffect, useState } from "react";
import { MainLayout } from "layout";
import { UserReview } from "../components/User Review/UserReview";
import "../styles/DetailProduct.css";
import { ProductComp } from "components/Product Det/ProductComp";
import { faInstagram, faFacebook, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RatingComp } from "components/RatingDetail/RatingComp";
import { getAllProducts } from "../firebase/getAllProducts";
import { TProduct } from "types/product.type";
import { BestSeller } from "components/Best Seller";
import { useParams } from "react-router-dom";

export const DetailProduct: React.FC = () => {
  const [Data, setData] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const bestSellerProducts = Data.filter((product) => product.bestSeller === true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setData(data);
        const product = data.find((product) => product.id === id);
        setSelectedProduct(product || null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const UserReviewData = [
    {
      rating: "5.0",
      name: 'napesa',
      ukuran: '30 ml',
      review: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quisquam harum corrupti dolorum nam saepe expedita fugit eius repellendus laudantium dicta reiciendis rerum fugiat nobis velit quidem veniam porro obcaecati, recusandae sapiente, illo ut iure modi nemo! Voluptates nam blanditiis quod asperiores culpa ipsum illo incidunt aliquam modi hic recusandae eligendi',
      Image: 'images/FaceWash1.png',
    },
    {
      rating: "5.0",
      name: 'lala',
      ukuran: '30 ml',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quisquam harum corrupti dolorum nam saepe expedita fugit eius repellendus laudantium dicta reiciendis rerum fugiat nobis velit quidem veniam porro obcaecati, recusandae sapiente, illo ut iure modi nemo! Voluptates nam blanditiis quod asperiores culpa ipsum illo incidunt aliquam modi hic recusandae eligendi',
      Image: 'images/FaceWash2.png',
    },
    {
      rating: "5.0",
      name: 'nunu',
      ukuran: '30 ml',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quisquam harum corrupti dolorum nam saepe expedita fugit eius repellendus laudantium dicta reiciendis rerum fugiat nobis velit quidem veniam porro obcaecati, recusandae sapiente, illo ut iure modi nemo! Voluptates nam blanditiis quod asperiores culpa ipsum illo incidunt aliquam modi hic recusandae eligendi',
      Image: 'images/FaceWash3.png',
    },
    {
      rating: "5.0",
      name: 'nana',
      ukuran: '30 ml',
      review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quisquam harum corrupti dolorum nam saepe expedita fugit eius repellendus laudantium dicta reiciendis rerum fugiat nobis velit quidem veniam porro obcaecati, recusandae sapiente, illo ut iure modi nemo! Voluptates nam blanditiis quod asperiores culpa ipsum illo incidunt aliquam modi hic recusandae eligendi',
      Image: 'images/FaceWash4.png',
    }
  ];

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

  if (!selectedProduct) {
    return <div className='error-message'>Product not found</div>;
  }

  const { image, description } = selectedProduct;

  return (
    <MainLayout>
      <div className="Pro_Comp">
        <div className="card_left">
          <div className="big_card">
            <img src={image} alt="image1" className="big_card-img"/>
          </div>
          <div className="small_card">
            <img className="small_card1" src={image} alt="image2" />
            <img className="small_card1" src={image} alt="image3" />
            <img className= "small_card1" src={image} alt="image4" />
          </div>
        </div>
        <div className="card_right">
          <ProductComp {...selectedProduct} />
        </div>
      </div>
      <div className='desc_product'>
        <h2>Description:</h2>
        <p>{description}</p>
        <div className='logo_desc'>
          <FontAwesomeIcon icon={faFacebook} style={{ color: "#005eff", }} />
          <FontAwesomeIcon icon={faXTwitter} style={{color: "#000000",}} />
          <FontAwesomeIcon icon={faInstagram} style={{color: "#f52947",}} />
          <FontAwesomeIcon icon={faShare} style={{ color: "#1eff00", }} />
        </div>
      </div>
      <div className='rating_detail'>
        <RatingComp />
      </div>
      <div className="Judul_UserReview">
        <h1>User Review</h1>
      </div>
      <div className="UserReview">
        <div className="UserReview_Card">
          {UserReviewData.map((card, index) => (
            <UserReview key={index} {...card} />
          ))}
        </div>
      </div>
      <div className="Pro_Rec">
        <h1>Product Recommendation</h1>
        <div className="Pro_Rec_Card">
          {bestSellerProducts.map((product, index) => (
            <BestSeller key={index} {...product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};