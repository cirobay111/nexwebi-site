import './index.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import ImpactBar from './components/ImpactBar';
import WhatsAppButton from './components/WhatsAppButton';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import WhyUs from './sections/WhyUs';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Blog from './sections/Blog';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { useLanguage } from './i18n/index.jsx';

export default function App() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#020817] text-slate-200">
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-400 focus:text-[#020817] focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <ImpactBar />
        <Services />
        <Portfolio />
        <WhyUs />
        <Testimonials />
        <Blog />
        <Pricing />
        <CTA />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
