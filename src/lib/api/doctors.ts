import axios from "axios";

export const getAllDoctors = async (specialization?: string | "ain") => {
  try {
    if (specialization) {
      const res = await axios.get(
        `${process.env.API_URL}/doctors?specialization=${specialization}`
      );
      return res.data.doctors;
    }
    const res = await axios.get(`${process.env.API_URL}/doctors`);

    return res.data.doctors;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
