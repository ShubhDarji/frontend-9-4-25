import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts,newArrivalData,bestSaley } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import HeroSection from "../components/Herosection/Herosection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useWindowScrollToTop();
  // Remove this line:
const newArrivalData = products?.filter((item) => ["oven", "ac"].includes(item.category)) || [];
  
  const bestSale = products?.filter((item) => item.category === "tv") || [];
  useEffect(() => {
    gsap.from(".section-title", { opacity: 0, y: 20, duration: 1, scrollTrigger: ".section-title" });
    gsap.to(".product-card", { opacity: 1, duration: 0.5 });  }, []);

  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Fragment>
      <HeroSection />
      <Wrapper />

      <section className="deal-timer">
        <h2>🔥 Flash Sale Ends In: <span>{formatTime(timeLeft)}</span></h2>
      </section>

  
    

      <Section title="Big Discount" productItems={discoutProducts} maxItems={6} />
      <Section title="New Arrivals" productItems={newArrivalData} maxItems={6} />
      <Section title="Best Sale" productItems={bestSale} maxItems={6} />
    </Fragment>
  );
};

export default Home;