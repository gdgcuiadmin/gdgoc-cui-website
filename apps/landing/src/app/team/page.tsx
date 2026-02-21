"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Linkedin, Github, Twitter, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTeamMembers, TeamMember } from "../../lib/db";
import Image from "next/image";

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: teamSectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { ref: leadSectionRef, inView: leadInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    const { data, error } = await getTeamMembers();
    if (data && !error) {
      setTeamMembers(data);
    }
    setLoading(false);
  };

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Card variants for individual team member cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Image variants for profile pictures
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  // Social links animation variants
  const socialLinksVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const socialLinkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Lead section animation variants
  const leadSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const leadImageVariants = {
    hidden: { scale: 0.8, opacity: 0, x: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "backOut",
        delay: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Combined Team Section */}
      <motion.section
        ref={teamSectionRef}
        className="relative py-20 bg-gradient-to-br from-google-blue/5 via-white to-google-green/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Content */}
          <div className="text-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-google-blue hover:text-blue-600 font-medium mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-google-sans font-bold text-gray-900 mb-6"
            >
              Meet Our{" "}
              <span className="bg-gradient-to-r from-google-blue via-google-green to-google-yellow bg-clip-text text-transparent">
                Amazing Team
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Passionate students and tech enthusiasts working together to build
              an innovative community and foster learning through Google
              technologies.
            </motion.p>
          </div>

          {/* Leadership Section */}
          <motion.div
            ref={leadSectionRef}
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content Side */}
                <motion.div
                  variants={leadSectionVariants}
                  initial="hidden"
                  animate={leadInView ? "visible" : "hidden"}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={leadInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="inline-block px-4 py-2 bg-google-blue/10 text-google-blue rounded-full text-sm font-medium mb-4">
                      Our Lead
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-google-sans font-bold text-gray-900 mb-6">
                      Meet{" "}
                      <span className="text-google-blue">Ms. Zoha Waheed</span>
                    </h2>
                    <p className="text-xl text-google-green font-medium mb-4">
                      GDGoC COMSATS Lahore Organizer (Lead)
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={leadInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4"
                  >
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Meet Ms. Zoha Waheed, the Organizer (Lead) of Google
                      Developer Group (GDG) on Campus, COMSATS Lahore.
                      Passionate about technology and accessibility, she is
                      dedicated to building an inclusive community where
                      students can grow, collaborate, and lead.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Under her leadership, the chapter has grown into a 3,000+
                      member community, introducing Skill Up Sessions, COMSATS’
                      first student startup panel talk, initiatives are taken
                      for women empowerment, and incubation assistance for
                      aspiring founders. Since then, GDG Comsats Lahore has also
                      led tech sessions, study jams, and workshops, giving
                      students hands-on exposure to Google’s fast-track
                      resources within the university.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Let’s join hands together to create more opportunities,
                      drive innovation, and build a stronger tech community for
                      all.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={leadInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="pt-4"
                  >
                    <motion.a
                      href="https://linkedin.com/in/zoha-waheed" // Replace with actual LinkedIn URL
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Linkedin size={20} />
                      Connect on LinkedIn
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Image Side */}
                <motion.div
                  variants={leadImageVariants}
                  initial="hidden"
                  animate={leadInView ? "visible" : "hidden"}
                  className="relative flex justify-center lg:justify-end"
                >
                  <div className="relative">
                    {/* Main Image Container */}
                    <motion.div
                      className="w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-google-blue/20 via-google-green/20 to-google-yellow/20 shadow-2xl border-4 border-white"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {/* Replace with actual image of Ms. Zoha Waheed */}
                      <Image
                        src="/assets/lead.jpg"
                        alt="Ms. Zoha Waheed - GDGoC President"
                        width={320}
                        height={320}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = "flex";
                          }
                        }}
                      />
                      {/* Fallback content */}
                      <div
                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-google-blue/20 via-google-green/20 to-google-yellow/20"
                        style={{ display: "none" }}
                      >
                        <div className="text-center">
                          <div className="text-6xl font-bold text-google-blue mb-2">
                            ZW
                          </div>
                          <div className="text-lg font-medium text-gray-600">
                            President
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-24 h-24 bg-google-blue/10 rounded-full"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-6 -left-6 w-16 h-16 bg-google-green/10 rounded-full"
                      animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.6, 0.3, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                    <motion.div
                      className="absolute top-1/2 -left-8 w-12 h-12 bg-google-yellow/10 rounded-full"
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Team Members Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-google-sans font-bold text-gray-900 mb-4">
              Our Dedicated Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the passionate individuals who bring our vision to life
              through their dedication, expertise, and commitment to community
              building.
            </p>
          </motion.div>

          {/* Team Members Content */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="rounded-full h-12 w-12 border-b-2 border-google-blue"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    variants={cardVariants}
                    className="team-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group border border-gray-100"
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative mb-6">
                      <motion.div
                        variants={imageVariants}
                        className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-google-blue/20 to-google-green/20 flex items-center justify-center"
                      >
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-2xl font-bold text-google-blue">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.3,
                          duration: 0.4,
                          type: "spring",
                        }}
                      >
                        <div className="w-4 h-4 bg-google-green rounded-full border-2 border-white"></div>
                      </motion.div>
                    </div>

                    <motion.div
                      className="text-center"
                      variants={socialLinksVariants}
                    >
                      <motion.h3
                        className="text-xl font-google-sans font-semibold text-gray-900 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        {member.name}
                      </motion.h3>
                      <motion.p
                        className="text-google-blue font-medium mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        {member.position}
                      </motion.p>
                      {member.department && (
                        <motion.p
                          className="text-sm text-gray-500 mb-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                        >
                          {member.department}
                        </motion.p>
                      )}
                      {member.bio && (
                        <motion.p
                          className="text-sm text-gray-600 mb-4 line-clamp-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                        >
                          {member.bio}
                        </motion.p>
                      )}

                      {/* Social Links */}
                      <motion.div
                        className="flex justify-center space-x-3 pt-4 border-t border-gray-100"
                        variants={socialLinksVariants}
                      >
                        {member.linkedin_url && (
                          <motion.a
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            variants={socialLinkVariants}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Linkedin size={20} />
                          </motion.a>
                        )}
                        {member.github_url && (
                          <motion.a
                            href={member.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-800 transition-colors"
                            variants={socialLinkVariants}
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github size={20} />
                          </motion.a>
                        )}
                        {member.twitter_url && (
                          <motion.a
                            href={member.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                            variants={socialLinkVariants}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Twitter size={20} />
                          </motion.a>
                        )}
                        {member.email && (
                          <motion.a
                            href={`mailto:${member.email}`}
                            className="text-gray-400 hover:text-google-red transition-colors"
                            variants={socialLinkVariants}
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Mail size={20} />
                          </motion.a>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Join Team CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center mt-20"
          >
            <motion.div
              className="bg-gradient-to-r from-google-blue/5 via-google-green/5 to-google-yellow/5 rounded-3xl p-12"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.h3
                className="text-3xl font-google-sans font-semibold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                Ready to Join Our Journey?
              </motion.h3>
              <motion.p
                className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                We're always looking for passionate students who want to
                contribute to the tech community and help organize amazing
                events and initiatives. Be part of something bigger!
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href="https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM"
                    target="_blank"
                    className="bg-google-green text-white px-8 py-4 rounded-full font-medium shadow-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center"
                  >
                    Apply to Join Team
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href="/#events"
                    className="border-2 border-google-blue text-google-blue px-8 py-4 rounded-full font-medium hover:bg-google-blue hover:text-white transition-colors inline-flex items-center justify-center"
                  >
                    Attend Our Events
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default TeamPage;
