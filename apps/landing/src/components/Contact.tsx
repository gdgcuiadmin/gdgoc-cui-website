import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Send, Instagram, Linkedin } from "lucide-react";
import { SlSocialGoogle } from "react-icons/sl";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import { sendContactEmail, sendAutoReply } from "../lib/emailjs";
import toast from "react-hot-toast";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitForm = async () => {
      try {
        // Send email via EmailJS
        const emailResult = await sendContactEmail(formData);

        if (emailResult.success) {
          // Send auto-reply to user
          await sendAutoReply(formData.email, formData.name);

          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });

          toast.success(
            "Message sent successfully! We'll get back to you soon.",
          );
        } else {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        toast.error("Failed to send message. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    };

    submitForm();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "gdsc.cuilahore@gmail.com",
      link: "mailto:gdsc.cuilahore@gmail.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "COMSATS University Islamabad, Lahore Campus, Raiwind",
      link: "#",
    },
    // {
    //   icon: Phone,
    //   title: "Call Us",
    //   content: "+92 51 9049 4949",
    //   link: "tel:+92519049494"
    // }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/gdgoc.cuilhr/",
      color: "#E4405F",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/gdsccuilhr",
      color: "#0A66C2",
    },
    {
      icon: BsWhatsapp,
      name: "Whatsapp",
      url: "https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM",
      color: "#333",
    },
    {
      icon: SlSocialGoogle,
      name: "GDG Community",
      url: "https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/",
      color: "#1877F2",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
            Get In <span className="text-google-blue">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our events, want to join our community, or
            interested in collaborating? We'd love to hear from you! Reach out
            and let's build something amazing together.
          </p>
        </motion.div>

        {/* COMMENTED OUT - Contact Form and Info Cards */}
        {/* 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-google-sans font-semibold text-gray-900 mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent transition-all duration-200"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-google-blue text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-google-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-google-blue" />
                    </div>
                    <div>
                      <h4 className="font-google-sans font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="font-google-sans font-semibold text-gray-900 mb-4">
                Follow Us on Social Media
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                    style={
                      { "--hover-color": social.color } as React.CSSProperties
                    }
                  >
                    <social.icon size={20} className="text-gray-600" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="bg-gradient-to-r from-google-blue/5 via-google-green/5 to-google-yellow/5 rounded-2xl p-6"
            >
              <h4 className="font-google-sans font-semibold text-gray-900 mb-3">
                Ready to Join Our Community?
              </h4>
              <p className="text-gray-600 mb-4">
                Become part of COMSATS' most active tech community and start
                your journey with us.
              </p>
              <Link
                target="_blank"
                href="https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-campus-lahore-pakistan/"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-google-green text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-green-600 transition-colors"
                >
                  Join Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        */}

        {/* Enhanced Social Links Section - Big, Centered, Beautiful */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-12"
        >
          {/* Social Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group flex flex-col items-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 min-h-[160px] justify-center"
                style={
                  {
                    "--hover-shadow": `0 25px 50px -12px ${social.color}25`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${social.color}15`,
                  }}
                >
                  <social.icon
                    size={32}
                    className="transition-all duration-300"
                    style={{ color: social.color }}
                  />
                </div>
                <span className="font-google-sans font-semibold text-gray-800 text-center group-hover:text-gray-900 transition-colors">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Join Community CTA - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-google-blue/5 via-google-green/5 to-google-yellow/5 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-2xl font-google-sans font-bold text-gray-900 mb-4">
                Ready to Join Our Community?
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Become part of COMSATS' most active tech community and start
                your journey with us. Connect, learn, and grow together!
              </p>
              <Link
                target="_blank"
                href="https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(52, 168, 83, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-google-green text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-green-600 transition-all duration-300"
                >
                  Join Our Community
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
