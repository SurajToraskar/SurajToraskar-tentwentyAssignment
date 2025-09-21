"use client";

import useElementInView from "../custom-hooks/useElementInView";

export default function ProductCategory() {
  const { ref, isInView } = useElementInView(0.2, true);

  return (
    <div className="flex justify-center items-center mt-[180px] p-4">
      <div ref={ref} className="text-center">
        <h1
          className={`font-sans text-[50px] transition-all duration-1000 ease-out
          ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Quality Products
        </h1>

        <p
          className={`text-gray-400 mt-6 text-md w-full max-w-xl break-words transition-all duration-1000 ease-out delay-700
          ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}
