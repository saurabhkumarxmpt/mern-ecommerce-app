import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfileAPI } from "../services/UserServices";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await updateProfileAPI(formData);
      updateUser(res.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-md rounded-sm">

        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-green-600">
              My Profile
            </h2>
            <p className="text-sm text-gray-500">
              Update your personal details
            </p>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-sm font-medium ${
              user?.role === "admin"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {user?.role?.toUpperCase()}
          </span>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-6 px-6 py-6">

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-200 rounded-sm px-4 py-2 text-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-200 rounded-sm px-4 py-2 text-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-200 rounded-sm px-4 py-2 text-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border border-gray-200 rounded-sm px-4 py-2 text-gray-700 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Joined Date */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Member Since
            </label>
            <div className="border border-gray-200 rounded-sm px-4 py-2 text-gray-600 bg-gray-50">
              {new Date(user?.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">

          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-sm hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-5 py-2 text-sm bg-green-600 text-white rounded-sm hover:bg-green-700 transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 text-sm bg-green-600 text-white rounded-sm hover:bg-green-700 transition"
            >
              Edit Profile
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
