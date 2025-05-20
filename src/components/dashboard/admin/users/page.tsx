import UserPage from "../user/userPage";


async function getUsers() {
  // استبدل هذا بجلب البيانات من قاعدة البيانات أو API
  return [
    {
      id: 1,
      name: "أحمد علي",
      email: "ahmed@example.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      status: "نشط",
      employed: "2021/06/14",
    },
    {
      id: 2,
      name: "سارة محمد",
      email: "sara@example.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      status: "غير نشط",
      employed: "2022/01/10",
    },
    {
      id: 3,
      name: "خالد يوسف",
      email: "khaled@example.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      status: "نشط",
      employed: "2020/11/22",
    },
    {
      id: 4,
      name: "منى صالح",
      email: "mona@example.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      status: "غير نشط",
      employed: "2023/03/05",
    },
  ];
}

export default async function UsersPage() {
  const users = await getUsers();

  return <UserPage users={users} />;
}
