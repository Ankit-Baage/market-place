import React, { useState } from "react";
import classes from "./productCarousel.module.css";
import { AnimatePresence, wrap, motion } from "framer-motion";

// const imageData = [
//   "https://mgstorageaccount.blob.core.windows.net/mgbucket/sparesappleappleiphone15lcdblack1.png",
//   "https://mgstorageaccount.blob.core.windows.net/mgbucket/sparesappleappleiphone15lcdblack2.png",
//   "https://mgstorageaccount.blob.core.windows.net/mgbucket/sparesappleappleiphone15lcdblack3.png",
//   "https://mgstorageaccount.blob.core.windows.net/mgbucket/sparesappleappleiphone15lcdblack4.png",
//   "https://mgstorageaccount.blob.core.windows.net/mgbucket/sparesappleappleiphone15lcdblack5.png",
// ];

export const ProductCarousel = ({ imageData }) => {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const activeImageIndex = wrap(0, imageData.length, imageCount);
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

  const swipeToImage = (swipeDirection) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
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

  return (
    <div className={classes.box}>
      <div className={classes.slider}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={imageCount}
            style={{
              backgroundImage: `url(${imageData[activeImageIndex]})`,
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
            className={classes.slide}
          />
        </AnimatePresence>
      </div>
      <div className="indicators">
        {imageData.map((image, index) => (
          <div
            key={index}
            onClick={() => skipToImage(index)}
            className={`indicator ${
              index === activeImageIndex ? "active" : null
            }`}
          />
        ))}
      </div>
    </div>
  );
};
