import SkipLink from './components/SkipLink';
import Navbar from './components/Navbar';
import TopBanner from './components/TopBanner';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import ComparisonBanner from './components/ComparisonBanner';
import Bestsellers from './components/Bestsellers';
import Collections from './components/Collections';
import InstagramGallery from './components/InstagramGallery';
import TrustBadges from './components/TrustBadges';
import WhyChoose from './components/WhyChoose';
import Heritage from './components/Heritage';
import SocialProof from './components/SocialProof';
import Testimonials from './components/Testimonials';
import KeyStats from './components/KeyStats';
import HowItWorks from './components/HowItWorks';
import QuoteCalculator from './components/QuoteCalculator';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import EmailButton from './components/EmailButton';
import ScrollToTop from './components/ScrollToTop';
import StickyCTA from './components/StickyCTA';

function App() {
  return (
    <div className="min-h-screen">
      <SkipLink />
      <TopBanner />
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <Hero />
        <TrustedBy />
        <ComparisonBanner />
        <Bestsellers />
        <Collections />
        <InstagramGallery />
        <TrustBadges />
        <WhyChoose />
        <Heritage />
        <SocialProof />
        <Testimonials />
        <KeyStats />
        <HowItWorks />
        <QuoteCalculator />
        <Pricing />
        <FAQ />
        <ContactForm />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <EmailButton />
      <ScrollToTop />
      <StickyCTA />
    </div>
  );
}

export default App;
