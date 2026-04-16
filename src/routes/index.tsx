import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryCards from "@/components/home/CategoryCards";
import StatsCounter from "@/components/home/StatsCounter";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoryCards />
      <StatsCounter />
      <Footer />
    </>
  );
}
