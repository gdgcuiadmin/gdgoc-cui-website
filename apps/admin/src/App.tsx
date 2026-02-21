import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import AdminDashboard from "./components/AdminDashboard";
import EventsManager from "./components/EventsManager";
import TeamManager from "./components/TeamManager";
import GalleryManager from "./components/GalleryManager";
import ResourcesManager from "./components/ResourcesManager";
import AdminLayout from "./components/AdminLayout";
import { getCurrentUser } from "./lib/db";
import { User } from "firebase/auth";
import AdminLogin from "./components/AdminLogin";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  };

  const handleLogin = () => {
    checkUser();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "events":
        return <EventsManager />;
      case "team":
        return <TeamManager />;
      case "gallery":
        return <GalleryManager />;
      case "resources":
        return <ResourcesManager />;
      default:
        return <AdminDashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </AdminLayout>
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
