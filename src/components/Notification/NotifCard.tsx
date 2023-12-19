import React from 'react';
import "../../styles/NotifCard.css";

interface NotifProps {
  imageUrl: string;
  text1: string;
  text2: string;
  time: string;
}
export const Notificationcard: React.FC<NotifProps> = ({ imageUrl, text1, text2 }) => {
  return (
    <div className='Notif-Card'>
      <img src={imageUrl} />
      <div>
        <p className='NotifCard-text1'>{text1}</p>
        <p className='NotifCard-text2'>{text2}</p>
      </div>
    </div>
  );
};