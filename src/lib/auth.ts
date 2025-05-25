import showToast from "@/utils/showToast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

export const handleLogin = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    Cookies.set("token", res.data.token);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(error);
    console.log(axiosError.response?.data);
    showToast(
      "error",
      (axiosError.response?.data as { message: string })?.message ||
        "An error occurred"
    );
    return null;
  }
};
export const handleSignup = async (formdata: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  file: File | null;
}) => {
  if (!formdata.file) {
    showToast("error", "Please upload an avatar image");
    return null;
  }
  const data = new FormData();
  data.append("username", formdata.username);
  data.append("email", formdata.email);
  data.append("password", formdata.password);
  data.append("confirmPassword", formdata.confirmPassword);
  data.append("phone", formdata.phone);
  data.append("file", formdata.file);
  try {


    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      data
    );

    Cookies.set("token", res.data.token);
    

    return res.data;
  } catch (error) {
    console.log(error);
    //@ts-expect-error :fix agine
    showToast("error", error.response.data.message);
    throw error;
  }
};

export const handleLogout = () => {
  Cookies.remove("token");
  return null;
};
