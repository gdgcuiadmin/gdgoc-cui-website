"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Mail, Download, Search } from "lucide-react";
import {
  getEventCertificates,
  findAttendeeByEmail,
  EventCertificate,
} from "@/lib/db";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const Certifications: React.FC = () => {
  const [certificates, setCertificates] = useState<EventCertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "searching" | "found" | "not-found" | "generating" | "error"
  >("idle");
  const [foundName, setFoundName] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      const result = await getEventCertificates();
      setCertificates(result.data || []);
      setLoading(false);
    };
    fetchCertificates();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEventId || !email.trim()) return;

    setStatus("searching");

    const cert = certificates.find((c) => c.event_id === selectedEventId);
    if (!cert) {
      setStatus("not-found");
      return;
    }

    const attendee = findAttendeeByEmail(cert, email);

    if (attendee) {
      setFoundName(attendee.name);
      setStatus("found");
    } else {
      setStatus("not-found");
    }
  };

  const generateCertificate = async () => {
    const cert = certificates.find((c) => c.event_id === selectedEventId);
    if (!cert) return;

    setStatus("generating");

    try {
      // Decode base64 PNG template stored in Firestore
      const base64 = cert.template_base64.includes(",")
        ? cert.template_base64.split(",")[1]
        : cert.template_base64;

      const binaryString = atob(base64);
      const templateBytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        templateBytes[i] = binaryString.charCodeAt(i);
      }

      // Create a new PDF, embed the image as full-page background
      // Auto-detect PNG vs JPEG from header bytes
      const pdfDoc = await PDFDocument.create();
      const isPng =
        templateBytes[0] === 0x89 &&
        templateBytes[1] === 0x50 &&
        templateBytes[2] === 0x4e &&
        templateBytes[3] === 0x47;
      const image = isPng
        ? await pdfDoc.embedPng(templateBytes)
        : await pdfDoc.embedJpg(templateBytes);
      const { width, height } = image;
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, { x: 0, y: 0, width, height });

      // Draw name — large, bold, centered on the certificate
      const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

      // Target 75% of certificate width, start at 120pt, min 72pt
      const targetWidth = width * 0.75;
      let fontSize = 120;
      let textWidth = font.widthOfTextAtSize(foundName, fontSize);

      if (textWidth > targetWidth) {
        fontSize = Math.max(72, Math.floor((targetWidth / textWidth) * fontSize));
        textWidth = font.widthOfTextAtSize(foundName, fontSize);
      }

      const textHeight = font.heightAtSize(fontSize);

      page.drawText(foundName, {
        x: (width - textWidth) / 2,
        y: (height / 2) - (textHeight / 2),
        size: fontSize,
        font,
        color: rgb(0.12, 0.12, 0.12),
      });

      // Save and download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate-${foundName.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setStatus("found");
    } catch (error) {
      console.error("Error generating certificate:", error);
      setStatus("error");
    }
  };

  const resetSearch = () => {
    setEmail("");
    setStatus("idle");
    setFoundName("");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-google-green/10 rounded-2xl mb-4">
            <Award className="text-google-green" size={32} />
          </div>
          <h1 className="text-4xl font-google-sans font-bold text-gray-900 mb-4">
            Event Certificates
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Select the event you attended and enter your registered email to
            download your participation certificate.
          </p>
        </motion.div>

        {/* Certificate Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
        >
          {certificates.length === 0 ? (
            <div className="text-center py-8">
              <Award className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500">
                No certificates are available at this time.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSearch} className="space-y-6">
              {/* Event Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Event
                </label>
                <select
                  value={selectedEventId}
                  onChange={(e) => {
                    setSelectedEventId(e.target.value);
                    resetSearch();
                  }}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-google-blue focus:border-transparent transition-all"
                  required
                >
                  <option value="">Choose an event...</option>
                  {certificates.map((cert) => (
                    <option key={cert.event_id} value={cert.event_id}>
                      {cert.event_title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Registered Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== "idle") setStatus("idle");
                    }}
                    placeholder="Enter the email you registered with"
                    className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-gray-700 focus:ring-2 focus:ring-google-blue focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                type="submit"
                disabled={status === "searching" || !selectedEventId || !email}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-google-blue text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Search size={18} />
                <span>
                  {status === "searching"
                    ? "Searching..."
                    : "Search Certificate"}
                </span>
              </motion.button>
            </form>
          )}

          {/* Status Messages */}
          {status === "found" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl"
            >
              <div className="text-center">
                <Award className="mx-auto text-google-green mb-3" size={40} />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Certificate Found!
                </h3>
                <p className="text-gray-600 mb-4">
                  Hello <span className="font-semibold">{foundName}</span>, your
                  certificate is ready to download.
                </p>
                <motion.button
                  onClick={generateCertificate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-google-green text-white px-8 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors inline-flex items-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download Certificate</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {status === "generating" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl text-center"
            >
              <div className="w-8 h-8 border-4 border-google-blue border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Generating your certificate...</p>
            </motion.div>
          )}

          {status === "not-found" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-red-50 border border-red-200 rounded-xl text-center"
            >
              <p className="text-red-600 font-medium">Certificate not found</p>
              <p className="text-gray-500 text-sm mt-1">
                This email is not registered for the selected event. Please
                check your email and try again.
              </p>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-red-50 border border-red-200 rounded-xl text-center"
            >
              <p className="text-red-600 font-medium">
                Error generating certificate
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Something went wrong. Please try again later.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
