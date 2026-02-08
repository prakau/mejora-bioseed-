import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const img = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const circle = circleRef.current;
    const caption = captionRef.current;

    if (!section || !bg || !label || !headline || !body || !circle || !caption) return;

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
      // Label from top
      scrollTl.fromTo(
        label,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline from left
      scrollTl.fromTo(
        headline,
        { x: '-45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
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
        0.08
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
      // Label exits
      scrollTl.fromTo(
        label,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Headline exits left
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Body exits left
      scrollTl.fromTo(
        body,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.72
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
      className="section-pinned bg-mejora-rust"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src={img('operations_field_workers.jpg')}
          alt="Field workers"
          className="w-full h-full object-cover"
        />
        <div className="bg-overlay" />
      </div>

      {/* Label */}
      <span
        ref={labelRef}
        className="absolute left-[7vw] top-[12vh] label-text text-mejora-gold"
      >
        What We Do
      </span>

      {/* Left content block */}
      <div className="absolute left-[7vw] top-[20vh] w-[46vw]">
        {/* Headline */}
        <div ref={headlineRef}>
          <h2 className="font-display font-black uppercase text-mejora-cream headline-lg">
            <span className="block">Biochar</span>
            <span className="block text-mejora-gold">Production</span>
          </h2>
        </div>

        {/* Body */}
        <p
          ref={bodyRef}
          className="mt-10 font-body text-base text-mejora-parchment/80 leading-relaxed max-w-[36vw]"
        >
          We convert farm waste into stable carbon through pyrolysis and apply it as a 
          soil amendment—improving yields while locking away CO₂ for centuries. Biochar 
          provides immediate carbon removal credits, generating cash flow while our 
          agroforestry plantings mature.
        </p>

        {/* Dual revenue highlight */}
        <div className="mt-8 flex gap-8">
          <div>
            <span className="font-display font-bold text-3xl text-mejora-gold">Year 1</span>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/60">
              Biochar Revenue
            </p>
          </div>
          <div>
            <span className="font-display font-bold text-3xl text-mejora-gold">Year 5+</span>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/60">
              Agroforestry Credits
            </p>
          </div>
        </div>
      </div>

      {/* Right circle card */}
      <div
        ref={circleRef}
        className="absolute right-[7vw] top-1/2 -translate-y-1/2 w-[34vmin] h-[34vmin] circle-mask shadow-card"
      >
        <img
          src={img('services_biochar_pile.jpg')}
          alt="Biochar pile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Caption under circle */}
      <p
        ref={captionRef}
        className="absolute right-[7vw] top-[72vh] w-[28vw] font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/70"
      >
        Agroforestry + biochar = durable removal + long-term sequestration.
      </p>
    </section>
  );
};

export default ServicesSection;
