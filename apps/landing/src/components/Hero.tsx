import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Users, Calendar, Sparkles } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import GDGLogo from "../../public/assets/Horizontal - Light.png";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate floating icons
    if (floatingIconsRef.current) {
      const icons = floatingIconsRef.current.children;
      gsap.set(icons, { opacity: 0, scale: 0 });

      gsap.to(icons, {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        // ease: "back.out(1.7)",
        delay: 0.5,
      });

      // Continuous floating animation
      gsap.to(icons, {
        y: "-=20",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3,
      });
    }
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-80">
        <div className="absolute top-20 left-10 size-24 border-2 border-black md:size-64 bg-google-red rounded-full lur-none animate-float"></div>
        <div className="absolute top-32 md:top-40 right-2 border-2 border-black md:right-20 size-24 md:size-96 bg-google-green rounded-full ilter lur-none animate-float"></div>
        <div className="absolute bottom-20 left-20 size-24 border-2 border-black  md:size-80 bg-google-blue rounded-full ilter lur-none animate-float"></div>
        <div className="absolute bottom-40 right-10 size-20 md:size-72 border-2 border-black  bg-google-yellow rounded-full ilter lur-none animate-float"></div>
      </div>

      {/* <div
        ref={floatingIconsRef}
        className="absolute inset-0 pointer-events-none hidden lg:block"
      >
        <div className="absolute top-32 left-16 text-google-blue opacity-20">
          <Users size={48} className="animate-float" />
        </div>
        <div className="absolute top-48 right-16 text-google-green opacity-20">
          <Calendar size={40} className="animate-bounce-slow" />
        </div>
        <div className="absolute bottom-48 left-24 text-google-yellow opacity-20">
          <Sparkles size={44} className="animate-pulse-slow" />
        </div>
        <div className="absolute top-80 right-32 text-google-red opacity-20">
          <Users
            size={36}
            className="animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div> */}

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 max-md:mt-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo Area */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/*{" "}
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-google-blue via-google-green to-google-yellow rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-2xl">G</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-google-red rounded-full animate-pulse"></div>
              </div>
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl font-google-sans font-bold text-gray-800">
                  Google Developer Groups
                </h1>
                <p className="text-lg sm:text-xl text-google-blue font-medium">
                  COMSATS Chapter
                </p>
              </div>
            </div>{" "}
            */}
            {/* <Image */}
            {/*   src={GDGLogo} */}
            {/*   alt="GDG Logo" */}
            {/*   width={400} */}
            {/*   // height={50} */}
            {/*   priority */}
            {/*   quality={100} */}
            {/*   className="mx-auto mb-6" */}
            {/* /> */}
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-google-sans font-bold text-gray-900 leading-tight"
          >
            Building the Future of
            <span className="block pb-4 bg-gradient-to-r from-google-blue via-google-green to-google-red bg-clip-text text-transparent">
              Technology Together
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join COMSATS University's premier tech community. Learn,
            collaborate, and innovate with fellow developers using Google's
            cutting-edge technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              href="https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/"
              target="_blank"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(66, 133, 244, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-google-blue text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2"
              >
                <Users size={20} />
                <span>Join Our Community</span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector("#events")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-google-green text-green-600 hover:text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-google-green transition-all duration-300 flex items-center space-x-2"
            >
              <Calendar size={20} />
              <span>View Events</span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={scrollToNext}
          >
            <span className="text-sm text-gray-500 mb-2">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={24} className="text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
