"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { imageData as originalData } from "../utils/imageData";
import Image from "next/image";

interface CarouselItem {
  id: string;
  src: string;
  title: string;
  description: string;
}

export default function ImageCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Create infinite scroll effect with cloned items
  const imageData = useMemo(
    () => [
      ...originalData.slice(-1),
      ...originalData,
      ...originalData.slice(0, 1),
    ],
    []
  );

  const realLength = originalData.length;

  // Initialize slider position
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const firstRealItem = slider.children[1] as HTMLElement;
    if (firstRealItem) {
      slider.scrollLeft = firstRealItem.offsetLeft - slider.offsetLeft;
    }
  }, []);

  // Handle scroll with throttling using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    animationFrameId.current = requestAnimationFrame(() => {
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

      // Handle infinite scroll loop
      if (closestIndex === 0) {
        const lastReal = slider.children[realLength] as HTMLElement;
        slider.scrollLeft = lastReal.offsetLeft - slider.offsetLeft;
      } else if (closestIndex === imageData.length - 1) {
        const firstReal = slider.children[1] as HTMLElement;
        slider.scrollLeft = firstReal.offsetLeft - slider.offsetLeft;
      }
    });
  }, [realLength, imageData.length]);

  // Mouse and touch event handlers
  const startDrag = useCallback((clientX: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    isDragging.current = true;
    slider.classList.add("cursor-grabbing", "select-none");
    startX.current = clientX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;
  }, []);

  const duringDrag = useCallback((clientX: number) => {
    const slider = sliderRef.current;
    if (!slider || !isDragging.current) return;

    const x = clientX - slider.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    slider.scrollLeft = scrollLeft.current - walk;
  }, []);

  const endDrag = useCallback(() => {
    isDragging.current = false;
    sliderRef.current?.classList.remove("cursor-grabbing", "select-none");
  }, []);

  // Event handler wrappers
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      startDrag(e.pageX);
    },
    [startDrag]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      duringDrag(e.pageX);
    },
    [duringDrag]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      startDrag(e.touches[0].pageX);
    },
    [startDrag]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      duringDrag(e.touches[0].pageX);
    },
    [duringDrag]
  );

  // Add scroll event listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      slider.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleScroll]);

  // Get transform classes based on slide position
  const getTransformClasses = useCallback((index: number) => {
    const slide = sliderRef.current?.children[index] as HTMLElement;
    if (!slide || !sliderRef.current) return "scale-90 opacity-50";

    const rect = slide.getBoundingClientRect();
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const slideCenter = rect.left + rect.width / 2;
    const sliderCenter = sliderRect.left + sliderRect.width / 2;
    const offset = slideCenter - sliderCenter;

    if (Math.abs(offset) < rect.width / 2) {
      return "scale-105 -translate-y-4 opacity-100 rotate-0";
    } else if (offset < 0) {
      return "scale-90 opacity-50 -rotate-12";
    } else {
      return "scale-90 opacity-50 rotate-12";
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 text-center min-h-screen px-2">
      {/* Scrollable Image Slider */}
      <div
        ref={sliderRef}
        className="flex gap-4 md:gap-10 scroll-smooth py-10 snap-x snap-mandatory cursor-grab overflow-x-auto hide-scrollbar"
        onMouseDown={onMouseDown}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={endDrag}
      >
        {imageData.map((image, index) => {
          const transformClasses = getTransformClasses(index);

          return (
            <div
              key={`${image.id}-${index}`}
              className={`flex-shrink-0 w-4/5 sm:w-2/3 md:max-w-sm transition-all duration-300 ease-in-out snap-center transform ${transformClasses}`}
            >
              <Image
                src={image.src}
                alt={image.title}
                width={400}
                height={300}
                className="w-full h-auto rounded-lg pointer-events-none object-cover"
                priority={index === 1} // Prioritize loading the first real image
              />
            </div>
          );
        })}
      </div>

      {/* Image Title and Description */}
      <div className="mt-4 px-4">
        <h2 className="text-2xl md:text-3xl">
          {originalData[activeIndex].title}
        </h2>
        <p className="text-gray-500 mt-2 text-lg md:text-xl">
          {originalData[activeIndex].description}
        </p>
      </div>
    </div>
  );
}
