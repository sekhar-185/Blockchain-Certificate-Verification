import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorks from "../components/home/HowItWorks";

export default function Home() {
  return (
    <>
  
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </>
  );
}
