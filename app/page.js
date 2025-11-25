"use client";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Separator from "./components/Separator";
import WhyUs from "./components/WhyUs";

export default function Home() {
  return (
    <main className="relative min-h-dvh text-white">
      <Hero />
      <HowItWorks />
      <Separator />
      <WhyUs />
    </main>
  );
}
