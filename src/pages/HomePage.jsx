import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Slider />
      <HeroSection />
      {/* FeaturedProducts هيتضاف هنا بعدين */}
      <div style={{ flex: 1 }} />
      <Footer />
    </div>
  );
}