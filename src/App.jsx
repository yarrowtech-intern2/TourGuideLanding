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

const HEADER_HEIGHT = 72;

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

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<div className="pt-[80px]"><About /></div>} />
        <Route path="/services" element={<div className="pt-[80px]"><Services /></div>} />
        <Route path="/faq" element={<div className="pt-[80px]"><FAQ /></div>} />
        <Route path="/become" element={<div className="pt-[80px]"><BecomePartner /></div>} />
      </Routes>

      <Footer />
    </div>
  );
}
