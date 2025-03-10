import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard/ProductCard";
import "./Section.css";

gsap.registerPlugin(ScrollTrigger);

const Section = ({ title, productItems, maxItems = 6 }) => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(productItems.slice(0, maxItems));

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <Container>
        <div className="heading">
          <h1>{title}</h1>
          <div className="underline"></div>
        </div>
        <Row className="justify-content-center">
          {visibleItems.map((productItem) => (
            <ProductCard key={productItem.id} productItem={productItem} />
          ))}
        </Row>
        {productItems.length > maxItems && (
          <div className="see-more-container">
            <Button className="see-more-btn" onClick={() => navigate("/shop")}>
              See More
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Section;
