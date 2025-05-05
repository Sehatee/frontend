import Services from "@/components/Home/Services";
import Header from "@/components/Home/Header";
import DoctorsTeam from "@/components/Home/DoctorsTeam";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <div className="container mx-auto ">
        <Header />
        <Services />
        <DoctorsTeam />
      </div>
      <Footer />
    </>
  );
}
