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

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Destinations />
      <Partners />
      <FAQ />
      <ContactForm />
      <Floating />
    </main>
  );
}

export default function App() {
  return (
    <div className="font-sans scroll-smooth">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </div>
  );
}
