import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Image,
  BookOpen,
} from "lucide-react";
import { getWebsiteStats } from "../lib/db";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    teamMembers: 0,
    galleryImages: 0,
    resources: 0,
    // contactSubmissions: 0,
    // newsletterSubscribers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const statsData = await getWebsiteStats();
    setStats(statsData);
    setLoading(false);
  };

  const statCards = [
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      color: "google-blue",
      bgColor: "bg-blue-50",
      change: `${stats.upcomingEvents} upcoming`,
    },
    {
      title: "Team Members",
      value: stats.teamMembers,
      icon: Users,
      color: "google-green",
      bgColor: "bg-green-50",
      change: "Active members",
    },
    {
      title: "Gallery Images",
      value: stats.galleryImages,
      icon: Image,
      color: "google-yellow",
      bgColor: "bg-yellow-50",
      change: "Total photos",
    },
    {
      title: "Resources",
      value: stats.resources,
      icon: BookOpen,
      color: "google-red",
      bgColor: "bg-red-50",
      change: "Developer tools",
    },
    // {
    //   title: "Contact Messages",
    //   value: stats.contactSubmissions,
    //   icon: Mail,
    //   color: "google-blue",
    //   bgColor: "bg-blue-50",
    //   change: "Total inquiries",
    // },
    // {
    //   title: "Newsletter Subscribers",
    //   value: stats.newsletterSubscribers,
    //   icon: UserPlus,
    //   color: "google-green",
    //   bgColor: "bg-green-50",
    //   change: "Active subscribers",
    // },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-google-blue/10 to-google-green/10 rounded-2xl p-6">
        <h1 className="text-2xl font-google-sans font-bold text-gray-900 mb-2">
          Welcome to GDG COMSATS Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage community website content, events, team members, and resources
          from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-xl p-6 border border-gray-100`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm`}
              >
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      {/*   <motion.div */}
      {/*     initial={{ opacity: 0, y: 20 }} */}
      {/*     animate={{ opacity: 1, y: 0 }} */}
      {/*     transition={{ delay: 0.5 }} */}
      {/*     className="bg-white rounded-xl p-6 shadow-lg border border-gray-100" */}
      {/*   > */}
      {/*     <h3 className="text-lg font-google-sans font-semibold text-gray-900 mb-4"> */}
      {/*       Quick Actions */}
      {/*     </h3> */}
      {/*     <div className="space-y-3"> */}
      {/*       <Link to="/events"> */}
      {/*         <button className="w-full text-left px-4 py-3 bg-google-blue/10 text-google-blue rounded-lg hover:bg-google-blue/20 transition-colors"> */}
      {/*           Create New Event */}
      {/*         </button> */}
      {/*       </Link> */}
      {/*       <Link to="team"> */}
      {/*         <button className="w-full text-left px-4 py-3 bg-google-green/10 text-google-green rounded-lg hover:bg-google-green/20 transition-colors"> */}
      {/*           Add Team Member */}
      {/*         </button> */}
      {/*       </Link> */}
      {/*       <Link to="gallery"> */}
      {/*         <button className="w-full text-left px-4 py-3 bg-google-yellow/10 text-google-yellow rounded-lg hover:bg-google-yellow/20 transition-colors"> */}
      {/*           Upload Gallery Image */}
      {/*         </button> */}
      {/*       </Link> */}
      {/*     </div> */}
      {/* </motion.div> */}
      {/* </div> */}
    </div>
  );
};

export default AdminDashboard;
