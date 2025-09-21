"use client";

import { useKeenSlider } from "keen-slider/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { imageData } from "../utils/imageData";

export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 3,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 40 }, // Larger spacing on desktop
      },
    },
    slideChanged(s) {
      setActiveIndex(s.track.details.rel);
    },
  });

  return (
    <div className="w-full  mt-10 text-center min-h-screen px-2">
      <div ref={sliderRef} className="keen-slider">
        {imageData.map((image, index) => {
          let rotateProps = "";
          if (index === activeIndex - 1) {
            rotateProps = "bg-red-500";
          } else if (index === activeIndex + 1) {
            rotateProps = "bg-green-500";
          }
          return (
            <div key={image.id} className="keen-slider__slide px-2">
              <Image
                src={image.src}
                alt={image.title}
                width={400}
                height={300}
                className={`w-full h-auto rounded-lg object-cover  ${rotateProps}`}
              />
            </div>
          );
        })}
      </div>

      {/* Animated Title & Description */}
      <div className="mt-[100px] px-4 min-h-[80px]">
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="text-2xl md:text-3xl"
          >
            {imageData[activeIndex].title}
          </motion.h2>
          <motion.p
            key={activeIndex + "-desc"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2 }}
            className="text-gray-500 mt-2 text-lg md:text-xl"
          >
            {imageData[activeIndex].description}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
