import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Image,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  Mail,
} from "lucide-react";
import { getCurrentUser, signOut } from "../lib/db";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
}) => {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar },
    { id: "team", label: "Team Members", icon: Users },
    { id: "gallery", label: "Gallery", icon: Image },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "certifications", label: "Certifications", icon: Award },
    // { id: 'contact', label: 'Contact & Subscribers', icon: Mail },
    // { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen font-google-sans bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <img
            src="/Horizontal - Light.png"
            alt="GDG Logo"
            className="cursor-pointer"
            onClick={() => onTabChange("dashboard")}
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setSidebarOpen(false);
              }}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${activeTab === item.id
                  ? "bg-google-blue/10 text-google-blue border-r-2 border-google-blue"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <motion.button
            onClick={handleSignOut}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white fixed z-50 w-full lg:w-[calc(100%-16rem)] shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu size={20} />
          </button>

          <div className="w-full flex justify-between max-md:ml-6">
            <h1 className="text-xl font-google-sans font-semibold text-gray-900 capitalize">
              {activeTab === "dashboard"
                ? "Dashboard"
                : activeTab === "contact"
                  ? "Contact & Subscribers"
                  : activeTab}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome back, {user?.email?.split("@")[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 pt-20">{children}</div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
