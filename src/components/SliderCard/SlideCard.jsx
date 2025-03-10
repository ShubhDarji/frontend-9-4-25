import React from "react";
import "./slidercard.css";

const SlideCard = ({ title, desc, cover }) => {
  return (
    <div className="slide-card">
      <div className="slide-content">
        <div className="text">
          <h2>{title}</h2>
          <p>{desc}</p>
          <button className="shop-now">Shop Now</button>
        </div>
        <div className="image-section">
          <img src={cover} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default SlideCard;