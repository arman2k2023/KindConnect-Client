
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UpcomingEvents />
      </main>
      <Footer />
    </>
  );
}
