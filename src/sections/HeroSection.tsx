import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const circle = circleRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;

    if (!section || !bg || !circle || !headline || !cta) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ delay: 0.2 });

      // Background fades in
      loadTl.fromTo(
        bg,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        0
      );

      // Circle mask scales up
      loadTl.fromTo(
        circle,
        { scale: 0.65, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0.15
      );

      // Headline lines rise
      const headlineLines = headline.querySelectorAll('.headline-line');
      loadTl.fromTo(
        headlineLines,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        0.55
      );

      // CTA fades in
      loadTl.fromTo(
        cta,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.85
      );

      // Scroll-driven exit animation (pinned)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([bg, circle, ...headlineLines, cta], {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            });
          },
        },
      });

      // Phase 1 (0-30%): Hold - elements already visible from load animation

      // Phase 2 (30-70%): Settle - static viewing

      // Phase 3 (70-100%): Exit
      // Circle exits
      scrollTl.fromTo(
        circle,
        { scale: 1, x: 0, opacity: 1 },
        { scale: 0.72, x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Headline exits
      scrollTl.fromTo(
        headlineLines,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
        0.7
      );

      // CTA exits
      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: '-5vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Background scales slightly
      scrollTl.fromTo(
        bg,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.85, ease: 'none' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToApproach = () => {
    const element = document.getElementById('opportunity');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-mejora-rust"
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero_farmland_aerial.jpg"
          alt="Farmland aerial view"
          className="w-full h-full object-cover"
        />
        <div className="bg-overlay" />
      </div>

      {/* Center circle mask */}
      <div
        ref={circleRef}
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[62vmin] h-[62vmin] circle-mask"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero_farmland_aerial.jpg"
          alt="Farmland portal"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute left-1/2 top-[78vh] -translate-x-1/2 text-center"
      >
        <h1 className="font-display font-black uppercase text-mejora-cream headline-xl">
          <span className="headline-line block">Carbon Removal</span>
          <span className="headline-line block mt-2">Rooted in Farmland</span>
        </h1>
      </div>

      {/* CTA */}
      <button
        ref={ctaRef}
        onClick={scrollToApproach}
        className="absolute left-1/2 top-[90vh] -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
        style={{ opacity: 0 }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-mejora-cream/80 group-hover:text-mejora-gold transition-colors">
          Explore our approach
        </span>
        <ChevronDown className="w-5 h-5 text-mejora-cream/60 group-hover:text-mejora-gold transition-colors animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
