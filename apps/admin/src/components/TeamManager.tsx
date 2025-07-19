import { motion } from "framer-motion";
import {
  Edit,
  Eye,
  EyeOff,
  Github,
  Linkedin,
  Mail,
  Plus,
  Trash2,
  Twitter,
} from "lucide-react";
import React, { useState } from "react";
import { TeamMember, uploadFile } from "../lib/supabase";
import Modal from "./shared/Modal";
import {
  useCreateTeamMember,
  useDeleteTeamMember,
  useUpdateTeamMember,
  useTeamMembers,
} from "../hooks/TeamManagerHooks";

const TeamManager: React.FC = () => {
  const { data: teamMembers, isLoading } = useTeamMembers();
  const createMutation = useCreateTeamMember();
  const updateMutation = useUpdateTeamMember();
  const deleteMutation = useDeleteTeamMember();

  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    bio: "",
    image_url: "",
    linkedin_url: "",
    github_url: "",
    twitter_url: "",
    email: "",
    order_index: 0,
    active: true,
  });
  const [selectedMemberImage, setSelectedMemberImage] = useState<File | null>(
    null
  );
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;

      if (selectedMemberImage) {
        imageUrl = await uploadFile(
          "images/team",
          selectedMemberImage,
          // formData.name.replace(/\s+/g, "-").toLowerCase()
          selectedMemberImage.name.replace(/\s+/g, "-").toLowerCase()
        );
      }

      const memberData = {
        ...formData,
        image_url: imageUrl,
      };

      if (editingMember) {
        await updateMutation.mutateAsync({
          id: editingMember.id,
          data: memberData,
        });
      } else {
        await createMutation.mutateAsync(memberData);
      }

      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      setShowDeleteConfirm(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const toggleActive = async (member: TeamMember) => {
    try {
      await updateMutation.mutateAsync({
        id: member.id,
        data: { active: !member.active },
      });
    } catch (error) {
      console.error("Error toggling active status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      department: "",
      bio: "",
      image_url: "",
      linkedin_url: "",
      github_url: "",
      twitter_url: "",
      email: "",
      order_index: 0,
      active: true,
    });
    setEditingMember(null);
    setShowForm(false);
    setSelectedMemberImage(null);
  };

  const startEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      department: member.department,
      bio: member.bio,
      image_url: member.image_url,
      linkedin_url: member.linkedin_url || "",
      github_url: member.github_url || "",
      twitter_url: member.twitter_url || "",
      email: member.email || "",
      order_index: member.order_index,
      active: member.active,
    });
    setShowForm(true);
  };

  const confirmDelete = (id: string) => {
    setMemberToDelete(id);
    setShowDeleteConfirm(true);
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
          Team Management
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-google-blue text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Team Member</span>
        </motion.button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers?.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 ${
              !member.active ? "opacity-60" : ""
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  member.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {member.active ? "Active" : "Inactive"}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleActive(member)}
                  className="text-gray-400 hover:text-google-yellow transition-colors"
                  title={
                    member.active ? "Hide from website" : "Show on website"
                  }
                >
                  {member.active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => startEdit(member)}
                  className="text-gray-400 hover:text-google-blue transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => confirmDelete(member.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3">
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-google-sans font-semibold text-lg text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-google-blue font-medium mb-1">
                {member.position}
              </p>
              <p className="text-sm text-gray-500">{member.department}</p>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {member.bio}
            </p>

            <div className="flex justify-center space-x-3">
              {member.linkedin_url && (
                <Linkedin size={16} className="text-gray-400" />
              )}
              {member.github_url && (
                <Github size={16} className="text-gray-400" />
              )}
              {member.twitter_url && (
                <Twitter size={16} className="text-gray-400" />
              )}
              {member.email && <Mail size={16} className="text-gray-400" />}
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500">
                Order: {member.order_index}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Team Member Form Modal */}
      <Modal open={showForm} setOpen={setShowForm} reset={resetForm}>
        <h3 className="text-xl font-google-sans font-semibold mb-6">
          {editingMember ? "Edit Team Member" : "Add New Team Member"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
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
                Position
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              onChange={(e) => {
                setSelectedMemberImage(
                  e.target.files ? e.target.files[0] : null
                );
              }}
              required={!editingMember}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
            />
            {selectedMemberImage ? (
              <img
                src={URL.createObjectURL(selectedMemberImage)}
                alt="New Preview"
                className="mt-2 w-20 h-20 object-cover rounded-full"
              />
            ) : (
              formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Current"
                  className="mt-2 w-20 h-20 object-cover rounded-full"
                />
              )
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL (Optional)
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin_url: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL (Optional)
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) =>
                  setFormData({ ...formData, github_url: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter URL (Optional)
              </label>
              <input
                type="url"
                value={formData.twitter_url}
                onChange={(e) =>
                  setFormData({ ...formData, twitter_url: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.active ? "active" : "inactive"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    active: e.target.value === "active",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
              >
                <option value="active">Active (Show on website)</option>
                <option value="inactive">Inactive (Hide from website)</option>
              </select>
            </div>
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
              {editingMember ? "Update Member" : "Add Member"}
              {(createMutation.isPending || updateMutation.isPending) && (
                <span className="ml-2">...</span>
              )}
            </motion.button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={showDeleteConfirm}
        setOpen={setShowDeleteConfirm}
        reset={resetForm}
      >
        <div className="space-y-2">
          <h3 className="text-xl font-google-sans font-semibold mb-6">
            Delete Team Member
          </h3>
          <p>Are you sure you want to remove this member from the team?</p>
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
            onClick={() => memberToDelete && handleDelete(memberToDelete)}
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

export default TeamManager;
