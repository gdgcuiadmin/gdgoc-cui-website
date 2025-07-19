import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail, MapPin, Phone, Heart } from "lucide-react";
import Link from "next/link";
import GDGLogo from "../../public/assets/Horizontal - Template.png";
import Image from "next/image";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    community: [
      { name: "About GDG", href: "#about" },
      { name: "Our Team", href: "#team" },
      { name: "Events", href: "#events" },
      { name: "Join Us", href: "#contact" },
    ],
    resources: [
      { name: "Developer Tools", href: "#resources" },
      { name: "Learning Materials", href: "#resources" },
      { name: "Project Gallery", href: "#gallery" },
      { name: "Code Samples", href: "#resources" },
    ],
    connect: [
      // { name: "Facebook", href: "https://www.linkedin.com/company/gdsccuilhr" },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/gdsccuilhr",
      },
      {
        name: "GDG Community",
        href: "https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/",
      },
      { name: "Instagram", href: "https://www.instagram.com/gdgoc.cuilhr/" },
      {
        name: "Whatsapp",
        url: "https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM",
      },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-google-blue rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-google-green rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-10 w-36 h-36 bg-google-yellow rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                {/* <div className="w-12 h-12 bg-gradient-to-r from-google-blue via-google-green to-google-yellow rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <div>
                  <h3 className="font-google-sans font-bold text-xl">
                    GDG COMSATS
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Google Developer Groups
                  </p>
                </div> */}
                <Image
                  src={GDGLogo}
                  alt="GDG Logo"
                  width={400}
                  // height={50}
                  priority
                  quality={100}
                  className="mx-auto mb-6"
                />
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Building the future of technology together. Join COMSATS
                University's premier tech community for learning, collaboration,
                and innovation.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Mail size={16} />
                  <span>gdsc.cuilahore@gmail.com</span>
                </div>
                {/* <div className="flex items-center space-x-3 text-sm text-gray-400"> */}
                {/*   <Phone size={16} /> */}
                {/*   <span>+92 51 9049 4949</span> */}
                {/* </div> */}
                <div className="flex items-start space-x-3 text-sm text-gray-400">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    COMSATS University Islamabad, Lahore Campus, Raiwind
                  </span>
                </div>
              </div>
            </div>

            {/* Community Links */}
            <div>
              <h4 className="font-google-sans font-semibold text-lg mb-6">
                Community
              </h4>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-google-sans font-semibold text-lg mb-6">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Links */}
            <div>
              <h4 className="font-google-sans font-semibold text-lg mb-6">
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex space-x-2 max-md:flex-col items-center justify-center text-sm text-gray-400">
              <div className="flex space-x-2">
                <span>© 2025 GDG COMSATS. Made with</span>
                <Heart size={16} className="text-google-red fill-google-red" />
              </div>
              <span>
                by{" "}
                <Link
                  className="underline text-green-400"
                  target="_blank"
                  href="https://www.linkedin.com/in/waqar-ahmad321/"
                >
                  Waqar Ahmad
                </Link>{" "}
                for the developer community
              </span>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-google-blue text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center z-50"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
