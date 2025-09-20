import Image from "next/image";
import banner1 from "../../public/banner1.jpg";
import Navbar from "./Navbar";

export default function Banner() {
  return (
    <div className="w-full h-full">
      {" "}
      <Image src={banner1} alt="green field" className="relative object-fit" />
      <Navbar />
    </div>
  );
}
