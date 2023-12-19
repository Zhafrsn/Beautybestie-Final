import React from 'react';
import '../../styles/AboutUs.css';

const AboutUsComp: React.FC = () => {
    return (
     <div className='about-us__contaienr'>
        <div className='aboutus__title'>
          <h1>ABOUT US</h1>
        </div>
        <div className='aboutus__content'>
          <img src='images/aboutus.png'
               alt="logo"/>
          <div className='aboutus__text'>
              <p className='aboutus__text1'>Change Your Life With <br/>Beauty</p>
              <p className='aboutus__text2'>Come To Our Website Which Provides <br/>Everything You Need</p>
          </div>
        </div>
     </div>
    );
  };
  
  export default AboutUsComp;
  