import React, { useState } from "react";
import { motion, AnimatePresence, wrap } from "framer-motion";
import "./carousel.css";
import carousel_image from "../../assets/carouselImage_1.svg";

// const images = [
//   { id: 0, image: "https://mgstorageaccount.blob.core.windows.net/mgbucket/vrp_add190424_1.png" },
//   { id: 1, image: "https://mgstorageaccount.blob.core.windows.net/mgbucket/vrp_add190424_2.png" },
//   { id: 2, image: carousel_image },
// ];

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

export const Carousel = ({images}) => {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const activeImageIndex = wrap(0, images.length, imageCount);

  const swipeToImage = (swipeDirection) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
    console.log(images[activeImageIndex].url);
    
  };
  const dragEndHandler = (dragInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  const skipToImage = (imageId) => {
    let changeDirection;
    if (imageId > activeImageIndex) {
      changeDirection = 1;
    } else if (imageId < activeImageIndex) {
      changeDirection = -1;
    }
    setImageCount([imageId, changeDirection]);
  };
  console.log(images)

  return (
    <div className="box">
      <div className="slider">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={imageCount}
            style={{
              backgroundImage: `url(${images[activeImageIndex].url})`,
            }}
            custom={direction}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
            className="slide"
          />
        </AnimatePresence>
      </div>
      <div className="indicators">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => skipToImage(index)}
            className={`indicator ${
              index === activeImageIndex ? "isActive" : null
            }`}
          />
        ))}
      </div>
    </div>
  );
};
