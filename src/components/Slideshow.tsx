"use client"; 

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

const images = [
  "/images/home/currentdrop3.jpg",
  "/images/home/currentdrop2.jpg",
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Box position="relative" width="100%" height="100vh" overflow="hidden">
      {images.map((src, index) => (
        <Box
          key={index}
          position="absolute"
          width="100%"
          height="100%"
          bgImage={`url(${src})`}
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          opacity={index === currentIndex ? 1 : 0} // Show only current image
          transition="opacity 1s ease-in-out" // Smooth fade transition
        />
      ))}
    </Box>
  );
}
