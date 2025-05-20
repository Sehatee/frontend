import BannedUsersPageClient from "../banned-user/userPage";

// دالة جلب بيانات المستخدمين المحظورين (يمكنك تعديلها لاحقًا للربط مع API)
async function getBannedUsers() {
  // هنا يجب جلب البيانات من قاعدة البيانات أو API
  return [
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed@email.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      bannedDate: "2023/12/01",
      status: "محظور",
      reason: "مخالفة الشروط",
    },
    {
      id: "2",
      name: "سارة علي",
      email: "sara@email.com",
      avatar: "/imgs/doctorsteam/d3.jpg",
      bannedDate: "2024/01/15",
      status: "محظور",
      reason: "إساءة الاستخدام",
    },
  ];
}

export default async function BannedUsersPage() {
  const bannedUsers = await getBannedUsers();

  return <BannedUsersPageClient bannedUsers={bannedUsers} />;
}