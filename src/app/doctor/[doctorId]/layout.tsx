import "@/app/globals.css";
import { MapProvider } from "@/providers/map-provider";

interface Props {
  params: Promise<{ doctorId: string }>;
}

export async function generateMetadata({ params }: Props) {
  let title = "";
  try {
    const res = await fetch(
      `${process.env.API_URL}/doctors/${(await params).doctorId}`
    );
    const data = await res.json();
    title = data.doctor.username;
  } catch (error) {
    console.log(error);
    title = `error`;
  }

  return {
    title: title,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-bg">
      <div className="container mx-auto">
        <MapProvider>{children}</MapProvider>
      </div>
    </div>
  );
}
