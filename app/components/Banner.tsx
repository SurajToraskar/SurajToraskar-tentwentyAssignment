import Image from "next/image";
import banner from "../../public/banner1.jpg";
import Navbar from "./Navbar";

export default function Banner() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="relative w-full h-[100vh]">
        <Image src={banner} alt="grass field" fill className="object-cover" />
      </div>
      <div></div>
    </div>
  );
}
