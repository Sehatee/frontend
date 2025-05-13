"use client";
import { useUserStore } from "@/stores/user";
import { User } from "@/types/User";
import { useEffect } from "react";

export default function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  const { setUser } = useUserStore();
  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
}
