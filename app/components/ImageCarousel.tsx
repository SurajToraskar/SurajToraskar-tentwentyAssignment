"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { imageData } from "../utils/imageData";

export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full mt-[100px] text-center min-h-screen px-2">
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        centeredSlides={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        className="w-full"
      >
        {imageData.map((image, index) => (
          <SwiperSlide key={image.id} className="relative md:py-10">
            <Image
              src={image.src}
              alt={image.title}
              width={600}
              height={600}
              className={`w-[80%] md:w-[80%] mx-10 h-[300px] md:h-[600px] rounded-lg object-cover transition-transform duration-500 ${
                index ===
                (activeIndex - 1 + imageData.length) % imageData.length
                  ? "-rotate-6"
                  : index === (activeIndex + 1) % imageData.length
                  ? "rotate-6"
                  : "md:-mt-[32px]"
              }`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

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
            {imageData[activeIndex]?.title}
          </motion.h2>
          <motion.p
            key={activeIndex + "-desc"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2 }}
            className="text-gray-500 mt-2 text-lg md:text-xl"
          >
            {imageData[activeIndex]?.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
