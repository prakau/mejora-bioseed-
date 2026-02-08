import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import OpportunitySection from './sections/OpportunitySection';
import ServicesSection from './sections/ServicesSection';
import OperationsSection from './sections/OperationsSection';
import TechnologySection from './sections/TechnologySection';
import ImpactSection from './sections/ImpactSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Global snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Cleanup on unmount
  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero - z-index: 10 */}
        <div className="relative z-10">
          <HeroSection />
        </div>
        
        {/* Section 2: Opportunity - z-index: 20 */}
        <div className="relative z-20">
          <OpportunitySection />
        </div>
        
        {/* Section 3: Services - z-index: 30 */}
        <div className="relative z-30">
          <ServicesSection />
        </div>
        
        {/* Section 4: Operations - z-index: 40 */}
        <div className="relative z-40">
          <OperationsSection />
        </div>
        
        {/* Section 5: Technology - z-index: 50 */}
        <div className="relative z-50">
          <TechnologySection />
        </div>
        
        {/* Section 6: Impact - z-index: 60 */}
        <div className="relative z-[60]">
          <ImpactSection />
        </div>
        
        {/* Section 7: Contact - z-index: 70 */}
        <div className="relative z-[70]">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}

export default App;
