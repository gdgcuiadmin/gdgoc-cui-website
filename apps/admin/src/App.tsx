import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import AdminDashboard from "./components/AdminDashboard";
import EventsManager from "./components/EventsManager";
import TeamManager from "./components/TeamManager";
import GalleryManager from "./components/GalleryManager";
import ResourcesManager from "./components/ResourcesManager";
import AdminLayout from "./components/AdminLayout";
import { getCurrentUser } from "./lib/supabase";
import { User } from "@supabase/supabase-js";
import AdminLogin from "./components/AdminLogin";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    // Initialize smooth scrolling and animations
    gsap.config({
      nullTargetWarn: false,
      trialWarn: false,
    });

    // Set up smooth scroll behavior
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1);
        const element = document.getElementById(targetId || "");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", smoothScroll);

    return () => {
      document.removeEventListener("click", smoothScroll);
    };
  }, []);

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
