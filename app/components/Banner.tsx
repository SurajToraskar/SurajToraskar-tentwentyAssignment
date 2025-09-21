"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import { bannerData } from "../utils/bannerData";
import { useEffect, useState } from "react";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, bannerData.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerData.length);
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="relative w-full h-[100vh]">
        <Image
          src={bannerData[currentIndex]}
          alt="grass field"
          fill
          className="object-fit md:object-cover"
        />
      </div>
      <div className="absolute text-white top-[250px] left-[15px] md:top-[380px] md:left-[180px] ">
        <p>Welcome To TenTwenty Farms</p>
        <p className="mt-[20px] text-3xl  md:text-6xl max-w-sm   md:max-w-lg">
          From Our Farms To Your Hands
        </p>
        <div
          className="flex mt-[150px] md:mt-[200px]"
          onClick={() => handleNext()}
        >
          <div className=" w-[120px] h-[120px] border-1 relative cursor-pointer">
            <Image
              src={bannerData[(currentIndex + 1) % bannerData.length]}
              alt=""
              fill
              className="object-fit p-4"
            />
            <span className="absolute top-[42px] left-10">Next</span>
            <div
              key={currentIndex}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              <div className="absolute top-0 left-0 h-[6px] bg-white animate-loaderTop"></div>
              <div className="absolute top-0 right-0 w-[6px] bg-white animate-loaderRight"></div>
              <div className="absolute bottom-0 right-0 h-[6px] bg-white animate-loaderBottom"></div>
              <div className="absolute bottom-0 left-0 w-[6px] bg-white animate-loaderLeft"></div>
            </div>
          </div>
          <div className="flex  items-center ml-10">
            <span className="">
              {currentIndex + 1 < 10
                ? `0${currentIndex + 1}`
                : currentIndex + 1}
            </span>
            <span className="ml-2 block w-[100px] h-[2px] bg-white"></span>
            <span className="ml-2">
              {bannerData.length < 10
                ? `0${bannerData.length}`
                : bannerData.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
