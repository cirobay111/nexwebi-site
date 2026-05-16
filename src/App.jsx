import './index.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ImpactBar from './components/ImpactBar';
import WhatsAppButton from './components/WhatsAppButton';
import ArticleModal from './components/ArticleModal';
import LegalModal from './components/LegalModal';
import Hero from './sections/Hero';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import Services from './sections/Services';
import WhyUs from './sections/WhyUs';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Blog from './sections/Blog';
import FAQ from './sections/FAQ';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [legalModal, setLegalModal] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#020817', color: '#e2e8f0' }}>
      <a
        href="#main-content"
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
        onFocus={e => { e.currentTarget.style.cssText = 'position:fixed;top:16px;left:16px;zIndex:9999;padding:8px 16px;borderRadius:8px;background:#22d3ee;color:#020817;fontWeight:600;fontSize:14px;'; }}
        onBlur={e => { e.currentTarget.style.cssText = 'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;'; }}
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
        <Process />
        <Testimonials />
        <Pricing />
        <Blog />
        <FAQ />
        <CTA />
        <Contact />
      </main>

      <Footer onLegal={setLegalModal} />
      <WhatsAppButton />
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </div>
  );
}
