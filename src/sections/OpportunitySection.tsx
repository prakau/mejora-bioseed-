import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OpportunitySection = () => {
  const img = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const body = bodyRef.current;
    const circle = circleRef.current;
    const caption = captionRef.current;

    if (!section || !bg || !headline || !subheadline || !body || !circle || !caption) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1 — ENTRANCE (0%–30%)
      // Headline from left
      scrollTl.fromTo(
        headline,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Subheadline from left
      scrollTl.fromTo(
        subheadline,
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Body from left
      scrollTl.fromTo(
        body,
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // Circle from right
      scrollTl.fromTo(
        circle,
        { x: '45vw', scale: 0.85, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0.06
      );

      // Caption fades up
      scrollTl.fromTo(
        caption,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // Background micro-parallax during settle
      scrollTl.fromTo(
        bg,
        { y: 0 },
        { y: '-2vh', ease: 'none' },
        0.3
      );

      // Phase 3 — EXIT (70%–100%)
      // Headline exits left
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subheadline exits left
      scrollTl.fromTo(
        subheadline,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Body exits left
      scrollTl.fromTo(
        body,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      // Circle exits right
      scrollTl.fromTo(
        circle,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Caption exits
      scrollTl.fromTo(
        caption,
        { y: 0, opacity: 1 },
        { y: 10, opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Background scales
      scrollTl.fromTo(
        bg,
        { scale: 1, opacity: 1 },
        { scale: 1.05, opacity: 0.85, ease: 'none' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="opportunity"
      className="section-pinned bg-mejora-rust"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src={img('hero_farmland_aerial.jpg')}
          alt="Farmland"
          className="w-full h-full object-cover"
        />
        <div className="bg-overlay" />
      </div>

      {/* Left content block */}
      <div className="absolute left-[7vw] top-[18vh] w-[40vw]">
        {/* Headline */}
        <div ref={headlineRef}>
          <h2 className="font-display font-black uppercase text-mejora-cream headline-lg">
            <span className="block">A $950B</span>
            <span className="block text-mejora-gold">Compliance Market</span>
          </h2>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-8 font-body text-lg text-mejora-cream/90 leading-relaxed max-w-[34vw]"
        >
          Article 6.2 of the Paris Agreement creates a new class of sovereign-backed carbon assets.
        </p>

        {/* Body */}
        <p
          ref={bodyRef}
          className="mt-6 font-body text-base text-mejora-parchment/80 leading-relaxed max-w-[34vw]"
        >
          We originate ITMOs—Internationally Transferred Mitigation Outcomes—backed by Ghana's 
          authorization and designed for Singapore's compliance demand. While voluntary credits 
          trade at $5-15/ton, Article 6.2 ITMOs command $20-35/ton with mandatory demand.
        </p>
      </div>

      {/* Right circle card */}
      <div
        ref={circleRef}
        className="absolute right-[7vw] top-1/2 -translate-y-1/2 w-[34vmin] h-[34vmin] circle-mask shadow-card"
      >
        <img
          src={img('opportunity_hands_biochar.jpg')}
          alt="Hands holding biochar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Caption under circle */}
      <p
        ref={captionRef}
        className="absolute right-[7vw] top-[72vh] w-[28vw] font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/70"
      >
        High-integrity credits start with verifiable fieldwork.
      </p>
    </section>
  );
};

export default OpportunitySection;
