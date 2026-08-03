"use client";
import { updateUserProfile } from "@/lib/api/profile";
import { User } from "@/types/User";
import { useTranslations } from "next-intl";
import React, { FormEvent, useState } from "react";
import {
  Loader2,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  Upload,
  User as UserIcon,
} from "lucide-react";
import showToast from "@/utils/showToast";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import Image from "next/image";
import Field from "@/ui/Field";

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
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.picture || null
  );
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone || "",
    specialization: user.specialization || "",
    description: user.description || "",
    location: {
      coordinates: user.location?.coordinates || [0, 0],
      address: user.location?.addrss || "",
    },
    workingDays: user.availableHours?.map((h) => h.day) || [],
    file: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
              | "Tuesday"
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
      const data = new FormData();

      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      if (formData.file) {
        data.append("file", formData.file);
      }

      if (user.role === "doctor") {
        data.append("specialization", formData.specialization);
        data.append("description", formData.description);

        const locationData = {
          type: "Point",
          coordinates: [
            formData.location.coordinates[0],
            formData.location.coordinates[1],
          ],
          addrss: formData.location.address,
        };
        data.append("location", JSON.stringify(locationData));

        const availableHours = formData.workingDays.map((day) => ({ day }));
        data.append("availableHours", JSON.stringify(availableHours));
      }

      await updateUserProfile(data, token);
      showToast("success", t("profileUpdated"));
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("axios", axiosError);
      showToast(
        "error",
        (axiosError.response?.data as { message: string })?.message ||
          "حدث خطأ"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-3xl border border-secondary bg-white p-8 shadow-sm"
    >
      {/* Avatar upload field */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-32 w-32 overflow-hidden rounded-full bg-secondary">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Avatar preview"
              width={150}
              height={150}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Upload className="h-8 w-8 text-ft2" />
            </div>
          )}
        </div>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-sm font-medium text-main transition hover:underline"
        >
          {t("personalInfo.uploadPicture") || "Upload Picture"}
        </label>
      </div>

      <Field
        id="username"
        label={t("personalInfo.fullName")}
        icon={UserIcon}
        type="text"
        name="username"
        value={formData.username}
        onChange={(e) => handleChange(e)}
      />

      <Field
        id="email"
        label={t("personalInfo.email")}
        icon={Mail}
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => handleChange(e)}
      />

      <Field
        id="phone"
        label={t("personalInfo.phone")}
        icon={Phone}
        type="tel"
        name="phone"
        value={formData.phone}
        placeholder={t("personalInfo.phonePlaceholder")}
        onChange={(e) => handleChange(e)}
      />

      {user.role === "doctor" && (
        <>
          <Field
            id="specialization"
            label={t("personalInfo.specialization")}
            icon={Stethoscope}
            type="text"
            name="specialization"
            value={formData.specialization}
            placeholder={t("personalInfo.specializationPlaceholder")}
            onChange={(e) => handleChange(e)}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-ft">
              {t("personalInfo.description")}
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t("personalInfo.descriptionPlaceholder")}
              rows={4}
              className="w-full resize-none rounded-xl border border-secondary bg-bg px-4 py-3 text-ft placeholder:text-ft2/70 transition focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-ft">
              {t("personalInfo.address")}
            </span>
            <Field
              id="address"
              icon={MapPin}
              type="text"
              name="address"
              placeholder={t("personalInfo.addressPlaceholder")}
              value={formData.location.address}
              onChange={handleAddressChange}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field
                id="latitude"
                label={t("personalInfo.latitude")}
                type="number"
                name="latitude"
                value={formData.location.coordinates[0]}
                onChange={(e) =>
                  handleCoordinatesChange("lat", e.target.value)
                }
                placeholder={t("personalInfo.latitude")}
              />
              <Field
                id="longitude"
                label={t("personalInfo.longitude")}
                type="number"
                name="longitude"
                value={formData.location.coordinates[1]}
                onChange={(e) =>
                  handleCoordinatesChange("lng", e.target.value)
                }
                placeholder={t("personalInfo.longitude")}
              />
            </div>
          </div>

          {/* Working Days */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-ft">
              {t("personalInfo.workingDays")}
            </span>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {days.map((day) => {
                const checked = formData.workingDays.includes(day);
                return (
                  <label
                    key={day}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition-colors ${
                      checked
                        ? "border-main bg-secondary font-medium text-main"
                        : "border-secondary bg-bg text-ft2 hover:bg-secondary"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleDayChange(day)}
                      className="h-4 w-4 rounded border-secondary text-main focus:ring-2 focus:ring-main/30"
                    />
                    <span>{t(`days.${day.toLowerCase()}`)}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="mt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
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
