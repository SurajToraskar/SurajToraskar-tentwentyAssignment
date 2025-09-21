"use client";

import { useEffect, useRef, useState } from "react";
import { imageData as originalData } from "../utils/imageData";
import Image from "next/image";

export default function ImageCarousel() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const imageData = [
    ...originalData.slice(-1),
    ...originalData,
    ...originalData.slice(0, 1),
  ];

  const realLength = originalData.length;

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const child = slider.children[1] as HTMLElement; // real first item
      slider.scrollLeft = child.offsetLeft - slider.offsetLeft;
    }
  }, []);

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

    const realIndex = (closestIndex - 1 + realLength) % realLength;
    setActiveIndex(realIndex);

    if (closestIndex === 0) {
      const lastReal = slider.children[realLength] as HTMLElement;
      slider.scrollLeft = lastReal.offsetLeft - slider.offsetLeft;
    } else if (closestIndex === imageData.length - 1) {
      const firstReal = slider.children[1] as HTMLElement;
      slider.scrollLeft = firstReal.offsetLeft - slider.offsetLeft;
    }
  };

  // Mouse drag handlers
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
    const walk = (x - startX.current) * 1.5;
    slider.scrollLeft = scrollLeft.current - walk;
  };

  // Touch handlers
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

    slider.addEventListener("scroll", handleScroll);
    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto text-center min-h-screen px-2">
      <div
        ref={sliderRef}
        className="flex gap-10 scroll-smooth py-10 snap-x snap-mandatory cursor-grab select-none overflow-x-hidden"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {imageData.map((image, index) => {
          const slide = sliderRef.current?.children[index] as HTMLElement;
          let transformClasses = "";

          if (slide && sliderRef.current) {
            const rect = slide.getBoundingClientRect();
            const sliderRect = sliderRef.current.getBoundingClientRect();
            const slideCenter = rect.left + rect.width / 2;
            const sliderCenter = sliderRect.left + sliderRect.width / 2;
            const offset = slideCenter - sliderCenter;

            if (Math.abs(offset) < rect.width / 2) {
              // Center image
              transformClasses =
                "scale-105 -translate-y-4 opacity-100 rotate-0";
            } else if (offset < 0) {
              // Left side
              transformClasses = "scale-90 opacity-50 -rotate-12 translate-y-0";
            } else {
              // Right side
              transformClasses = "scale-90 opacity-50 rotate-12 translate-y-0";
            }
          } else {
            transformClasses = "scale-90 opacity-50 translate-y-0";
          }

          return (
            <div
              key={`${image.id}-${index}`}
              className={`flex-shrink-0 w-1/3 max-w-sm transition-all duration-300 ease-in-out snap-center transform ${transformClasses}`}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={400}
                height={300}
                className="w-full h-full rounded-lg pointer-events-none"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <h2 className="text-3xl">{originalData[activeIndex].title}</h2>
        <p className="text-gray-500 mt-2 text-xl">
          {originalData[activeIndex].description}
        </p>
      </div>
    </div>
  );
}
