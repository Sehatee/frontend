"use client";
import { updateUserProfile } from "@/lib/api/profile";
import { User } from "@/types/User";
import { useTranslations } from "next-intl";
import React, { FormEvent, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import showToast from "@/utils/showToast";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const FormUpdateUser = ({ user }: { user: User }) => {
  const t = useTranslations("Profile");
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token") || undefined;
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone || "", // Since it's not in the user object
    specialization: user.specialization || "",
    description: user.description || "",
    location: {
      coordinates: user.location?.coordinates || [0, 0],
      address: user.location?.addrss || "",
    },
    workingDays: user.availableHours?.map((h) => h.day) || [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoordinatesChange = (field: "lat" | "lng", value: string) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: [
          field === "lat" ? Number(value) : prev.location.coordinates[0],
          field === "lng" ? Number(value) : prev.location.coordinates[1],
        ],
      },
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: e.target.value,
      },
    }));
  };
  const handleDayChange = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day as (typeof days)[number])
        ? prev.workingDays.filter((d) => d !== day)
        : [
            ...prev.workingDays,
            day as
              | "Sunday"
              | "Monday"
              | "v"
              | "Wednesday"
              | "Thursday"
              | "Friday"
              | "Saturday",
          ],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        ...(user.role === "doctor" && {
          specialization: formData.specialization,
          description: formData.description,
          location: {
            type: "Point" as const,
            coordinates: [
              formData.location.coordinates[0],
              formData.location.coordinates[1],
            ],
            addrss: formData.location.address,
          },
          availableHours: formData.workingDays.map((day) => ({
            day,
          })),
        }),
      };
      console.log(updateData)
      await updateUserProfile(updateData, token);

      showToast("success", t("profileUpdated"));
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("axios", axiosError);
      showToast(
        "error",
        (axiosError.response?.data as { message: string })?.message ||
          "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Update the coordinate inputs in the form
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white p-6 rounded-lg max-w-3xl mx-auto"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          {t("personalInfo.fullName")}
        </label>
        <div className="relative">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all duration-200 bg-gray-50/50"
          />
        </div>
      </div>

      {/* Update other input fields similarly */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          {t("personalInfo.email")}
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all duration-200 bg-gray-50/50 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          {t("personalInfo.phone")}
        </label>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("personalInfo.phonePlaceholder")}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all duration-200 bg-gray-50/50 placeholder-gray-400"
          />
        </div>
      </div>

      {user.role === "doctor" && (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("personalInfo.specialization")}
            </label>
            <div className="relative">
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder={t("personalInfo.specializationPlaceholder")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all duration-200 bg-gray-50/50 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("personalInfo.description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t("personalInfo.descriptionPlaceholder")}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all duration-200 bg-gray-50/50 placeholder-gray-400 resize-none"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("personalInfo.address")}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="address"
                placeholder={t("personalInfo.addressPlaceholder")}
                value={formData.location.address}
                onChange={handleAddressChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all duration-200 bg-gray-50/50 placeholder-gray-400"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">
                    {t("personalInfo.latitude")}{" "}
                    <span className="text-gray-400">(e.g., 36.7538)</span>
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.location.coordinates[0]}
                    onChange={(e) =>
                      handleCoordinatesChange("lat", e.target.value)
                    }
                    placeholder={t("personalInfo.latitude")}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all duration-200 bg-gray-50/50"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">
                    {t("personalInfo.longitude")}{" "}
                    <span className="text-gray-400">(e.g., 3.0588)</span>
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.location.coordinates[1]}
                    onChange={(e) =>
                      handleCoordinatesChange("lng", e.target.value)
                    }
                    placeholder={t("personalInfo.longitude")}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all duration-200 bg-gray-50/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Working Days */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              {t("personalInfo.workingDays")}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {days.map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.workingDays.includes(day)}
                    onChange={() => handleDayChange(day)}
                    className="w-4 h-4 text-main border-gray-300 rounded focus:ring-main"
                  />
                  <span className="text-sm text-gray-700">
                    {t(`days.${day.toLowerCase()}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-2.5 bg-main text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-main/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("updating")}
            </>
          ) : (
            t("editProfile")
          )}
        </button>
      </div>
    </form>
  );
};

export default FormUpdateUser;
