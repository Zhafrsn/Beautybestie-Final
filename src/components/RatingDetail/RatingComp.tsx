import React from "react";
import "../../styles/RatingComp.css";
import { faStar, faThumbsUp, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RatingComp: React.FC = () => {
  return (
    <div className="rating_comp">
      <div className="left_card">
          <div className="top_rating_comp">
            <div className="left_rating">
              <h2>USER RATING</h2>
              <h1>4.0</h1>
              <div className="star">
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd43b" }} />
              </div>
            </div>
            <div className="right_rating">
              <h2>RATING DETAIL</h2>
              <div className="right_rating_bottom">
                <div className="right_rating_bottom1">
                  <p>5/5</p>
                  <h3>Efectiveness</h3>
                  <p>4/5</p>
                  <h3>Packaging</h3>
                </div>
                <div className="right_rating_bottom2">
                  <p>3/5</p>
                  <h3>Texture</h3>
                  <p>5/5</p>
                  <h3>Value For Money</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom_rating_comp">
            <div className="left_bottom">
              <FontAwesomeIcon icon={faThumbsUp} style={{color: "#ffffff",}} />
              <p>94% users recommend</p>
            </div>
            <div className="right_bottom">
              <FontAwesomeIcon icon={faWallet} style={{color: "#ffffff",}} />
              <p>93% users repurchase</p>
            </div>
          </div>
        </div>
        <div className="right_Card">
          <h4>Have you tried this product?</h4>
          <p>Satisfied with this product?</p>
          <h4>Share your review</h4>
          <button>Add Review</button>
        </div>
      </div>
  );
};
export default RatingComp;