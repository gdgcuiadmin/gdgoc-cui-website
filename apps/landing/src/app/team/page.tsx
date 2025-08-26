"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Linkedin, Github, Twitter, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTeamMembers, TeamMember } from "../../lib/supabase";

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: teamSectionRef, inView } = useInView({
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
                    href="/#contact"
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
