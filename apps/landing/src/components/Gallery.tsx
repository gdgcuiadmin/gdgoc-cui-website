import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getEvents, Event } from "../lib/supabase";

gsap.registerPlugin(ScrollTrigger);

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [events, setGalleryImages] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    setLoading(true);
    const { data, error } = await getEvents();
    if (data && !error) {
      // Process images to show only one representative image per event
      setGalleryImages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sectionRef.current && events.length > 0) {
      const images = sectionRef.current.querySelectorAll(".gallery-item");

      gsap.fromTo(
        images,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          // ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
          },
        },
      );
    }
  }, [events]);

  if (loading) {
    return (
      <section
        id="gallery"
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="loading-spinner mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
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
            Event <span className="text-google-blue">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take a look at some memorable moments from our past events,
            workshops, and community gatherings. Click on any event to see all
            photos from that session.
          </p>
        </motion.div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-google-sans font-semibold text-gray-600 mb-2">
              Gallery Coming Soon
            </h3>
            <p className="text-gray-500">
              We're capturing amazing moments from our events!
            </p>
          </div>
        ) : (
          <div
            ref={sectionRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {events
              .filter((event) => event.status === "completed")
              .map((event, index) => (
                <motion.div
                  key={event.id}
                  className="gallery-item group cursor-pointer relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                  onClick={() =>
                    window.open("https://www.linkedin.com", "_blank")
                  }
                >
                  <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                    <img
                      src={
                        event.image_url ||
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                      }
                      alt={"Event event"}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* event Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-google-sans font-semibold text-lg mb-1">
                        {event.title}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-gray-200 mb-2">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 text-xs text-gray-300">
                        <span>{event.title}</span>
                        <span>•</span>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
