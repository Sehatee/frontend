import "@/app/globals.css";

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
  return <div>{children}</div>;
}
