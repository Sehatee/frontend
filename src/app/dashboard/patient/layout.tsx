
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-backgroundDashboards mt-16 py-3 ">
      <div className=" container mx-auto ">{children}</div>
      
    </div>
  );
}
