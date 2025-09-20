"use client";
import { useState } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  function handleDrawer() {
    setDrawerOpen((prev) => !prev);
  }

  return (
    <div className="relative w-full h-[14%] bg-white text-black p-4 md:absolute md:w-[95%] md:top-4 md:left-10 md:z-20">
      <div className="flex justify-between h-[100%] items-center">
        <div className="flex-2 hidden md:block">
          <ul className="flex gap-x-6 w-[60%]">
            <li>About</li>
            <li>News</li>
            <li>Services</li>
            <li>Our Team</li>
            <li>Make Enquiry</li>
          </ul>
        </div>
        <div className="">
          <button className="border-1 px-4 py-1 cursor-pointer">
            Contact us &#8594;
          </button>
        </div>
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>
      <div
        className={`fixed top-[66px] right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-50`}
      >
        <ul className="flex flex-col p-6">
          <li onClick={() => handleDrawer()}>About</li>
          <li onClick={() => handleDrawer()}>News</li>
          <li onClick={() => handleDrawer()}>Services</li>
          <li onClick={() => handleDrawer()}>Our Team</li>
          <li onClick={() => handleDrawer()}>Make Enquiry</li>
        </ul>
      </div>
    </div>
  );
}
