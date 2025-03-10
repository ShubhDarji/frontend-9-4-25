import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import SlideCard from "./SliderCard/SlideCard";
import { SliderData } from "../utils/products";

const SliderHome = () => {
  const settings = {
    dots: true,
    arrows: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="home-slide">
      <div className="conto">
        <Slider {...settings}>
          {SliderData.map((item) => (
            <SlideCard key={item.id} title={item.title} cover={item.cover} desc={item.desc} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SliderHome;
