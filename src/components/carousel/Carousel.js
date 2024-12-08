// import React, { useState } from "react";
// import { motion, AnimatePresence, wrap } from "framer-motion";
// import "./carousel.css";
// import { useNavigate } from "react-router-dom";
// import { getParamsFromAdd } from "../../utils/helpers/getParamsFromAdd";
// const convertFiltersToQueryParams = (filters) => {
//   const queryParams = [];

//   // Loop through each filter and generate the query string
//   for (const key in filters) {
//     if (filters[key] && filters[key] !== null) {
//       // If the filter has a value, join the array values by commas (if any)
//       const value = Array.isArray(filters[key])
//         ? filters[key].join(",")
//         : filters[key];

//       // Push the formatted query parameter
//       queryParams.push(`${key}=${encodeURIComponent(value)}`);
//     }
//   }

//   // Join all query parameters with '&' and return the result
//   return queryParams.join("&");
// };

// const sliderVariants = {
//   incoming: (direction) => ({
//     x: direction > 0 ? "100%" : "-100%",
//     scale: 1.2,
//     opacity: 0,
//   }),
//   active: { x: 0, scale: 1, opacity: 1 },
//   exit: (direction) => ({
//     x: direction > 0 ? "-100%" : "100%",
//     scale: 1,
//     opacity: 0.2,
//   }),
// };

// const sliderTransition = {
//   duration: 1,
//   ease: [0.56, 0.03, 0.12, 1.04],
// };

// export const Carousel = ({ images }) => {
//   const navigate = useNavigate();
//   const [[imageCount, direction], setImageCount] = useState([0, 0]);
//   const activeImageIndex = wrap(0, images.length, imageCount);

//   const swipeToImage = (swipeDirection) => {
//     setImageCount([imageCount + swipeDirection, swipeDirection]);
//     console.log(images[activeImageIndex].url);
//   };
//   const dragEndHandler = (dragInfo) => {
//     const draggedDistance = dragInfo.offset.x;
//     const swipeThreshold = 50;
//     if (draggedDistance > swipeThreshold) {
//       swipeToImage(-1);
//     } else if (draggedDistance < -swipeThreshold) {
//       swipeToImage(1);
//     }
//   };

//   const skipToImage = (imageId) => {
//     let changeDirection;
//     if (imageId > activeImageIndex) {
//       changeDirection = 1;
//     } else if (imageId < activeImageIndex) {
//       changeDirection = -1;
//     }
//     setImageCount([imageId, changeDirection]);
//   };
//   console.log("carousel", images);
//   const handleClick = (item) => {
//     const filters = getParamsFromAdd(item.params);
//     const queryParams = convertFiltersToQueryParams(filters);

//     // // Log the query string or set it in the URL
//     console.log("Generated Query Params:", queryParams);

//     // Example: You can redirect to the new URL or update the browser's location
//     const newUrl = `${item.navigate_to_page}?${queryParams}`;
//     navigate(`/${newUrl}`);
//     console.log(filters);
//     console.log(item);
//   };

//   return (
//     <div className="box">
//       <div className="slider">
//         <AnimatePresence initial={false} custom={direction}>
//           <motion.img
//             onClick={() => handleClick(images[activeImageIndex])}
//             key={imageCount}
//             // style={{
//             //   backgroundImage: `url(${images[activeImageIndex].url})`,
//             // }}
//             src={images[activeImageIndex].url}
//             custom={direction}
//             variants={sliderVariants}
//             initial="incoming"
//             animate="active"
//             exit="exit"
//             transition={sliderTransition}
//             drag="x"
//             dragConstraints={{ left: 0, right: 0 }}
//             dragElastic={1}
//             onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
//             className="slide"
//           />
//         </AnimatePresence>
//       </div>
//       <div className="indicators">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             onClick={() => skipToImage(index)}
//             className={`indicator ${
//               index === activeImageIndex ? "isActive" : null
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };












////////////////////auto cycles////////////////






import React, { useEffect } from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./carousel.css";
import { getParamsFromAdd } from "../../utils/helpers/getParamsFromAdd";

const convertFiltersToQueryParams = (filters) => {
  const queryParams = [];
  for (const key in filters) {
    if (filters[key] && filters[key] !== null) {
      const value = Array.isArray(filters[key])
        ? filters[key].join(",")
        : filters[key];
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  }
  return queryParams.join("&");
};

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
  const [imageIndex, cycleImage] = useCycle(...images.map((_, i) => i)); // Correctly cycles through indices

  const activeImage = images[imageIndex]; // Get the active image object

  const handleClick = (item) => {
    const filters = getParamsFromAdd(item.params);
    const queryParams = convertFiltersToQueryParams(filters);
    const newUrl = `${item.navigate_to_page}?${queryParams}`;
    navigate(`/${newUrl}`);
  };

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
            src={activeImage.url} // Use the active image's URL
            custom={1}
            variants={sliderVariants}
            initial="incoming"
            animate="active"
            exit="exit"
            transition={sliderTransition}
            onClick={() => handleClick(activeImage)}
            className="slide"
          />
        </AnimatePresence>
      </div>
      <div className="indicators">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => cycleImage(index)} // Manually cycle to specific image
            className={`indicator ${
              index === imageIndex ? "isActive" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};
