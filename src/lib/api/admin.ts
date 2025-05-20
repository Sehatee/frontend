import { AxiosError } from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const getAllUsers = async (token: string) => {
  try {
    const res = await fetch(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(error);
    console.log(axiosError.response?.data);

    return null;
  }
};
