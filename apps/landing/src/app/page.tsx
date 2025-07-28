"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { initEmailJS } from "../lib/emailjs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Resources from "@/components/Resources";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import About from "@/components/About";
import Team from "@/components/Team";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initialize smooth scrolling and animations
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false,
    });

    // Set up smooth scroll behavior
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1);
        const element = document.getElementById(targetId || "");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", smoothScroll);

    return () => {
      document.removeEventListener("click", smoothScroll);
    };
  }, []);

  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <div className="App font-google-sans">
      <Hero />
      <About />
      <Events />
      <Gallery />
      <Team />
      <Resources />
      {/* <Contact /> */}
    </div>
  );
}
