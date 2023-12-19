import React from "react";
import "../../styles/NotFound.css";


const NotFound: React.FC = () => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="NotFound_Wrapper">
      <header className="NotFound_Title">
        <h1>404</h1>
        <p>Sorry, Page Not Found.</p>
      </header>

      <section className="NotFound_Button">
          <button onClick={goBack}>Back to Previous Page</button>
        <a href="/">
          <button>Go to Home</button>
        </a>
      </section>
    </div>
  );
};
export default NotFound;