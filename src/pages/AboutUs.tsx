import React from 'react';
import { MainLayout } from "layout";
import AboutUsComp from "../components/AboutUs/AboutUsComp"

const AboutUs: React.FC = () => {
  return (
    <MainLayout>
      <div>
       <AboutUsComp/>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
