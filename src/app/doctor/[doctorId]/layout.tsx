import "@/app/globals.css";
import { MapProvider } from "@/providers/map-provider";

interface Props {
  params: Promise<{ doctorId: string }>;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `doctor ${(await params).doctorId}`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div  className="bg-bg">
      <div className="container mx-auto">
        <MapProvider>{children}</MapProvider>
      </div>
    </div>
  );
}
