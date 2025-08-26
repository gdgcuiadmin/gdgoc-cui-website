import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getEvents, Event } from "../lib/supabase";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Events: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await getEvents();
    if (data && !error) {
      setEvents(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sectionRef.current && events.length > 0) {
      const timeline = sectionRef.current.querySelector(".timeline-line");
      const eventCards = sectionRef.current.querySelectorAll(".event-card");

      if (timeline) {
        gsap.fromTo(
          timeline,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
            },
          }
        );
      }

      gsap.fromTo(
        eventCards,
        { x: (index) => (index % 2 === 0 ? -50 : 50), opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 20%",
          },
        }
      );
    }
  }, [events]);

  if (loading) {
    return (
      <section
        id="events"
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="loading-spinner mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="events"
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
            Events & <span className="text-google-blue">Workshops</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our exciting lineup of tech events, workshops, and meetups
            designed to enhance your skills and connect you with the developer
            community.
          </p>
        </motion.div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-google-sans font-semibold text-gray-600 mb-2">
              No Events Yet
            </h3>
            <p className="text-gray-500">
              Stay tuned for upcoming events and workshops!
            </p>
          </div>
        ) : (
          <div ref={sectionRef} className="relative">
            {/* Timeline Line - Hidden on mobile, visible on larger screens */}
            <div className="timeline-line hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-google-blue via-google-green to-google-yellow h-full rounded-full origin-top"></div>

            <div className="space-y-8 lg:space-y-16">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`event-card relative ${
                    // On mobile: full width, on lg: alternating layout
                    "lg:flex lg:items-center " +
                    (index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse")
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Timeline Dot - Only visible on large screens */}
                  <div
                    className={`hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-${event.color} rounded-full border-4 border-white shadow-lg z-10`}
                  ></div>

                  {/* Event Card */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            event.status === "upcoming"
                              ? "bg-green-100 text-green-700"
                              : event.status === "completed"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {event.status === "upcoming"
                            ? "Upcoming"
                            : event.status === "completed"
                            ? "Completed"
                            : "Cancelled"}
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Users size={16} />
                          <span className="text-sm">
                            {event.attendees > 0 ? event.attendees : "TBA"}
                            {event.max_attendees && ` / ${event.max_attendees}`}
                          </span>
                        </div>
                      </div>

                      {event.image_url && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}

                      <h3 className="text-xl font-google-sans font-semibold text-gray-900 mb-3">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 mb-4">{event.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar size={16} />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock size={16} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-start space-x-2 text-sm text-gray-500">
                          <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                          <span className="break-words">{event.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs rounded-full bg-${event.color}/10 text-${event.color} font-medium`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {event.status === "upcoming" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (event.registration_url) {
                              window.open(event.registration_url, "_blank");
                            }
                          }}
                          className={`w-full bg-${event.color} text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity`}
                        >
                          <span>Register Now</span>
                          <ExternalLink size={16} />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Spacer for the other side - Only on large screens */}
                  <div className="hidden lg:block lg:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-google-blue/10 to-google-green/10 rounded-3xl p-8">
            <h3 className="text-2xl font-google-sans font-semibold text-gray-900 mb-4">
              Don't Miss Out on Future Events!
            </h3>
            <p className="text-gray-600 mb-6">
              Join our community to get notified about upcoming workshops,
              hackathons, and tech talks.
            </p>
            <Link
              href="https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM"
              target="_blank"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-google-blue text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-blue-600 transition-colors"
              >
                Join Our Community
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
