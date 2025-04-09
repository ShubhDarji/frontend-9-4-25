import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import "./heroslider.css";

import heroImage1 from "../../Images/assets/tv-banner01.jpg";
import heroImage2 from "../../Images/assets/fridge-banner01.jpg";
import heroImage3 from "../../Images/assets/washing-maching-banner01.jpg";

const slides = [
  {
    image: heroImage1,
    title: "Experience 4K Like Never Before",
    subtitle: "Upgrade to the latest Smart TVs with stunning visuals.",
  },
  {
    image: heroImage2,
    title: "Keep It Cool, Keep It Fresh",
    subtitle: "Energy-efficient refrigerators for your home.",
  },
  {
    image: heroImage3,
    title: "Powerful Cleaning, Effortless Washing",
    subtitle: "Smart washing machines with advanced technology.",
  },
];

const Herosection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-split-container">
      <div className="hero-left">
        <motion.h1
          className="hero-main-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Typewriter
            options={{
              strings: [slides[currentIndex].title],
              autoStart: true,
              loop: false,
              delay: 40,
              deleteSpeed: 0,
              cursor: "_",
            }}
          />
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {slides[currentIndex].subtitle}
        </motion.p>

        <motion.button
          className="hero-btn"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Shop Now
        </motion.button>
      </div>

      <div className="hero-right">
        <div className="hero-img-container">
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].image}
            alt="Product"
            className="hero-img"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Herosection;