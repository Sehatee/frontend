import "@/app/globals.css";

interface Props {
  params: Promise<{ appointmentId: string }>;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `appointment ${(await params).appointmentId}`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-bg  ">
      <div className="container mx-auto  ">{children}</div>
    </div>
  );
}
