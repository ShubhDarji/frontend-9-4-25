import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Link } from "react-router-dom";
import { products } from "../../utils/products";
import "./style.css";

gsap.registerPlugin(ScrollTrigger, Draggable);

const Wrapper = () => {
  const brands = [
    ...new Set(
      products
        .map((product) => product.companyName.trim())
        .filter((brand) => brand)
    ),
  ];

  const brandRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      brandRefs.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    Draggable.create(containerRef.current, {
      type: "x",
      inertia: true,
      bounds: containerRef.current,
      edgeResistance: 0.9,
      cursor: "grab",
    });
  }, []);

  return (
    <section className="wrapper">
      <div className="wrapper-container">
        <h2 className="title">Shop by Brands</h2>
        <div className="brand-slider" ref={containerRef} role="list">
          {brands.map((brand, index) => (
            <div
              className="brand-item"
              key={index}
              ref={(el) => (brandRefs.current[index] = el)}
              role="listitem"
            >
              <Link to={`/brand/${brand.toLowerCase()}`} className="brand-link">
                <img
                  src={`/brands/${brand.toLowerCase()}.png`}
                  alt={`${brand} Logo`}
                  className="brand-icon"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/brands/default-brand.png")}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wrapper;
