export const getDoctor = async (doctorId: string) => {
  try {
    const res = await fetch(`${process.env.API_URL}/doctors/${doctorId}`);
    const data = await res.json();

    return data.doctor;
  } catch (error) {
    console.log(error);
    return null;
  }
};
