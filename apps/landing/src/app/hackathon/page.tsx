"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bug,
  Gamepad2,
  Smartphone,
  Search,
  Globe,
  Lightbulb,
  Code,
  UserCheck,
  Clock,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

const HackathonPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const competitions = [
    {
      id: 1,
      emoji: "🐞",
      icon: Bug,
      title: "Find the Bugs",
      type: "Individual Challenge",
      color: "google-blue",
      gradient: "from-blue-400 to-blue-600",
      description:
        "Identify logical flaws in printed code snippets across Python, C++, and Java. No syntax errors – pure logic hunting!",
      deliverables: [
        "Incorrect use of data structures for the intended problem",
        "Logical mistakes in algorithm steps",
        "Misinterpretation of problem requirements in implementation",
        "Missing edge cases",
      ],
      rules: [
        { text: "STRICTLY NO INTERNET", icon: WifiOff, type: "warning" },
        { text: "Individual participation only", icon: Users, type: "info" },
        {
          text: "Choose your language: Python, C++, or Java",
          icon: Code,
          type: "info",
        },
      ],
    },
    {
      id: 2,
      emoji: "🎮",
      icon: Gamepad2,
      title: "Design a Game",
      type: "Team Challenge (2-4 Members)",
      color: "google-green",
      gradient: "from-green-400 to-green-600",
      description:
        "Create a complete game prototype on paper based on a surprise theme. Unleash your creativity with themes like 'Cyberpunk Recycling' or 'Ocean Rescue'!",
      deliverables: [
        "Game title & one-line concept",
        "Core gameplay mechanics",
        "Win/lose conditions",
        "3 main rules",
        "Sketch of game board/interface",
        "Player progression system",
      ],
      rules: [
        { text: "Team of 2-4 members required", icon: Users, type: "info" },
        {
          text: "One GDGoC member per team mandatory",
          icon: UserCheck,
          type: "warning",
        },
        {
          text: "Surprise theme revealed on event day",
          icon: Lightbulb,
          type: "info",
        },
      ],
    },
    {
      id: 3,
      emoji: "📱",
      icon: Smartphone,
      title: "Draw a Mobile App",
      type: "Team Challenge (2-4 Members)",
      color: "google-yellow",
      gradient: "from-yellow-400 to-yellow-600",
      description:
        "Design 5-10 key screens for a real-world problem on chart paper. Focus on solving problems like 'Mental Wellness App for Students'.",
      deliverables: [
        "Login/Profile screen",
        "Main dashboard",
        "Core feature screen",
        "Settings screen",
        "One 'wow factor' innovation screen",
      ],
      rules: [
        { text: "Team of 2-4 members required", icon: Users, type: "info" },
        {
          text: "One GDGoC member per team mandatory",
          icon: UserCheck,
          type: "warning",
        },
        {
          text: "Design on chart paper provided",
          icon: CheckCircle,
          type: "info",
        },
      ],
    },
    {
      id: 4,
      emoji: "🔍",
      icon: Search,
      title: "See and Solve",
      type: "Individual Challenge",
      color: "google-red",
      gradient: "from-red-400 to-red-600",
      description:
        "Solve visual puzzles that represent computational thinking. No coding required – just pure problem-solving skills!",
      deliverables: [
        "Flowcharts with missing logic steps",
        "Data flow diagrams with inefficiencies",
        "Pattern sequences (predict the next)",
        "Physical layout optimization puzzles",
      ],
      rules: [
        { text: "Individual participation only", icon: Users, type: "info" },
        { text: "No coding or devices required", icon: WifiOff, type: "info" },
        {
          text: "Visual and logical thinking focused",
          icon: Search,
          type: "info",
        },
      ],
    },
    {
      id: 5,
      emoji: "🌍",
      icon: Globe,
      title: "Real World Solution",
      type: "Team Challenge (2-4 Members)",
      color: "purple",
      gradient: "from-purple-400 to-purple-600",
      description:
        "Design a tech-driven solution for one of the 17 UN Sustainable Development Goals. Make a real impact with your innovation!",
      deliverables: [
        "Clear problem statement",
        "Proposed tech (software/hardware blend)",
        "System architecture or user flow diagram",
        "3-5 key features",
        "3+ implementation challenges",
        "Impact measurement strategy",
      ],
      rules: [
        {
          text: "Internet ALLOWED for this competition",
          icon: Wifi,
          type: "success",
        },
        { text: "Team of 2-4 members required", icon: Users, type: "info" },
        {
          text: "One GDGoC member per team mandatory",
          icon: UserCheck,
          type: "warning",
        },
      ],
    },
  ];

  const quickFacts = [
    {
      icon: Calendar,
      title: "Date",
      value: "13th February, 2026",
      color: "google-blue",
    },
    {
      icon: MapPin,
      title: "Venue",
      value: "CAFE, COMSATS Lahore",
      color: "google-red",
    },
    {
      icon: Code,
      title: "Format",
      value: "Device-less, Open-air",
      color: "google-green",
    },
    {
      icon: Trophy,
      title: "Competitions",
      value: "5 Challenges",
      color: "google-yellow",
    },
    {
      icon: Users,
      title: "Team Size",
      value: "1-4 Members",
      color: "google-blue",
    },
    {
      icon: DollarSign,
      title: "Entry",
      value: "500 PKR per Team",
      color: "google-green",
    },
  ];

  const participantTypes = [
    {
      icon: Users,
      title: "Students",
      description:
        "Current COMSATS students with valid student ID. Open to all departments and semesters who are passionate about tech and innovation.",
      color: "google-blue",
    },
    {
      icon: UserCheck,
      title: "Teams",
      description:
        "Form teams of 2-4 members for team challenges. At least one member must be from GDGoC. Verification will be held on arrival.",
      color: "google-green",
    },
    {
      icon: Lightbulb,
      title: "Individuals",
      description:
        "Solo challenges available for individual participants. Show your skills in Find the Bugs and See and Solve competitions.",
      color: "google-yellow",
    },
  ];

  const faqs = [
    {
      question: "What should I bring to the hackathon?",
      answer:
        "Bring your student ID for verification, a pen/pencil, and your creative mind! All other resources including paper, chart papers, and code snippets will be provided on-site. No electronic devices needed!",
    },
    {
      question: "How are teams verified for GDGoC membership?",
      answer:
        "During check-in, at least one team member must show proof of GDGoC membership. This can be your GDGoC member ID, email confirmation, or community profile. Verification will be conducted before the event starts.",
    },
    {
      question: "Can I participate in multiple competitions?",
      answer:
        "Yes! You can participate in multiple competitions as long as the timings don't overlap. However, manage your time wisely to give your best performance in each challenge.",
    },
    {
      question: "Are refreshments provided?",
      answer:
        "The event is held at CAFE, COMSATS Lahore. Food and refreshments may be available for purchase at the venue. We recommend bringing water and snacks if needed.",
    },
    {
      question: "How will judging be done?",
      answer:
        "Each competition will be judged by industry experts and GDG mentors based on creativity, technical accuracy, problem-solving approach, presentation quality, and innovation. Detailed rubrics will be shared at the event.",
    },
    {
      question: "What are the prizes?",
      answer:
        "Winners will receive certificates, GDG swag, and recognition at our community platforms. Specific prizes will be announced at the event. The real reward is the learning experience and networking opportunities!",
    },
    {
      question: "Who should I contact for queries?",
      answer:
        "For any questions or concerns, reach out to us at gdsc.cuilahore@gmail.com or message us on our Instagram @gdgoc.cuilhr. Join our WhatsApp community for real-time updates!",
    },
  ];

  const importantNotes = [
    {
      icon: UserCheck,
      title: "Team Verification",
      description:
        "All team challenges require at least ONE member from GDGoC. Verification will be conducted on arrival. No exceptions!",
      type: "warning",
    },
    {
      icon: WifiOff,
      title: "Internet Restrictions",
      description:
        "Internet is STRICTLY PROHIBITED for all competitions except 'Real World Solution'. Devices will not be allowed during other challenges.",
      type: "error",
    },
    {
      icon: CheckCircle,
      title: "Resources Provided",
      description:
        "All materials including paper, chart papers, markers, and code snippets will be provided on-site. Just bring yourself and your creativity!",
      type: "success",
    },
    {
      icon: Clock,
      title: "Be On Time",
      description:
        "Check-in starts at the venue. Late arrivals may miss important instructions and reduce participation time. Plan to arrive early!",
      type: "info",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section - Gen AI Academy Style */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] overflow-hidden bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-12">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full text-sm font-medium mb-6">
                  GDG COMSATS Edition
                </span>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-google-sans font-bold text-gray-900 mb-6">
                  GDGoC Hackathon 26
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-green to-google-yellow"></span>
                </h1>
                <p className="text-2xl sm:text-3xl text-gray-700 font-medium mb-4">
                  <span className="block">Think. Design. Solve.</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-google-blue" />
                  <span className="font-medium">13th Feb, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-google-red" />
                  <span className="font-medium">CAFE, COMSATS Lahore</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://tally.so/r/your-form-id"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-google-blue text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300"
                >
                  Register Now
                  <ExternalLink size={20} />
                </Link>
                <Link
                  href="https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-google-blue hover:text-google-blue transition-all duration-300"
                >
                  Join Community
                </Link>
              </div>
            </div>

            {/* Right Decorative Elements - Gen AI Academy Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[600px]">
                {/* Flowing gradient cards */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-48 h-64 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${
                        i < 3
                          ? "#FFA500, #FF6B35"
                          : i < 6
                            ? "#FF6B6B, #FF1493"
                            : i < 9
                              ? "#FF1493, #9370DB"
                              : "#9370DB, #DC143C"
                      })`,
                      right: `${i * 40}px`,
                      top: `${i * 30}px`,
                      transform: `rotate(${10 + i * 5}deg)`,
                      opacity: 0.7,
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [10 + i * 5, 15 + i * 5, 10 + i * 5],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Challenge Cards */}
            <div className="space-y-6">
              <div
                className="bg-white rounded-3xl p-8 border-2 border-transparent bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  borderImage: "linear-gradient(135deg, #FBBC04, #34A853) 1",
                }}
              >
                <h3 className="text-2xl font-google-sans font-bold text-gray-900 mb-4">
                  Individual Challenges
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Test your skills solo in Find the Bugs and See and Solve
                  competitions. Showcase your logical thinking and
                  problem-solving abilities without any devices – just pure
                  computational thinking on paper!
                </p>
              </div>

              <div
                className="bg-white rounded-3xl p-8 border-2 border-transparent bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  borderImage: "linear-gradient(135deg, #EA4335, #FBBC04) 1",
                }}
              >
                <h3 className="text-2xl font-google-sans font-bold text-gray-900 mb-4">
                  Team Challenges
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Form teams of 2-4 members and collaborate on Design a Game,
                  Draw a Mobile App, and Real World Solution competitions. At
                  least one GDGoC member required per team.
                </p>
              </div>

              <div
                className="bg-white rounded-3xl p-8 border-2 border-transparent bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  borderImage: "linear-gradient(135deg, #4285F4, #9370DB) 1",
                }}
              >
                <h3 className="text-2xl font-google-sans font-bold text-gray-900 mb-4">
                  Device-less Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience a unique format where all resources are provided
                  on-site. No laptops or phones needed – just bring your
                  creativity and problem-solving mindset. Think beyond screens!
                </p>
              </div>
            </div>

            {/* Right Side - Overview Text and Quick Facts */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-8">
                  Overview
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Building on the success of tech innovation in Pakistan, we
                    are introducing an expanded{" "}
                    <span className="font-semibold text-google-blue">
                      Device-less Edition
                    </span>{" "}
                    of the GDG Hackathon. The GDG COMSATS Hackathon 2026 is a
                    premier, challenge-based learning and development program
                    designed to significantly upskill technical professionals
                    and developers across the region in computational thinking
                    and creative problem-solving.
                  </p>
                  <p>
                    The hackathon delivers continuous engagement, deep technical
                    mastery, and innovation-ready outcomes over five progressive
                    challenge categories, moving beyond traditional
                    device-dependent coding. Participants will follow a rigorous
                    cycle of Think, Design, Solve, utilizing Paper-Based
                    Innovation and Collaborative Learning. This includes
                    hands-on application of logical thinking, algorithm design,
                    and system architecture to solve complex, real-world
                    challenges without screens.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-google-sans font-bold text-gray-900 mb-6">
                  <span className="text-google-blue">Join today</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {quickFacts.map((fact, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <fact.icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium mb-1">
                          {fact.title}
                        </p>
                        <p className="text-sm text-gray-600">{fact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-google-blue rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-google-green rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
              Competition <span className="text-google-blue">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Five distinctive challenges designed to test different aspects of
              technical thinking and creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Competition 1 & 2 - Top Row */}
            {competitions.slice(0, 2).map((comp, index) => (
              <div key={comp.id} className="group relative">
                <div className="relative bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                  {/* Header with Number Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-${comp.color}/10 flex items-center justify-center text-3xl`}
                      >
                        {comp.emoji}
                      </div>
                      <div>
                        <h3 className="text-xl font-google-sans font-bold text-gray-900 mb-1">
                          {comp.title}
                        </h3>
                        <span className="text-sm text-gray-500 font-medium">
                          {comp.type}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {comp.description}
                  </p>

                  {/* Deliverables - Compact */}
                  <div className="mb-6">
                    <h4 className="font-google-sans font-semibold text-gray-700 mb-3 text-sm flex items-center gap-2">
                      <CheckCircle size={16} className="text-gray-400" />
                      Key Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {comp.deliverables.slice(0, 3).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="text-gray-400 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {comp.deliverables.length > 3 && (
                        <li className="text-xs text-gray-400 pl-4">
                          +{comp.deliverables.length - 3} more deliverables
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Rules - Horizontal Pills */}
                  <div className="flex flex-wrap gap-2">
                    {comp.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border ${
                          rule.type === "warning"
                            ? "bg-orange-50 text-orange-700 border-orange-200"
                            : rule.type === "success"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        <rule.icon size={12} />
                        <span>{rule.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Competition 3 - Full Width Featured */}
          <div className="mb-8">
            {(() => {
              const comp = competitions[2];
              return (
                <div className="group relative">
                  <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-md border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Left - Icon and Title */}
                      <div className="lg:col-span-1">
                        <div className="sticky top-8">
                          <div
                            className={`w-20 h-20 rounded-xl bg-${comp.color}/10 flex items-center justify-center text-4xl mb-6`}
                          >
                            {comp.emoji}
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-base mb-4">
                            3
                          </div>
                          <h3 className="text-2xl font-google-sans font-bold text-gray-900 mb-3">
                            {comp.title}
                          </h3>
                          <span className="inline-block text-sm text-gray-500 font-medium">
                            {comp.type}
                          </span>
                        </div>
                      </div>

                      {/* Right - Content */}
                      <div className="lg:col-span-2 space-y-6">
                        <p className="text-gray-600 leading-relaxed">
                          {comp.description}
                        </p>

                        <div>
                          <h4 className="font-google-sans font-semibold text-gray-700 mb-4 text-sm flex items-center gap-2">
                            <CheckCircle size={16} className="text-gray-400" />
                            Key Screens to Design
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {comp.deliverables.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                              >
                                <span className="text-gray-400 mt-0.5">•</span>
                                <span className="text-sm text-gray-700">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {comp.rules.map((rule, idx) => (
                            <div
                              key={idx}
                              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium border ${
                                rule.type === "warning"
                                  ? "bg-orange-50 border-orange-200 text-orange-700"
                                  : rule.type === "success"
                                    ? "bg-green-50 border-green-200 text-green-700"
                                    : "bg-blue-50 border-blue-200 text-blue-700"
                              }`}
                            >
                              <rule.icon size={14} />
                              <span>{rule.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Competition 4 & 5 - Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {competitions.slice(3, 5).map((comp, index) => (
              <div key={comp.id} className="group relative">
                <div className="relative bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                  {/* Header with Number Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-${comp.color}/10 flex items-center justify-center text-3xl`}
                      >
                        {comp.emoji}
                      </div>
                      <div>
                        <h3 className="text-xl font-google-sans font-bold text-gray-900 mb-1">
                          {comp.title}
                        </h3>
                        <span className="text-sm text-gray-500 font-medium">
                          {comp.type}
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm">
                      {index + 4}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {comp.description}
                  </p>

                  {/* Deliverables - Compact */}
                  <div className="mb-6">
                    <h4 className="font-google-sans font-semibold text-gray-700 mb-3 text-sm flex items-center gap-2">
                      <CheckCircle size={16} className="text-gray-400" />
                      Key Requirements
                    </h4>
                    <ul className="space-y-2">
                      {comp.deliverables.slice(0, 3).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="text-gray-400 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {comp.deliverables.length > 3 && (
                        <li className="text-xs text-gray-400 pl-4">
                          +{comp.deliverables.length - 3} more requirements
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Rules - Horizontal Pills */}
                  <div className="flex flex-wrap gap-2">
                    {comp.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border ${
                          rule.type === "warning"
                            ? "bg-orange-50 text-orange-700 border-orange-200"
                            : rule.type === "success"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        <rule.icon size={12} />
                        <span>{rule.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
              Important <span className="text-google-red">Guidelines</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these carefully before registering to ensure a smooth
              experience!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {importantNotes.map((note, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border-2 ${
                  note.type === "warning"
                    ? "bg-orange-50 border-orange-300"
                    : note.type === "error"
                      ? "bg-red-50 border-red-300"
                      : note.type === "success"
                        ? "bg-green-50 border-green-300"
                        : "bg-blue-50 border-blue-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      note.type === "warning"
                        ? "bg-orange-100"
                        : note.type === "error"
                          ? "bg-red-100"
                          : note.type === "success"
                            ? "bg-green-100"
                            : "bg-blue-100"
                    }`}
                  >
                    <note.icon
                      size={24}
                      className={
                        note.type === "warning"
                          ? "text-orange-600"
                          : note.type === "error"
                            ? "text-red-600"
                            : note.type === "success"
                              ? "text-green-600"
                              : "text-blue-600"
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-google-sans font-bold text-lg text-gray-900 mb-2">
                      {note.title}
                    </h3>
                    <p className="text-gray-700">{note.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Participate Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
              Who Can <span className="text-google-yellow">Participate</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Open to all passionate developers, designers, and innovators ready
              to think beyond screens!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {participantTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${type.color}/10 mb-6`}
                >
                  <type.icon className={`w-8 h-8 text-${type.color}`} />
                </div>
                <h3 className="text-xl font-google-sans font-bold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 bg-gray-50 rounded-full px-6 py-3 inline-block border border-gray-200">
              Note: All participants must be current COMSATS students with valid
              ID
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
              Frequently Asked{" "}
              <span className="text-google-blue">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers!
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-google-sans font-semibold text-lg text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp
                      className="flex-shrink-0 text-google-blue"
                      size={24}
                    />
                  ) : (
                    <ChevronDown
                      className="flex-shrink-0 text-gray-400"
                      size={24}
                    />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="py-20 bg-gradient-to-br from-google-blue/10 via-google-green/10 to-google-yellow/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
                Ready to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-green to-google-red">
                  Join the Challenge?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                Register now and be part of an unforgettable device-less
                hackathon experience!
              </p>
              <p className="text-sm text-gray-500">
                Limited spots available. Registration closes on 12th February,
                2026.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://tally.so/r/your-form-id"
                target="_blank"
                className="inline-flex items-center justify-center gap-3 bg-google-blue text-white px-10 py-5 rounded-lg font-google-sans font-semibold text-xl shadow-xl hover:bg-blue-600 hover:shadow-2xl transition-all duration-300"
              >
                <Trophy size={24} />
                Register Now
              </Link>
              <Link
                href="https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM"
                target="_blank"
                className="inline-flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-gray-300 px-10 py-5 rounded-lg font-google-sans font-semibold text-xl shadow-lg hover:border-google-blue hover:text-google-blue transition-all duration-300"
              >
                Join WhatsApp Group
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-google-blue" />
                <span>Expected 100+ Participants</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-google-yellow" />
                <span>5 Competition Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-google-green" />
                <span>Certificates for All</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HackathonPage;
