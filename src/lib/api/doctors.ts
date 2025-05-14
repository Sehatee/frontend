import axios from "axios";
//specialization?: string | ""
export const getAllDoctors = async () => {
  try {
    // if (specialization) {
    //   const res = await axios.get(
    //     `${process.env.API_URL}/doctors?specialization=${specialization}`
    //   );
    //   return res.data.doctors;
    // }
    const res = await axios.get(`http://localhost:4000/api/v1/doctors`);
    console.log('docs by api',res.data);
    return res.data.doctors;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
