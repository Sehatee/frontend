export const getAllDoctors = async (
  specialization?: string,
  search?: string
) => {
  try {
    if (specialization && search) {
      
      const res = await fetch(
        `${process.env.API_URL}/doctors?specialization=${specialization}&query=${search}`
      );
      const data = await res.json();
      return data.doctors;
    }
    if (specialization) {
      const res = await fetch(
        `${process.env.API_URL}/doctors?specialization=${specialization}`
      );
      const data = await res.json();
      return data.doctors;
    }

    if (search) {
      const res = await fetch(`${process.env.API_URL}/doctors?query=${search}`);
      const data = await res.json();
      return data.doctors;
    }

    const res = await fetch(`${process.env.API_URL}/doctors`);
    const data = await res.json();
    return data.doctors;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
