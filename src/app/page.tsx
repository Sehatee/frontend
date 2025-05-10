import Services from "@/components/Home/Services";
import Header from "@/components/Home/Header";
import DoctorsTeam from "@/components/Home/DoctorsTeam";
import Footer from "@/components/Footer";
import LastFeatures from "@/components/Home/LastFeatures";

export default function HomePage() {
  return (
    <>
      <div >
        <Header />
        <Services />
        <DoctorsTeam />
        <LastFeatures />
      </div>
      <Footer />
    </>
  );
}
