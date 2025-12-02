import { lazy, Suspense } from 'react';
import SkipLink from './components/SkipLink';
import Navbar from './components/Navbar';
import TopBanner from './components/TopBanner';
import AnimatedHero from './components/AnimatedHero';
import VelocityHero from './components/VelocityHero';

// Lazy load below-the-fold components
const ComparisonBanner = lazy(() => import('./components/ComparisonBanner'));
const ColorsSection = lazy(() => import('./components/ColorsSection'));
const ComfortSection = lazy(() => import('./components/ComfortSection'));
const PlatformsSection = lazy(() => import('./components/PlatformsSection'));
const Bestsellers = lazy(() => import('./components/Bestsellers'));
const Collections = lazy(() => import('./components/Collections'));
const InstagramGallery = lazy(() => import('./components/InstagramGallery'));
const TrustBadges = lazy(() => import('./components/TrustBadges'));
const WhyChoose = lazy(() => import('./components/WhyChoose'));
const Heritage = lazy(() => import('./components/Heritage'));
const SocialProof = lazy(() => import('./components/SocialProof'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const KeyStats = lazy(() => import('./components/KeyStats'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const QuoteCalculator = lazy(() => import('./components/QuoteCalculator'));
const Pricing = lazy(() => import('./components/Pricing'));
const FAQ = lazy(() => import('./components/FAQ'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
const EmailButton = lazy(() => import('./components/EmailButton'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const StickyCTA = lazy(() => import('./components/StickyCTA'));

const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-champagne/30 border-t-champagne rounded-full animate-spin" />
  </div>
);

import CustomCursor from './components/ui/CustomCursor';

import GlobalSpotlight from './components/GlobalSpotlight';

function App() {
  return (
    <div className="bg-sable-light min-h-screen text-noir selection:bg-champagne selection:text-white">
      <GlobalSpotlight />
      <SkipLink />
      <TopBanner />
      <header>
        <Navbar />
      </header>
      <main id="main-content">
        <section id="hero">
          <VelocityHero />
        </section>

        <Suspense fallback={<SectionLoader />}>
          <ComparisonBanner />
          <ColorsSection />
          <ComfortSection />
          <PlatformsSection />
          <Bestsellers />

          <section id="collections">
            <Collections />
          </section>

          <QuoteCalculator />
          <InstagramGallery />
          <TrustBadges />

          <section id="avantages">
            <WhyChoose />
          </section>

          <section id="savoir-faire">
            <Heritage />
          </section>

          <SocialProof />
          <Testimonials />
          <KeyStats />
          <HowItWorks />

          <section id="tarifs">
            <Pricing />
          </section>

          <FAQ />

          <section id="contact">
            <ContactForm />
          </section>

          <CTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <WhatsAppButton />
        <EmailButton />
        <ScrollToTop />
        <StickyCTA />
      </Suspense>
    </div>
  );
}

export default App;
