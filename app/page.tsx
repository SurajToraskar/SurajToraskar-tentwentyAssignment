import Banner from "./components/Banner";
import ImageCarousel from "./components/ImageCarousel";
import ProductCategory from "./components/ProductCategory";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Banner />
      <ProductCategory />
      <ImageCarousel />
    </>
  );
}
