import Footer from "@/components/Footer";
import { Metadata } from "next";
import React from "react";
export const metadata : Metadata = {
  title: "Doctors",
  description: "About us page",
  
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
