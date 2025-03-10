import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="hero-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="hero-slide"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
        >
          <div className="hero-overlay">
            <motion.h1
              className="hero-title"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Typewriter
                options={{
                  strings: [slides[currentIndex].title],
                  autoStart: true,
                  loop: false,
                  delay: 50, // Typing speed
                  deleteSpeed: 0,
                  cursor: "|", // Custom cursor
                }}
              />
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {slides[currentIndex].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Herosection;
