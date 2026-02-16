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

function HomePage() {
  return (
    // ✅ ADD THIS padding-top (same as header height)
    <main className="pt-[96px] overflow-x-hidden">
      <Hero />
      <About />
      <Services />
      <Destinations />
      <Activities />
      <Partners />
      <FAQ />
      <ContactForm />
      <Floating />
    </main>
  );
}

export default function App() {
  return (
    <div className="font-sans overflow-x-hidden">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Optional Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/become" element={<BecomePartner />} />
      </Routes>

      <Footer />
    </div>
  );
}
