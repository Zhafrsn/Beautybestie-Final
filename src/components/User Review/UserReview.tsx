import React from 'react';
import '../../styles/UserReview.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CardProps {
  rating: string;
  name: string;
  ukuran: string;
  review: string;
  Image: string;
}

export const UserReview: React.FC<CardProps> = ({ rating, name, ukuran, review, Image }) => {
 return (
   <div className="user_review">
     <div className='top_user_review'>
       <div className='left_top'>
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b", }} />
        <FontAwesomeIcon icon={faStar} style={{color: "#ffd43b",}} />
         <p>{rating}</p>
       </div>
       <h3>{name}</h3>
      </div>
      <div>
        <p className='ukuran'>{ukuran}</p>
          <div className="review_img">
          <p className='review'>{review}</p>
          <img src={Image} alt='img' />
          </div>
      </div>
    </div>
 );
};

export default UserReview;