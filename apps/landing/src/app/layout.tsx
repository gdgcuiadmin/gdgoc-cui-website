import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GDG COMSATS - Google Developer Groups",
  description:
    "Google Developer Groups COMSATS University Islamabad, Lahore Campus. Join Pakistan's most active tech community for workshops, hackathons, and developer events.",
  keywords: [
    "Google Developer Groups",
    "GDG COMSATS",
    "COMSATS University",
    "Lahore Campus",
    "Developer Community",
    "Tech Events",
    "Android Development",
    "Flutter Workshops",
    "Firebase Bootcamp",
    "Machine Learning",
    "AI Workshops",
    "Hackathons",
    "Google Technologies",
    "Student Developers",
    "Tech Community Pakistan",
    "Programming Workshops",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "TensorFlow",
    "Kotlin",
    "Dart Programming",
  ],
  authors: [{ name: "GDG COMSATS Team", url: "https://gdgcomsats.vercel.app" }],
  creator: "GDG COMSATS Team",
  openGraph: {
    title: "GDG COMSATS - Building the Future of Technology Together",
    description:
      "Join COMSATS University's premier tech community. Learn, collaborate, and innovate with Google's cutting-edge technologies through workshops, hackathons, and community events.",
    url: "https://gdgcomsats.vercel.app",
    siteName: "GDG COMSATS",
    images: [
      {
        url: "https://gdgcomsats.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "GDG COMSATS - Google Developer Groups at COMSATS University Lahore",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG COMSATS - Google Developer Groups",
    description:
      "Join COMSATS University's premier tech community for workshops, hackathons, and developer events with Google technologies.",
    creator: "@gdgcomsats",
    site: "@gdgcomsats",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: "GDG COMSATS",
    statusBarStyle: "default",
  },
  applicationName: "GDG COMSATS",
  publisher: "Google Developer Groups COMSATS",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  referrer: "no-referrer-when-downgrade",
  alternates: {
    canonical: "https://gdgcomsats.vercel.app",
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "GDG COMSATS Events Feed" },
      ],
      "application/atom+xml": [
        { url: "/atom.xml", title: "GDG COMSATS News Feed" },
      ],
    },
  },
  category: "Technology",
  classification: "Education, Technology, Developer Community",
  // other: {
  //   "google-site-verification": "",
  //   "msvalidate.01": "",
  //   "facebook-domain-verification": "",
  // },
  // verification: {
  //   google: "",
  //   yandex: "",
  //   yahoo: "",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-google-sans  antialiased`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
