"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Users, Calendar, Camera, BookOpen, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GDGLogo from "../../public/assets/Horizontal - Light.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navigation: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "/#about", icon: Users },
    { name: "Events", href: "/#events", icon: Calendar },
    { name: "Team", href: "/team", icon: Users },
    { name: "Gallery", href: "/#gallery", icon: Camera },
    { name: "Resources", href: "/#resources", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => setIsOpen(false), 500);
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      scrollToSection(href);
    } else {
      router.push(href);
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={GDGLogo}
              alt="GDG Logo"
              width={280}
              height={280}
              className="rounded-full"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.href)}
                className="text-gray-700 cursor-pointer hover:text-google-blue transition-colors duration-200 font-medium"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-google-blue p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavigation(item.href)}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-google-blue hover:bg-gray-50 rounded-lg flex items-center space-x-2 transition-colors duration-200"
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
