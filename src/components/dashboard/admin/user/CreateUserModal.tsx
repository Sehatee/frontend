import React, { useState } from "react";
import { CreateUser, User } from "@/types/User";
import { AxiosError } from "axios";
import showToast from "@/utils/showToast";
import { createUser } from "@/lib/api/admin";
import Cookies from "js-cookie";
import Image from "next/image";
import Modal from "@/ui/Modal";
import Field from "@/ui/Field";

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
      showToast("error", "كلمات المرور غير متطابقة");
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
      showToast("error", "خطأ في معالجة الصورة");
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
    <Modal open={isOpen} onClose={onClose} title="Create New User">
      <form
        onSubmit={handleSubmit}
        className="max-h-[75vh] space-y-6 overflow-y-auto pe-2"
      >
        {/* Basic Information - Always Shown */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Username"
            name="username"
            id="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
          <Field
            label="Email"
            name="email"
            id="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/*password */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Password"
            name="password"
            id="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <Field
            label="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Field
              label="Picture URL"
              name="picture"
              id="picture"
              value={userData.picture}
              onChange={handleChange}
              placeholder="/imgs/userImg.jpg"
            />
            <div className="mt-2 flex justify-center p-4 border border-secondary rounded-xl bg-bg">
              <Image
                src={userData.picture || ""}
                width={100}
                height={100}
                alt="User profile"
                className="h-28 w-28 rounded-full object-cover border-4 border-white shadow"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Field
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              value={userData.phone}
              onChange={handleChange}
            />
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-ft">
                Role
              </label>
              <select
                name="role"
                id="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value as User["role"]);
                  handleChange(e);
                }}
                className="w-full rounded-xl border border-secondary bg-bg px-4 py-3 text-ft focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30"
                required
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-ft">
            Location
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field
              label="Address"
              name="addrss"
              id="addrss"
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
              required
            />
            <Field
              label="Latitude"
              name="latitude"
              id="latitude"
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
              required
              placeholder="e.g. 31.9539"
            />
            <Field
              label="Longitude"
              name="longitude"
              id="longitude"
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
              required
              placeholder="e.g. 35.9496"
            />
          </div>
        </div>

        {/* Doctor-specific fields */}
        {role === "doctor" && (
          <div className="space-y-5 bg-secondary border border-secondary/60 p-6 rounded-2xl">
            <div className="space-y-2">
              <Field
                label="Specialization"
                name="specialization"
                id="specialization"
                value={userData.specialization}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-ft mb-2">
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
                    className="inline-flex gap-3 items-center bg-white p-3 rounded-xl border border-secondary hover:border-main transition-colors"
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
                      className="rounded border-secondary text-main shadow-sm focus:border-main focus:ring-main/30 h-5 w-5"
                    />
                    <span className="text-sm font-medium text-ft">
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-ft"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={userData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-xl border border-secondary bg-bg px-4 py-3 text-ft placeholder:text-ft2/70 focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30"
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-secondary">
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Create User
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
