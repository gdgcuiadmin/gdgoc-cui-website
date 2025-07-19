import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getTeamMembers, TeamMember } from "../lib/supabase";

gsap.registerPlugin(ScrollTrigger);

const Team: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
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

  useEffect(() => {
    if (sectionRef.current && teamMembers.length > 0) {
      const cards = sectionRef.current.querySelectorAll(".team-card");

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          // ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
          },
        }
      );
    }
  }, [teamMembers]);

  if (loading) {
    return (
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="loading-spinner mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
            Meet Our <span className="text-google-blue">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our dedicated team of student leaders works tirelessly to create an
            amazing experience for our community members and organize
            world-class tech events.
          </p>
        </motion.div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-google-sans font-semibold text-gray-600 mb-2">
              Team Coming Soon
            </h3>
            <p className="text-gray-500">
              We're building an amazing team of passionate developers!
            </p>
          </div>
        ) : (
          <div
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="team-card group"
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden relative">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    {/* Profile Image */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-google-blue/20 transition-all duration-300">
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-google-green to-google-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Member Info */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-google-sans font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-google-blue font-medium mb-1">
                        {member.position}
                      </p>
                      <p className="text-sm text-gray-500">
                        {member.department}
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      {member.linkedin_url && (
                        <motion.a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, color: "#0077B5" }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        >
                          <Linkedin size={20} />
                        </motion.a>
                      )}
                      {member.github_url && (
                        <motion.a
                          href={member.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, color: "#333" }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-gray-800 transition-colors duration-200"
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                      {member.twitter_url && (
                        <motion.a
                          href={member.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, color: "#1DA1F2" }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                        >
                          <Twitter size={20} />
                        </motion.a>
                      )}
                      {member.email && (
                        <motion.a
                          href={`mailto:${member.email}`}
                          whileHover={{ scale: 1.2, color: "#EA4335" }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-google-red transition-colors duration-200"
                        >
                          <Mail size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-google-blue/5 via-google-green/5 to-google-yellow/5 rounded-3xl p-8">
            <h3 className="text-2xl font-google-sans font-semibold text-gray-900 mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate students who want to
              contribute to the tech community and help organize amazing events
              and initiatives.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-google-green text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-green-600 transition-colors"
            >
              Apply to Join Team
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
