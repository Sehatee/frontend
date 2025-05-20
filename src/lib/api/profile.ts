import { updateUser } from "@/types/User";
import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateUserProfile = async (data: updateUser, token: string | undefined) => {
  try {
    const res = await axios.patch(`${baseUrl}/auth/me`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    // console.error("Update profile error:", error);
    throw axiosError;
  }
};
