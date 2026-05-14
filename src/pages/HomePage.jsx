import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Slider />
      <HeroSection />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}