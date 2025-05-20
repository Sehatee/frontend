import DoctorsPageClient from "../doctor/doctorPage";

async function getDoctors() {
  // Replace this with fetching data from your database or API
  return [
    {
      id: 1,
      name: "د. سامي إبراهيم",
      email: "sami@clinic.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      specialty: "أخصائي قلب",
      status: "نشط",
      employed: "2020/05/12",
    },
    {
      id: 2,
      name: "د. ليلى أحمد",
      email: "layla@clinic.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      specialty: "أخصائية عيون",
      status: "غير نشط",
      employed: "2021/09/23",
    },
    {
      id: 3,
      name: "د. يوسف علي",
      email: "yousef@clinic.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      specialty: "أخصائي أطفال",
      status: "نشط",
      employed: "2019/11/30",
    },
    {
      id: 4,
      name: "د. منى صالح",
      email: "mona@clinic.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      specialty: "أخصائية جلدية",
      status: "نشط",
      employed: "2022/02/15",
    },
  ];
}

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return <DoctorsPageClient doctors={doctors} />;
}

























