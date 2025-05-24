import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export const fetchUser = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) return null;
  try {
    const res = await axios.get(`${process.env.API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.user;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError;
  }
};
