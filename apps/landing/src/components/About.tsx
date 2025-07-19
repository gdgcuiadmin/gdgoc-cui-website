import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Heart, Lightbulb, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".about-card");

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
        {},
      );
    }
  }, []);

  const values = [
    {
      icon: Target,
      title: "Mission",
      description:
        "To foster innovation and learning in technology by connecting students with Google's developer ecosystem and creating a collaborative environment for growth.",
      color: "google-blue",
    },
    {
      icon: Heart,
      title: "Values",
      description:
        "We believe in inclusivity, continuous learning, community support, and the power of technology to solve real-world problems.",
      color: "google-red",
    },
    {
      icon: Lightbulb,
      title: "Vision",
      description:
        "To be the leading tech community in COMSATS, empowering students to become the next generation of innovative developers and entrepreneurs.",
      color: "google-yellow",
    },
    {
      icon: Globe,
      title: "Impact",
      description:
        "Building bridges between academia and industry while creating opportunities for students to contribute to the global developer community.",
      color: "google-green",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
            About <span className="text-google-blue">GDG COMSATS</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Google Developer Groups (GDG) are community groups for developers
            interested in Google's developer technology. Our COMSATS chapter
            brings together passionate students and tech enthusiasts to learn,
            share, and grow together.
          </p>
        </motion.div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="about-card group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl"
              whileHover={{ y: -5 }}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${value.color}/10 mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <value.icon className={`w-8 h-8 text-${value.color}`} />
              </div>
              <h3 className="text-xl font-google-sans font-semibold text-gray-900 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-r from-google-blue/5 via-google-green/5 to-google-yellow/5 rounded-3xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-google-blue mb-2"
              >
                100+
              </motion.div>
              <div className="text-gray-600 font-medium">Community Members</div>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-google-green mb-2"
              >
                20+
              </motion.div>
              <div className="text-gray-600 font-medium">Events Hosted</div>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-google-yellow mb-2"
              >
                25+
              </motion.div>
              <div className="text-gray-600 font-medium">Speaker Sessions</div>
            </div>
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-google-red mb-2"
              >
                10+
              </motion.div>
              <div className="text-gray-600 font-medium">Collaborations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
