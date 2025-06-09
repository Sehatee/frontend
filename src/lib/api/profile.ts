import showToast from "@/utils/showToast";
import axios, { AxiosError } from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateUserProfile = async (
  data: FormData,
  token: string | undefined
) => {
  try {
    const res = await axios.patch(`${baseUrl}/auth/me`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-dat",
      },
    });
    
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    // console.error("Update profile error:", error);
    throw axiosError;
  }
};
export const updatePassword = async (
  data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  },
  token: string
) => {
  try {
    const res = await axios.put(`${baseUrl}/auth/me/password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    showToast("success", "تم تحديث كلمة المرور بنجاح");

    
    return res.data.user;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "حدث خطأ"
    );
    throw axiosError;
  }
};
