import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getGalleryImages,
  getEventGalleryImages,
  GalleryImage,
} from "../lib/supabase";

gsap.registerPlugin(ScrollTrigger);

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [currentEventImages, setCurrentEventImages] = useState<GalleryImage[]>(
    []
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
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
    const { data, error } = await getGalleryImages();
    if (data && !error) {
      // Process images to show only one representative image per event
      const processedImages = processImagesForDisplay(data);
      setGalleryImages(processedImages);
    }
    setLoading(false);
  };

  const processImagesForDisplay = (images: GalleryImage[]) => {
    const eventImageMap = new Map<string, GalleryImage[]>();
    const nonEventImages: GalleryImage[] = [];

    // Group images by event
    images.forEach((image) => {
      if (image.event_id) {
        const eventId = image.event_id;
        if (!eventImageMap.has(eventId)) {
          eventImageMap.set(eventId, []);
        }
        eventImageMap.get(eventId)!.push(image);
      } else {
        nonEventImages.push(image);
      }
    });

    // Create display array with one representative image per event
    const displayImages: GalleryImage[] = [];

    // Add one representative image per event (preferably featured, or first one)
    eventImageMap.forEach((eventImages, eventId) => {
      const sortedImages = eventImages.sort((a, b) => {
        // Prioritize featured images, then by order_index
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.order_index - b.order_index;
      });

      const representativeImage = sortedImages[0];
      // Mark this as representative and store total count
      displayImages.push({
        ...representativeImage,
        // Add metadata to indicate this represents multiple images
        description:
          eventImages.length > 1
            ? `${
                representativeImage.description || representativeImage.title
              } (${eventImages.length} photos)`
            : representativeImage.description,
      });
    });

    // Add non-event images
    displayImages.push(...nonEventImages);

    // Sort by order_index and created_at
    return displayImages.sort((a, b) => {
      if (a.order_index !== b.order_index) {
        return a.order_index - b.order_index;
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  };

  useEffect(() => {
    if (sectionRef.current && galleryImages.length > 0) {
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
        }
      );
    }
  }, [galleryImages]);

  const openModal = async (
    clickedImageIndex: number,
    clickedImage: GalleryImage
  ) => {
    // If the clicked image belongs to an event, load all images from that event
    if (clickedImage.event_id) {
      const { data: eventImages } = await getEventGalleryImages(
        clickedImage.event_id
      );
      if (eventImages && eventImages.length > 0) {
        // Sort event images by order_index
        const sortedEventImages = eventImages.sort(
          (a, b) => a.order_index - b.order_index
        );
        setCurrentEventImages(sortedEventImages);
        // Find the index of the clicked image in the event collection
        const eventIndex = sortedEventImages.findIndex(
          (img) => img.id === clickedImage.id
        );
        setSelectedImageIndex(eventIndex >= 0 ? eventIndex : 0);
      } else {
        setCurrentEventImages([clickedImage]);
        setSelectedImageIndex(0);
      }
    } else {
      // For non-event images, just show the single image
      setCurrentEventImages([clickedImage]);
      setSelectedImageIndex(0);
    }

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setCurrentEventImages([]);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedImageIndex !== null && currentEventImages.length > 0) {
      setSelectedImageIndex(
        (selectedImageIndex + 1) % currentEventImages.length
      );
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null && currentEventImages.length > 0) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? currentEventImages.length - 1
          : selectedImageIndex - 1
      );
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImageIndex, currentEventImages]);

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

        {galleryImages.length === 0 ? (
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
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="gallery-item group cursor-pointer relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -5 }}
                onClick={() => openModal(index, image)}
              >
                <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.alt_text}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-google-sans font-semibold text-lg mb-1">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-200 mb-2">
                        {image.description}
                      </p>
                    )}
                    {image.event && (
                      <div className="flex items-center space-x-2 text-xs text-gray-300">
                        <span>{image.event.title}</span>
                        <span>•</span>
                        <span>
                          {new Date(image.event.date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event Badge */}
                  {image.event && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-google-blue/80 backdrop-blur-sm text-white text-xs rounded-full">
                        {image.event.title}
                      </span>
                    </div>
                  )}

                  {/* Multiple Images Indicator */}
                  {image.event_id && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
                        <ImageIcon size={12} />
                        <span>Album</span>
                      </div>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {image.featured && (
                    <div className="absolute bottom-4 right-4">
                      <span className="px-2 py-1 bg-google-yellow/80 backdrop-blur-sm text-white text-xs rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null &&
            currentEventImages[selectedImageIndex] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative max-w-6xl max-h-full w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Main Image */}
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={currentEventImages[selectedImageIndex].image_url}
                      alt={currentEventImages[selectedImageIndex].alt_text}
                      className="max-w-full max-h-[85vh] object-contain rounded-lg"
                    />
                  </div>

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <h3 className="text-xl font-google-sans font-semibold mb-2">
                      {currentEventImages[selectedImageIndex].title}
                    </h3>
                    {currentEventImages[selectedImageIndex].description && (
                      <p className="text-gray-200 mb-2">
                        {currentEventImages[selectedImageIndex].description}
                      </p>
                    )}
                    {currentEventImages[selectedImageIndex].event && (
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <span>
                          {currentEventImages[selectedImageIndex].event!.title}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(
                            currentEventImages[selectedImageIndex].event!.date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Navigation Controls */}
                  {currentEventImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                      >
                        <ChevronLeft size={24} />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Thumbnail Strip */}
                      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-md overflow-x-auto">
                        {currentEventImages.map((img, index) => (
                          <button
                            key={img.id}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                              index === selectedImageIndex
                                ? "border-white"
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={img.image_url}
                              alt={img.alt_text}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200"
                  >
                    <X size={24} />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm text-sm">
                    {selectedImageIndex + 1} / {currentEventImages.length}
                  </div>
                </motion.div>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
