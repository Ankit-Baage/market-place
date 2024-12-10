import React, { useEffect } from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./carousel.css";
import {
  handleNavigateFromAdvertisement,
} from "../../utils/helpers/getParamsFromAdd";

const sliderVariants = {
  incoming: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

export const Carousel = ({ images }) => {
  const navigate = useNavigate();
  const [imageIndex, cycleImage] = useCycle(...images.map((_, i) => i));

  const activeImage = images[imageIndex];

  useEffect(() => {
    const intervalId = setInterval(() => {
      cycleImage(); // Automatically cycle images every 3 seconds
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [cycleImage]);

  return (
    <div className="box">
      <div className="slider">
        <AnimatePresence initial={false} custom={1}>
          <motion.img
            key={imageIndex}
            src={activeImage.url} 
            custom={1}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            onClick={() => handleNavigateFromAdvertisement(activeImage, navigate)}
            className="slide"
          />
        </AnimatePresence>
      </div>
      <div className="indicators">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => cycleImage(index)} // Manually cycle to specific image
            className={`indicator ${index === imageIndex ? "isActive" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
