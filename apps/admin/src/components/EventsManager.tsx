import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import { Event, uploadFile } from "../lib/db";
import Modal from "./shared/Modal";
import {
  useEvents,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
} from "../hooks/EventsManagerHooks";
import ImageInput from "./shared/ImageInput";
import TagsInput from "./shared/TagsInput";

const EventsManager: React.FC = () => {
  const { data: events, isLoading } = useEvents();
  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent();
  const deleteMutation = useDeleteEvent();

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    attendees: 0,
    status: "upcoming" as "upcoming" | "completed",
    color: "google-blue",
    tags: [] as string[],
    image_url: "",
    registration_url: "",
  });
  const [selectEventImage, setSelectedEventImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;

      if (selectEventImage) {
        imageUrl = await uploadFile(
          "images/gallery",
          selectEventImage,
          selectEventImage.name.replace(/\s+/g, "-").toLowerCase(),
        );
      }

      const data = {
        ...formData,
        image_url: imageUrl,
      };

      if (editingEvent) {
        await updateMutation.mutateAsync({
          id: editingEvent.id,
          data: data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      attendees: 0,
      status: "upcoming",
      color: "google-blue",
      tags: [],
      image_url: "",
      registration_url: "",
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const startEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      attendees: event.attendees,
      status: event.status,
      color: event.color,
      tags: event.tags,
      image_url: event.image_url || "",
      registration_url: event.registration_url || "",
    });
    setShowForm(true);
  };

  if (isLoading) {
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
          Events Management
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-google-blue text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Event</span>
        </motion.button>
      </div>

      {/* Events Grid */}
      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${event.status === "upcoming"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                  }`}
              >
                {event.status}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(event)}
                  className="text-gray-400 hover:text-google-blue transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 className="font-google-sans font-semibold text-lg text-gray-900 mb-2">
              {event.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar size={14} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={14} />
                <span>{event.attendees} attendees</span>
              </div>
              {event.status === "upcoming" && event.registration_url && (
                <div className="flex items-center space-x-2">
                  <LinkIcon size={14} />
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-google-blue hover:underline"
                  >
                    Registration Link
                  </a>
                </div>
              )}
              {event.status === "completed" && event.registration_url && (
                <div className="flex items-center space-x-2">
                  <LinkIcon size={14} />
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-google-blue hover:underline"
                  >
                    LinkedIn Post
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mt-4">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 text-xs rounded-full bg-${event.color}/10 text-${event.color}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Event Form Modal */}
      <Modal open={showForm} setOpen={setShowForm} reset={resetForm}>
        <h3 className="text-xl font-google-sans font-semibold mb-6">
          {editingEvent ? "Edit Event" : "Add New Event"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Image
            </label>
            <ImageInput
              selectedImage={selectEventImage}
              setSelectedImage={setSelectedEventImage}
              existingImage={formData.image_url}
              isRequired={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
                placeholder="e.g., 2:00 PM - 5:00 PM"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attendees
              </label>
              <input
                type="number"
                value={formData.attendees}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attendees: parseInt(e.target.value) || 0,
                  })
                }
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <select
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              >
                <option value="google-blue">Blue</option>
                <option value="google-green">Green</option>
                <option value="google-yellow">Yellow</option>
                <option value="google-red">Red</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "upcoming" | "completed",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {formData.status === "upcoming" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration URL (optional)
              </label>
              <input
                type="url"
                value={formData.registration_url}
                onChange={(e) =>
                  setFormData({ ...formData, registration_url: e.target.value })
                }
                placeholder="https://example.com/register"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>
          )}

          {formData.status === "completed" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Post URL (optional)
              </label>
              <input
                type="url"
                value={formData.registration_url}
                onChange={(e) =>
                  setFormData({ ...formData, registration_url: e.target.value })
                }
                placeholder="https://linkedin.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>
          )}

          <TagsInput
            tags={formData.tags}
            setTags={(tags) => setFormData({ ...formData, tags })}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-google-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {editingEvent ? "Update Event" : "Create Event"}
              {(createMutation.isPending || updateMutation.isPending) && (
                <span className="ml-2">...</span>
              )}
            </motion.button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventsManager;
