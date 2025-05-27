import { CreateReview, UpdateReview } from "@/types/Review";
import showToast from "@/utils/showToast";
import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const createReview = async (
  token: string,
  id: string,
  data: CreateReview
) => {
  try {
    const res = await axios.post(
      `${baseUrl}/reviews/doctor/reviews/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "حدث خطأ"
    );
    return null;
  }
};
export const updateReview = async (
  token: string,
  id: string,
  data: UpdateReview
) => {
  try {
    const res = await axios.patch(`${baseUrl}/reviews/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "حدث خطأ"
    );
    return null;
  }
};

export const deleteReview = async (token: string, id: string) => {
  try {
    await axios.delete(`${baseUrl}/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "حدث خطأ"
    );
    return null;
  }
};
