import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion } from 'framer-motion';

import Typewriter from "typewriter-effect";

const Model = ({ url }) => {
  const model = useLoader(GLTFLoader, url);
  const modelRef = useRef();

  // Mouse follow effect using useFrame
  useFrame(({ mouse }) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = mouse.x * 0.5;
      modelRef.current.rotation.x = mouse.y * 0.2;
    }
  });

  return <primitive ref={modelRef} object={model.scene} scale={1.2} />;
};

const slides = [
  { title: "Experience 4K Like Never Before", subtitle: "Upgrade to the latest Smart TVs with stunning visuals." },
  { title: "Keep It Cool, Keep It Fresh", subtitle: "Energy-efficient refrigerators for your home." },
  { title: "Powerful Cleaning, Effortless Washing", subtitle: "Smart washing machines with advanced technology." },
];

const HeroSection3D = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* ✅ 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <Suspense fallback={<Html><p>Loading Model...</p></Html>}>
          {/* Lighting and Environment */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} castShadow />
          <Environment preset="sunset" />
          <Model url="/models/tv.glb" />
        </Suspense>
      </Canvas>

      {/* ✅ Overlay Text Section */}
      <div className="hero-overlay" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#fff", textAlign: "center" }}>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typewriter
            options={{
              strings: [slides[currentIndex].title],
              autoStart: true,
              loop: false,
              delay: 50,
              deleteSpeed: 0,
              cursor: "|",
            }}
          />
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {slides[currentIndex].subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection3D;
