"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import { bannerData } from "../utils/bannerData";
import { useEffect, useState } from "react";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full">
      <Navbar />
      <div className="relative w-full h-[100vh]">
        <Image
          src={bannerData[currentIndex]}
          alt="grass field"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute text-white top-[250px] left-[15px] md:top-[380px] md:left-[180px] ">
        <p>Welcome To TenTwenty Farms</p>
        <p className="mt-[20px] text-3xl  md:text-6xl max-w-sm   md:max-w-lg">
          From Our Farms To Your Hands
        </p>
        <div className="flex mt-[150px] md:mt-[200px]">
          <div className=" w-[100px] h-[100px] border-2 relative">
            <Image
              src={bannerData[(currentIndex + 1) % bannerData.length]}
              alt=""
              fill
              className="object-contain"
            />
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
