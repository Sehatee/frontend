import React, { useState } from "react";
import { CreateUser, User } from "@/types/User";
import { AxiosError } from "axios";
import showToast from "@/utils/showToast";
import { createUser } from "@/lib/api/admin";
import Cookies from "js-cookie";
import Image from "next/image";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [role, setRole] = useState<User["role"]>("patient");
  const [userData, setUserData] = useState<Partial<CreateUser>>({
    username: "",
    email: "",
    phone: "",
    role: "patient",
    description: "",
    active: true,
    specialization: "",
    availableHours: [],
    picture: "/imgs/userImg.png",
    password: "123",
    confirmPassword: "123",
    location: {
      type: "Point",
      coordinates: [34.22222, 3.12212212],
      addrss: "djelfa",
    },
  });
  const token = Cookies.get("token");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }

    const formData = new FormData();

    // Add basic user information
    formData.append("username", userData.username || "");
    formData.append("email", userData.email || "");
    formData.append("phone", userData.phone || "");
    formData.append("role", userData.role || "");
    formData.append("description", userData.description || "");
    formData.append("active", String(userData.active));
    formData.append("password", userData.password || "");
    formData.append("confirmPassword", userData.confirmPassword || "");

    formData.append("location", JSON.stringify(userData.location));
    // Handle image file
    try {
      const response = await fetch(userData.picture || "");
      const blob = await response.blob();
      const file = new File([blob], "profile.png", { type: "image/png" });
      formData.append("file", file);
    } catch (error) {
      console.error("Error converting image URL to file:", error);
      showToast("error", "Error processing image");
      return;
    }

    // Add doctor-specific information if role is doctor
    if (userData.role === "doctor") {
      formData.append("specialization", userData.specialization || "");
      formData.append(
        "availableHours",
        JSON.stringify(userData.availableHours)
      );
    }
    try {
      await createUser(formData, token || "");
    } catch (error) {
      const axiosError = error as AxiosError;

      console.log(axiosError.response?.data);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-12  z-50  ">
      <div className="bg-white   rounded-xl shadow-2xl p-8 h-screen  overflow-y-scroll">
        <h2 className="text-3xl font-bold my-6 text-blue-600 border-b pb-4">
          Create New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information - Always Shown */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                required
              />
            </div>
          </div>
          {/*password */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Picture URL
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  name="picture"
                  value={userData.picture}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                  placeholder="/imgs/userImg.jpg"
                />
                <div className="mt-2 flex justify-center p-4 border rounded-lg bg-gray-50">
                  <Image
                    src={userData.picture || ""}
                    width={100}
                    height={100}
                    alt="User profile"
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value as User["role"]);
                  handleChange(e);
                }}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                required
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Location
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="addrss"
                  
                  value={userData.location?.addrss}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location!,
                        addrss: e.target.value,
                      },
                    }));
                  }}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  
                  step="any"
                  value={userData.location?.coordinates[0] || ""}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location!,
                        coordinates: [
                          parseFloat(e.target.value),
                          prev.location?.coordinates[1] || 0,
                        ],
                      },
                    }));
                  }}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                  required
                  placeholder="e.g. 31.9539"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  
                  value={userData.location?.coordinates[1] || ""}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location!,
                        coordinates: [
                          prev.location?.coordinates[0] || 0,
                          parseFloat(e.target.value),
                        ],
                      },
                    }));
                  }}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                  required
                  placeholder="e.g. 35.9496"
                />
              </div>
            </div>
          </div>

          {/* Doctor-specific fields */}
          {role === "doctor" && (
            <div className="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={userData.specialization}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Available Days
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((day) => (
                    <label
                      key={day}
                      className="inline-flex gap-3 items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
                    >
                      <input
                        type="checkbox"
                        value={day}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setUserData((prev) => ({
                            ...prev,
                            availableHours: isChecked
                              ? [
                                  ...(prev.availableHours || []),
                                  {
                                    day: day,
                                  },
                                ]
                              : prev.availableHours?.filter(
                                  (h) => h.day !== day
                                ) || [],
                          }));
                        }}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-5 w-5"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {day}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={userData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 gap-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
