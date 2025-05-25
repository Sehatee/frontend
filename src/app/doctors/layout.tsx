import Footer from "@/components/Footer";
import { fetchUser } from "@/lib/fetchUser";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Doctors",
  description: "About us page",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   await fetchUser();
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
