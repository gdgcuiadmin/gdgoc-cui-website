import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getUpcomingEvents, Event } from "../lib/db";
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
    const { data, error } = await getUpcomingEvents();
    if (data && !error) {
      setEvents(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sectionRef.current && events.length > 0) {
      const eventCards = sectionRef.current.querySelectorAll(".event-card");

      gsap.fromTo(
        eventCards,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
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
      <section id="events" className="py-20 bg-white">
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
    <section id="events" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
            Upcoming <span className="text-google-blue">Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't miss out on our upcoming tech events, workshops, and meetups
            designed to enhance your skills and connect you with the developer
            community. Register now!
          </p>
        </motion.div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-google-sans font-semibold text-gray-600 mb-2">
              No Upcoming Events
            </h3>
            <p className="text-gray-500">
              Stay tuned! We're planning amazing events and workshops for you.
            </p>
          </div>
        ) : (
          <div
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="event-card cursor-pointer group"
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        event.image_url ||
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                      }
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-google-sans font-semibold text-gray-900 mb-3 transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Details */}
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
                        <MapPin size={16} className="mt-0.5 flex-shrink-0 " />
                        <span className="break-words">{event.location}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-google-blue/10 text-google-blue font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {event.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 font-medium">
                          +{event.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Register Button */}
                    <motion.a
                      href={event.registration_url || "https://www.instagram.com/gdgoc.cuilhr/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full cursor-pointer bg-google-green text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span>For details</span>
                        <ExternalLink size={16} />
                      </motion.button>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Want to Stay Updated?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our community to get early access to event registrations and
              exclusive updates about workshops, hackathons, and tech talks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open(
                    "https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/",
                    "_blank"
                  )
                }
                className="border-2 border-google-green text-green-700 px-8 py-3 rounded-full font-medium hover:bg-google-green hover:text-white transition-all duration-300"
              >
                Follow on GDG Platform
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
