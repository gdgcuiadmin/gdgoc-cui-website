import React from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";

const Resources: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const resources = [
    {
      category: "Android Development",
      icon: Smartphone,
      color: "google-green",
      items: [
        {
          name: "Android Studio",
          url: "https://developer.android.com/studio",
          description: "Official IDE for Android development",
        },
        {
          name: "Kotlin Documentation",
          url: "https://kotlinlang.org/docs/",
          description: "Learn Kotlin programming language",
        },
        {
          name: "Android Developers",
          url: "https://developer.android.com/",
          description: "Official Android development resources",
        },
        {
          name: "Material Design",
          url: "https://material.io/",
          description: "Google's design system for Android",
        },
      ],
    },
    {
      category: "Web Development",
      icon: Code,
      color: "google-blue",
      items: [
        {
          name: "Firebase",
          url: "https://firebase.google.com/",
          description: "Backend-as-a-Service platform",
        },
        {
          name: "Angular",
          url: "https://angular.io/",
          description: "TypeScript-based web framework",
        },
        {
          name: "Chrome DevTools",
          url: "https://developers.google.com/web/tools/chrome-devtools",
          description: "Web development debugging tools",
        },
        {
          name: "Web.dev",
          url: "https://web.dev/",
          description: "Modern web development guidance",
        },
      ],
    },
    {
      category: "Flutter & Dart",
      icon: Palette,
      color: "google-yellow",
      items: [
        {
          name: "Flutter",
          url: "https://flutter.dev/",
          description: "UI toolkit for cross-platform apps",
        },
        {
          name: "Dart Language",
          url: "https://dart.dev/",
          description: "Programming language for Flutter",
        },
        {
          name: "Flutter Widgets",
          url: "https://flutter.dev/docs/development/ui/widgets",
          description: "Complete widget catalog",
        },
        {
          name: "Flutter Codelabs",
          url: "https://flutter.dev/docs/codelabs",
          description: "Hands-on Flutter tutorials",
        },
      ],
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      color: "google-red",
      items: [
        {
          name: "Google Cloud Platform",
          url: "https://cloud.google.com/",
          description: "Cloud computing services",
        },
        {
          name: "Kubernetes",
          url: "https://kubernetes.io/",
          description: "Container orchestration platform",
        },
        {
          name: "Cloud Functions",
          url: "https://cloud.google.com/functions",
          description: "Serverless computing platform",
        },
        {
          name: "App Engine",
          url: "https://cloud.google.com/appengine",
          description: "Platform-as-a-Service offering",
        },
      ],
    },
    {
      category: "AI & Machine Learning",
      icon: Brain,
      color: "google-green",
      items: [
        {
          name: "TensorFlow",
          url: "https://tensorflow.org/",
          description: "Open-source ML framework",
        },
        {
          name: "AI Platform",
          url: "https://cloud.google.com/ai-platform",
          description: "Google's ML platform",
        },
        {
          name: "ML Kit",
          url: "https://developers.google.com/ml-kit",
          description: "ML for mobile developers",
        },
        {
          name: "Colab",
          url: "https://colab.research.google.com/",
          description: "Cloud-based Jupyter notebooks",
        },
      ],
    },
    {
      category: "Learning Resources",
      icon: BookOpen,
      color: "google-blue",
      items: [
        {
          name: "Google Developers",
          url: "https://developers.google.com/",
          description: "Official Google developer resources",
        },
        {
          name: "Google Tech Dev Guide",
          url: "https://techdevguide.withgoogle.com/",
          description: "Structured learning paths",
        },
        {
          name: "Coursera Courses",
          url: "https://www.coursera.org/google",
          description: "Google's online courses",
        },
        {
          name: "YouTube Developers",
          url: "https://www.youtube.com/user/GoogleDevelopers",
          description: "Video tutorials and talks",
        },
      ],
    },
  ];

  return (
    <section id="resources" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-google-sans font-bold text-gray-900 mb-6">
            Developer <span className="text-google-blue">Resources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore Google's comprehensive suite of developer tools, platforms,
            and learning resources to accelerate your journey in technology and
            innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resources.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 bg-${category.color}/10 rounded-xl flex items-center justify-center mr-4`}
                >
                  <category.icon className={`w-6 h-6 text-${category.color}`} />
                </div>
                <h3 className="text-xl font-google-sans font-semibold text-gray-900">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: categoryIndex * 0.1 + itemIndex * 0.05,
                      duration: 0.4,
                    }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-start p-4 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 border border-gray-100 hover:border-gray-200 group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-google-blue transition-colors">
                          {item.name}
                        </h4>
                        <ExternalLink
                          size={14}
                          className="ml-2 text-gray-400 group-hover:text-google-blue transition-colors"
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-google-blue/5 via-google-green/5 to-google-yellow/5 rounded-3xl p-8">
            <h3 className="text-2xl font-google-sans font-semibold text-gray-900 mb-4">
              Need More Resources?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team is constantly curating the best learning materials and
              tools. Join our community to get access to exclusive resources and
              study materials.
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
                  Join our Group
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border-2 border-google-green text-green-600 px-8 py-3 rounded-full font-medium hover:bg-google-green hover:text-white transition-all duration-300"
              >
                Request Resources
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;
