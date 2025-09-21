"use client";

import { useEffect, useRef, useState } from "react";
import { imageData } from "../utils/imageData";
import Image from "next/image";

export default function ImageCarousel() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Handle center image detection
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = Array.from(slider.children);
    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(slideCenter - window.innerWidth / 2);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    isDragging.current = true;
    slider.classList.add("cursor-grabbing");
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    sliderRef.current?.classList.remove("cursor-grabbing");
  };

  const onMouseUp = () => {
    isDragging.current = false;
    sliderRef.current?.classList.remove("cursor-grabbing");
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider || !isDragging.current) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 1.5; // drag speed multiplier
    slider.scrollLeft = scrollLeft.current - walk;
  };

  // Touch support
  const onTouchStart = (e: React.TouchEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    isDragging.current = true;
    startX.current = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const slider = sliderRef.current;
    if (!slider || !isDragging.current) return;

    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    slider.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    handleScroll();
    slider.addEventListener("scroll", handleScroll);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden text-center min-h-screen">
      <div
        ref={sliderRef}
        className="flex gap-10  scroll-snap-x scroll-smooth py-10 px-2 snap-x snap-mandatory cursor-grab select-none overflow-x-hidden"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {imageData.map((image, index) => (
          <div
            key={image.id}
            className={`flex-shrink-0 w-72 transition-all duration-300 ease-in-out snap-center transform ${
              activeIndex === index
                ? "scale-105 rotate-0 opacity-100"
                : "scale-90 -rotate-3 opacity-50"
            }`}
          >
            <Image
              src={image.src}
              alt={image.title}
              width={400}
              height={300}
              className="w-full h-auto rounded-lg pointer-events-none"
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-3xl">{imageData[activeIndex].title}</h2>
        <p className="text-gray-500 mt-2 text-xl">
          {imageData[activeIndex].description}
        </p>
      </div>
    </div>
  );
}
