import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  BookOpen,
  Code,
  Database,
  Smartphone,
  Cloud,
  Brain,
  Palette,
  Globe,
} from "lucide-react";
import { Resource } from "../lib/supabase";
import Modal from "./shared/Modal";
import {
  useResources,
  useCreateResource,
  useUpdateResource,
  useDeleteResource,
} from "../hooks/ResourcesManagerHooks";

const ResourcesManager: React.FC = () => {
  const { data: resources, isLoading } = useResources();
  const createMutation = useCreateResource();
  const updateMutation = useUpdateResource();
  const deleteMutation = useDeleteResource();

  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    category: "Learning Resources",
    icon: "BookOpen",
    color: "google-blue",
    order_index: 0,
    featured: false,
  });

  const categories = [
    "Android Development",
    "Web Development",
    "Flutter & Dart",
    "Cloud & DevOps",
    "AI & Machine Learning",
    "Learning Resources",
  ];

  const icons = [
    { name: "BookOpen", component: BookOpen },
    { name: "Code", component: Code },
    { name: "Database", component: Database },
    { name: "Smartphone", component: Smartphone },
    { name: "Cloud", component: Cloud },
    { name: "Brain", component: Brain },
    { name: "Palette", component: Palette },
    { name: "Globe", component: Globe },
    { name: "ExternalLink", component: ExternalLink },
  ];

  const colors = [
    { name: "google-blue", label: "Blue" },
    { name: "google-green", label: "Green" },
    { name: "google-yellow", label: "Yellow" },
    { name: "google-red", label: "Red" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingResource) {
        await updateMutation.mutateAsync({
          id: editingResource.id,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting resource:", error);
      }
    }
  };

  const toggleFeatured = async (resource: Resource) => {
    try {
      await updateMutation.mutateAsync({
        id: resource.id,
        data: { featured: !resource.featured },
      });
    } catch (error) {
      console.error("Error toggling featured status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      url: "",
      category: "Learning Resources",
      icon: "BookOpen",
      color: "google-blue",
      order_index: 0,
      featured: false,
    });
    setEditingResource(null);
    setShowForm(false);
  };

  const startEdit = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      name: resource.name,
      description: resource.description,
      url: resource.url,
      category: resource.category,
      icon: resource.icon,
      color: resource.color,
      order_index: resource.order_index,
      featured: resource.featured,
    });
    setShowForm(true);
  };

  const getIconComponent = (iconName: string) => {
    const icon = icons.find((i) => i.name === iconName);
    return icon ? icon.component : BookOpen;
  };

  // Group resources by category
  const groupedResources =
    resources?.reduce((acc, resource) => {
      if (!acc[resource.category]) {
        acc[resource.category] = [];
      }
      acc[resource.category].push(resource);
      return acc;
    }, {} as Record<string, Resource[]>) || {};

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
          Resources Management
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-google-blue text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Resource</span>
        </motion.button>
      </div>

      {/* Resources by Category */}
      <div className="space-y-8 mt-4">
        {Object.entries(groupedResources).map(
          ([category, categoryResources]) => (
            <div
              key={category}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-google-sans font-semibold text-gray-900 mb-4">
                {category} ({categoryResources.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryResources.map((resource) => {
                  const IconComponent = getIconComponent(resource.icon);

                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 bg-${resource.color}/10 rounded-lg flex items-center justify-center`}
                          >
                            <IconComponent
                              className={`w-5 h-5 text-${resource.color}`}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                              <span>{resource.name}</span>
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {resource.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-1">
                          <button
                            onClick={() => toggleFeatured(resource)}
                            className={`p-1 rounded transition-colors ${
                              resource.featured
                                ? "text-google-yellow"
                                : "text-gray-400 hover:text-google-yellow"
                            }`}
                            title={
                              resource.featured
                                ? "Remove from featured"
                                : "Add to featured"
                            }
                            disabled={updateMutation.isPending}
                          >
                            {resource.featured ? (
                              <Star
                                size={14}
                                className="text-google-yellow"
                                fill="currentColor"
                              />
                            ) : (
                              <Star size={14} />
                            )}
                          </button>
                          <button
                            onClick={() => startEdit(resource)}
                            className="p-1 text-gray-400 hover:text-google-blue transition-colors"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(resource.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-google-blue hover:underline"
                        >
                          <ExternalLink size={12} />
                          <span>Visit Resource</span>
                        </a>
                        <span>Order: {resource.order_index}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>

      {/* Resource Form Modal */}
      <Modal open={showForm} setOpen={setShowForm}>
        <h3 className="text-xl font-google-sans font-semibold mb-6">
          {editingResource ? "Edit Resource" : "Add New Resource"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resource Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <select
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              >
                {icons.map((icon) => (
                  <option key={icon.name} value={icon.name}>
                    {icon.name}
                  </option>
                ))}
              </select>
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
                {colors.map((color) => (
                  <option key={color.name} value={color.name}>
                    {color.label}
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
              Featured Resource (show prominently on website)
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
              {editingResource ? "Update Resource" : "Add Resource"}
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

export default ResourcesManager;
