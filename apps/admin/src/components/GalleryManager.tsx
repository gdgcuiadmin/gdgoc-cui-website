import { motion } from "framer-motion";
import {
  Calendar,
  Edit,
  Image as ImageIcon,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { GalleryImage, uploadFile } from "../lib/supabase";
import Modal from "./shared/Modal";
import {
  useGalleryImages,
  useCreateGalleryImage,
  useUpdateGalleryImage,
  useDeleteGalleryImage,
  DeleteParams,
} from "../hooks/GalleryManagerHooks.js";
import { useEvents } from "../hooks/EventsManagerHooks.js";

const GalleryManager: React.FC = () => {
  const { data: galleryImages, isLoading: isLoadingImages } =
    useGalleryImages();
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const createMutation = useCreateGalleryImage();
  const updateMutation = useUpdateGalleryImage();
  const deleteMutation = useDeleteGalleryImage();

  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<File | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    alt_text: "",
    event_id: null,
    category: "workshops",
    order_index: 0,
    featured: false,
  });
  const [imageToDelete, setImageToDelete] = useState<DeleteParams | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;

      if (selectedGalleryImage) {
        imageUrl = await uploadFile(
          "images/gallery",
          selectedGalleryImage,
          // formData.title.replace(/\s+/g, "-").toLowerCase()
          selectedGalleryImage.name.replace(/\s+/g, "-").toLowerCase()
        );
      }

      const imageData = {
        ...formData,
        image_url: imageUrl,
      };

      if (editingImage) {
        await updateMutation.mutateAsync({
          id: editingImage.id,
          data: imageData,
        });
        console.log("image data", imageData);
      } else {
        console.log("Creating");
        await createMutation.mutateAsync(imageData);
        console.log("Image created: ", imageData);
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async () => {
    if (!imageToDelete) return;

    try {
      await deleteMutation.mutateAsync(imageToDelete);
      setShowDeleteConfirm(false);
      setImageToDelete(null);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const confirmDelete = (id: string, fileName: string) => {
    setImageToDelete({ id, fileName });
    setShowDeleteConfirm(true);
  };

  const toggleFeatured = async (image: GalleryImage) => {
    try {
      await updateMutation.mutateAsync({
        id: image.id,
        data: { featured: !image.featured },
      });
    } catch (error) {
      console.error("Error toggling featured status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      alt_text: "",
      event_id: null,
      category: "",
      order_index: 0,
      featured: false,
    });
    setEditingImage(null);
    setShowForm(false);
    setSelectedGalleryImage(null);
  };

  const startEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description || "",
      image_url: image.image_url,
      alt_text: image.alt_text,
      event_id: image.event_id || null,
      category: image.category,
      order_index: image.order_index,
      featured: image.featured,
    });
    setShowForm(true);
  };

  // Group images by event
  const imagesByEvent =
    galleryImages?.reduce((acc, image) => {
      const eventId = image.event_id || "no-event";
      if (!acc[eventId]) {
        acc[eventId] = [];
      }
      acc[eventId].push(image);
      return acc;
    }, {} as Record<string, GalleryImage[]>) || {};

  if (isLoadingImages || isLoadingEvents) {
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
          Gallery Management
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-google-blue text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Image</span>
        </motion.button>
      </div>

      {/* Gallery by Events */}
      <div className="space-y-8 mt-4">
        {Object.entries(imagesByEvent).map(([eventKey, images]) => {
          const event =
            eventKey !== "no-event"
              ? events?.find((e) => e.id === eventKey)
              : null;

          return (
            <div
              key={eventKey}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {event ? (
                    <>
                      <Calendar className="text-google-blue" size={20} />
                      <div>
                        <h3 className="text-lg font-google-sans font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()} •{" "}
                          {images.length} images
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="text-gray-500" size={20} />
                      <div>
                        <h3 className="text-lg font-google-sans font-semibold text-gray-900">
                          Unlinked Images
                        </h3>
                        <p className="text-sm text-gray-500">
                          Not linked to specific events • {images.length} images
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={image.image_url}
                        alt={image.alt_text}
                        className="w-full h-32 object-cover"
                      />

                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                        <button
                          onClick={() => toggleFeatured(image)}
                          className={`p-1.5 rounded-full transition-colors ${
                            image.featured
                              ? "bg-google-yellow text-white"
                              : "bg-white/20 text-white hover:bg-google-yellow"
                          }`}
                          title={
                            image.featured
                              ? "Remove from featured"
                              : "Add to featured"
                          }
                          disabled={updateMutation.isPending}
                        >
                          <Star size={14} />
                        </button>
                        <button
                          onClick={() => startEdit(image)}
                          className="p-1.5 bg-white/20 text-white rounded-full hover:bg-google-blue transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() =>
                            confirmDelete(
                              image.id,
                              image.image_url.split("/").pop() || ""
                            )
                          }
                          className="p-1.5 bg-white/20 text-white rounded-full hover:bg-red-500 transition-colors"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Featured badge */}
                      {image.featured && (
                        <div className="absolute top-2 right-2">
                          <Star
                            size={12}
                            className="text-google-yellow"
                            fill="currentColor"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
                        {image.title}
                      </h4>
                      {image.description && (
                        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                          {image.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Order: {image.order_index}</span>
                        <span>
                          {new Date(image.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Image Form Modal */}
      <Modal open={showForm} setOpen={setShowForm} reset={resetForm}>
        <h3 className="text-xl font-google-sans font-semibold mb-6">
          {editingImage ? "Edit Image" : "Add New Image"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Title
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
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedGalleryImage(
                  e.target.files ? e.target.files[0] : null
                )
              }
              required={!editingImage}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
            {selectedGalleryImage ? (
              <img
                src={URL.createObjectURL(selectedGalleryImage)}
                alt="New Preview"
                className="mt-2 w-20 h-20 object-cover rounded-lg"
              />
            ) : (
              formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Current"
                  className="mt-2 w-20 h-20 object-cover rounded-lg"
                />
              )
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt Text (for accessibility)
            </label>
            <input
              type="text"
              value={formData.alt_text}
              onChange={(e) =>
                setFormData({ ...formData, alt_text: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link to Event
            </label>
            <select
              value={formData.event_id}
              onChange={(e) =>
                setFormData({ ...formData, event_id: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            >
              <option value="">Select an event (optional)</option>
              {events
                ?.filter((event) => event.status !== "completed")
                .map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title} ({new Date(event.date).toLocaleDateString()})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.order_index}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  order_index: parseInt(e.target.value) || 0,
                })
              }
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="rounded border-gray-300 text-google-blue focus:ring-google-blue"
            />
            <label
              htmlFor="featured"
              className="text-sm font-medium text-gray-700"
            >
              Featured Image (main thumbnail for event)
            </label>
          </div>

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
              {editingImage ? "Update Image" : "Add Image"}
              {(createMutation.isPending || updateMutation.isPending) && (
                <span className="ml-2">...</span>
              )}
            </motion.button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteConfirm} setOpen={setShowDeleteConfirm}>
        <div className="space-y-2">
          <h3 className="text-xl font-google-sans font-semibold mb-6">
            Delete Image
          </h3>
          <p>Are you sure you want to permanently delete this image?</p>
          <p className="text-sm text-gray-500">This action cannot be undone.</p>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleDelete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-colors"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Confirm Delete"}
          </motion.button>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryManager;
