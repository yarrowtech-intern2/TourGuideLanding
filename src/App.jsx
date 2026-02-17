import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Services from "./Components/Services";
import Destinations from "./Components/Destination";
import Partners from "./Components/Partners";
import FAQ from "./Components/FAQ";
import ContactForm from "./Components/Contact";
import Floating from "./Components/Floating";
import Activities from "./Components/Activities";
import BecomePartner from "./Components/BecomePartner";

const HEADER_HEIGHT = 96;

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Destinations />
      <Activities />
      <Partners />
      <FAQ />
      <ContactForm />
      <Floating />
    </>
  );
}

export default function App() {
  return (
    <div className="font-sans">
      <Header />

      {/* ✅ THIS FIXES HEADER OVERLAP */}
      <div style={{ paddingTop: HEADER_HEIGHT }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/become" element={<BecomePartner />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
