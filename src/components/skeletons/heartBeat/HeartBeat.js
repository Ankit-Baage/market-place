import React from "react";
import { motion } from "framer-motion";

export const HeartBeat = () => {
  return (
    <div style={{
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
      columnGap: '8px',
    }}>
      <motion.div
        style={{
          display: "inline-block",
          width: "24px",
          height: "24px",
          backgroundColor: "#46CD80",
          borderRadius: "50%",
        }}
        animate={{
          scale: [1, 1.2, 1], // Scale up, then down
        }}
        transition={{
          duration: 0.6, // Total time for one heartbeat cycle
          ease: "easeInOut",
          repeat: Infinity, // Loop the animation infinitely
          repeatDelay: 0.2, // Pause before the next heartbeat starts
        }}
      />
      <h3
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "18px",
          color: "##FFFFFF",
        }}
      >
        Loading...
      </h3>
    </div>
  );
};
