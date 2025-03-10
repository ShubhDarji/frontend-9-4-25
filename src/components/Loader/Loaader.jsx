import React from "react";
import "./loader.css"; // Import the loader's CSS

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="rain"></div>
      <div className="rain heavy"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loader;
