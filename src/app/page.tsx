import Services from "@/components/Home/Services";
import Header from "@/components/Home/Header";
import DoctorsTeam from "@/components/Home/DoctorsTeam";
import LastFeatures from "@/components/Home/LastFeatures";
import Footer from "@/components/Footer";
import InstallPrompt from "@/components/InstallPrompt";

export default function HomePage() {
  return (
    <>
      <div >
        <Header />
        <Services />
        <DoctorsTeam />
        <LastFeatures />
        <InstallPrompt />
      </div>
      <Footer />
    </>
  );
}
