import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ExternalLink,
  BookOpen,
  Code,
  Database,
  Smartphone,
  Cloud,
  Brain,
  Palette,
  Globe,
  ChevronRight,
} from "lucide-react";
import { getResources, Resource } from "../lib/supabase";

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState("Android Development");
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    const { data, error } = await getResources();
    if (data && !error) {
      setResources(data);
      // Set first category as active if resources exist
      if (data.length > 0) {
        const categories = [...new Set(data.map((r) => r.category))];
        setActiveCategory(categories[0]);
      }
    }
    setLoading(false);
  };

  // Group resources by category
  const groupedResources = resources.reduce(
    (acc, resource) => {
      if (!acc[resource.category]) {
        acc[resource.category] = [];
      }
      acc[resource.category].push(resource);
      return acc;
    },
    {} as Record<string, Resource[]>,
  );

  const categories = Object.keys(groupedResources);

  // Icon mapping
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      BookOpen,
      Code,
      Database,
      Smartphone,
      Cloud,
      Brain,
      Palette,
      Globe,
      ExternalLink,
    };
    return icons[iconName] || ExternalLink;
  };

  // Category icons and colors
  const getCategoryConfig = (category: string) => {
    const configs: Record<
      string,
      { icon: React.ComponentType<any>; color: string; gradient: string }
    > = {
      "Android Development": {
        icon: Smartphone,
        color: "google-green",
        gradient: "from-green-400 to-green-600",
      },
      "Web Development": {
        icon: Globe,
        color: "google-blue",
        gradient: "from-blue-400 to-blue-600",
      },
      "Flutter & Dart": {
        icon: Code,
        color: "google-yellow",
        gradient: "from-yellow-400 to-yellow-600",
      },
      "Cloud & DevOps": {
        icon: Cloud,
        color: "google-red",
        gradient: "from-red-400 to-red-600",
      },
      "AI & Machine Learning": {
        icon: Brain,
        color: "google-green",
        gradient: "from-purple-400 to-purple-600",
      },
      "Learning Resources": {
        icon: BookOpen,
        color: "google-blue",
        gradient: "from-indigo-400 to-indigo-600",
      },
    };
    return (
      configs[category] || {
        icon: BookOpen,
        color: "google-blue",
        gradient: "from-blue-400 to-blue-600",
      }
    );
  };

  if (loading) {
    return (
      <section
        id="resources"
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="loading-spinner mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading resources...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="resources"
      ref={ref}
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
            Developer <span className="text-google-blue">Resources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore Google's comprehensive suite of developer tools and
            platforms to accelerate your journey in technology.
          </p>
        </motion.div>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-google-sans font-semibold text-gray-600 mb-2">
              Resources Coming Soon
            </h3>
            <p className="text-gray-500">
              We're curating the best developer resources for you!
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Category Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex overflow-x-auto scrollbar-hide">
                {categories.map((category, index) => {
                  const config = getCategoryConfig(category);
                  const IconComponent = config.icon;
                  const isActive = activeCategory === category;

                  return (
                    <motion.button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-shrink-0 flex items-center space-x-3 px-6 py-4 font-medium text-sm transition-all duration-300 border-b-2 ${
                        isActive
                          ? `text-${config.color} border-${config.color} bg-white`
                          : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-white/50"
                      }`}
                    >
                      <IconComponent size={18} />
                      <span className="whitespace-nowrap">{category}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className={`w-2 h-2 rounded-full bg-${config.color}`}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Resources Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-4 mb-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getCategoryConfig(activeCategory).gradient} flex items-center justify-center shadow-lg`}
                    >
                      {React.createElement(
                        getCategoryConfig(activeCategory).icon,
                        {
                          size: 28,
                          className: "text-white",
                        },
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-google-sans font-bold text-gray-900">
                        {activeCategory}
                      </h3>
                      <p className="text-gray-600">
                        {groupedResources[activeCategory]?.length || 0}{" "}
                        resources available
                      </p>
                    </div>
                  </div>

                  {/* Resources Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupedResources[activeCategory]?.map(
                      (resource, index) => {
                        const IconComponent = getIcon(resource.icon);

                        return (
                          <motion.a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{
                              scale: 1.02,
                              y: -4,
                              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden"
                          >
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                              <IconComponent
                                size={128}
                                className={`text-${resource.color}`}
                              />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-4">
                                <div
                                  className={`w-12 h-12 rounded-xl bg-${resource.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                >
                                  <IconComponent
                                    className={`w-6 h-6 text-${resource.color}`}
                                  />
                                </div>

                                <div className="flex items-center space-x-2">
                                  {resource.featured && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="px-2 py-1 bg-google-yellow/20 text-google-yellow text-xs rounded-full font-medium"
                                    >
                                      Featured
                                    </motion.div>
                                  )}
                                  <ExternalLink
                                    size={16}
                                    className="text-gray-400 group-hover:text-google-blue transition-colors"
                                  />
                                </div>
                              </div>

                              <h4 className="font-google-sans font-semibold text-lg text-gray-900 mb-2 group-hover:text-google-blue transition-colors">
                                {resource.name}
                              </h4>

                              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {resource.description}
                              </p>

                              {/* Hover Arrow */}
                              <div className="flex items-center text-google-blue opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                                <span className="text-sm font-medium mr-2">
                                  Explore Tool
                                </span>
                                <ChevronRight size={16} />
                              </div>
                            </div>

                            {/* Hover Gradient */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r from-${resource.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />
                          </motion.a>
                        );
                      },
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-google-blue/10 via-google-green/10 to-google-yellow/10 rounded-3xl p-8">
            <h3 className="text-2xl font-google-sans font-semibold text-gray-900 mb-4">
              Need More Resources?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our community to get access to exclusive resources, study
              materials, and hands-on workshops.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-google-blue text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-blue-600 transition-colors"
              >
                Join Study Groups
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open(
                    "https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/",
                    "_blank",
                  )
                }
                className="border-2 border-google-green text-google-green px-8 py-3 rounded-full font-medium hover:bg-google-green hover:text-white transition-all duration-300"
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

export default Resources;
