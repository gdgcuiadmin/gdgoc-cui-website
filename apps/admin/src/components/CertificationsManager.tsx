import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Award,
  Upload,
  FileSpreadsheet,
  Users,
} from "lucide-react";
import { Event, CertificateAttendee } from "../lib/db";
import { useEvents } from "../hooks/EventsManagerHooks";
import {
  useCertificates,
  useCreateCertificate,
  useDeleteCertificate,
} from "../hooks/CertificationsManagerHooks";
import Modal from "./shared/Modal";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const CertificationsManager: React.FC = () => {
  const { data: events, isLoading: eventsLoading } = useEvents();
  const { data: certificates, isLoading: certsLoading } = useCertificates();
  const createMutation = useCreateCertificate();
  const deleteMutation = useDeleteCertificate();

  const [showForm, setShowForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [attendees, setAttendees] = useState<CertificateAttendee[]>([]);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [excelFileName, setExcelFileName] = useState("");
  const [templateFileName, setTemplateFileName] = useState("");
  const [uploading, setUploading] = useState(false);

  // Get only completed events that don't already have certificates
  const completedEvents = (events || []).filter(
    (e: Event) => e.status === "completed"
  );

  const availableEvents = completedEvents.filter(
    (e: Event) =>
      !certificates?.some((c) => c.event_id === e.id)
  );

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setExcelFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows: any[] = XLSX.utils.sheet_to_json(sheet);

        if (rows.length === 0) {
          toast.error("Excel file is empty");
          return;
        }

        // Try to find name and email columns (case-insensitive)
        const firstRow = rows[0];
        const keys = Object.keys(firstRow);

        const nameKey = keys.find((k) =>
          k.toLowerCase().includes("name")
        );
        const emailKey = keys.find((k) =>
          k.toLowerCase().includes("email") || k.toLowerCase().includes("mail")
        );

        if (!nameKey || !emailKey) {
          toast.error(
            "Excel must have columns containing 'name' and 'email' in headers"
          );
          return;
        }

        const parsed: CertificateAttendee[] = rows
          .filter((row) => row[nameKey] && row[emailKey])
          .map((row) => ({
            name: String(row[nameKey]).trim(),
            email: String(row[emailKey]).trim(),
          }));

        if (parsed.length === 0) {
          toast.error("No valid entries found in Excel file");
          return;
        }

        setAttendees(parsed);
        toast.success(`Found ${parsed.length} attendees`);
      } catch {
        toast.error("Failed to parse Excel file");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image/png") && !file.type.includes("image/jpeg")) {
      toast.error("Please upload a PNG or JPG template");
      return;
    }

    setTemplateFile(file);
    setTemplateFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEventId) {
      toast.error("Please select an event");
      return;
    }
    if (attendees.length === 0) {
      toast.error("Please upload an Excel file with attendees");
      return;
    }
    if (!templateFile) {
      toast.error("Please upload a PDF certificate template");
      return;
    }

    setUploading(true);

    try {
      // Read PDF as ArrayBuffer then encode to base64
      const templateBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const bytes = new Uint8Array(reader.result as ArrayBuffer);
          let binary = "";
          for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          resolve(btoa(binary));
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(templateFile);
      });

      const selectedEvent = events?.find(
        (e: Event) => e.id === selectedEventId
      );

      await createMutation.mutateAsync({
        event_id: selectedEventId,
        event_title: selectedEvent?.title || "",
        template_base64: templateBase64,
        attendees,
      });

      toast.success("Certificate configuration saved!");
      resetForm();
    } catch (error) {
      console.error("Error saving certificate:", error);
      toast.error("Failed to save certificate configuration");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this certificate configuration?")) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success("Certificate configuration deleted");
      } catch {
        toast.error("Failed to delete");
      }
    }
  };

  const resetForm = () => {
    setSelectedEventId("");
    setAttendees([]);
    setTemplateFile(null);
    setExcelFileName("");
    setTemplateFileName("");
    setShowForm(false);
  };

  if (eventsLoading || certsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-google-sans font-bold text-gray-900">
          Certifications Management
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-google-blue text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Certificate</span>
        </motion.button>
      </div>

      {/* Certificates List */}
      <div className="mt-6 grid gap-4">
        {certificates && certificates.length > 0 ? (
          certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-google-green/10 rounded-lg flex items-center justify-center">
                    <Award className="text-google-green" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cert.event_title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{cert.attendees.length} attendees</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FileSpreadsheet size={14} />
                        <span>Template uploaded</span>
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => handleDelete(cert.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Award className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No certificate configurations yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Add a certificate for a completed event
            </p>
          </div>
        )}
      </div>

      {/* Add Certificate Modal */}
      <Modal
        open={showForm}
        setOpen={(v) => { if (!v) resetForm(); }}
        reset={resetForm}
      >
        <h3 className="text-xl font-google-sans font-bold text-gray-900 mb-6">
          Add Certificate Configuration
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Event
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-google-blue focus:border-transparent"
              required
            >
              <option value="">Choose a completed event...</option>
              {availableEvents.map((event: Event) => (
                <option key={event.id} value={event.id}>
                  {event.title} — {event.date}
                </option>
              ))}
            </select>
            {availableEvents.length === 0 && (
              <p className="text-sm text-gray-400 mt-1">
                All completed events already have certificates configured.
              </p>
            )}
          </div>

          {/* Excel Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Attendees Excel File
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Excel should have columns with headers containing &quot;name&quot; and
              &quot;email&quot;
            </p>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-google-blue transition-colors bg-gray-50">
              <div className="text-center">
                <Upload className="mx-auto text-gray-400 mb-1" size={20} />
                <span className="text-sm text-gray-500">
                  {excelFileName || "Click to upload .xlsx file"}
                </span>
              </div>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelUpload}
                className="hidden"
              />
            </label>
            {attendees.length > 0 && (
              <p className="text-sm text-google-green mt-2">
                ✓ {attendees.length} attendees loaded
              </p>
            )}
          </div>

          {/* Template Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Certificate Template (PNG/JPG)
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Upload a PNG or JPG certificate template. The student&#39;s name will be
              printed in the center of the certificate.
            </p>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-google-green transition-colors bg-gray-50">
              <div className="text-center">
                <FileSpreadsheet
                  className="mx-auto text-gray-400 mb-1"
                  size={20}
                />
                <span className="text-sm text-gray-500">
                  {templateFileName || "Click to upload PNG/JPG template"}
                </span>
              </div>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                onChange={handleTemplateUpload}
                className="hidden"
              />
            </label>
            {templateFile && (
              <p className="text-sm text-google-green mt-2">
                ✓ Template selected
              </p>
            )}
          </div>

          {/* Attendees Preview */}
          {attendees.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attendees Preview (first 5)
              </label>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1 max-h-40 overflow-y-auto">
                {attendees.slice(0, 5).map((a, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>{a.name}</span>
                    <span className="text-gray-400">{a.email}</span>
                  </div>
                ))}
                {attendees.length > 5 && (
                  <p className="text-xs text-gray-400 pt-1">
                    ...and {attendees.length - 5} more
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              disabled={uploading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-google-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {uploading ? "Saving..." : "Save Certificate"}
            </motion.button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CertificationsManager;
