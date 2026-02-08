import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OperationsSection = () => {
  const img = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const body = bodyRef.current;
    const circle = circleRef.current;
    const caption = captionRef.current;
    const stats = statsRef.current;

    if (!section || !bg || !headline || !subheadline || !body || !circle || !caption || !stats) return;

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
        { x: '-45vw', opacity: 0 },
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

      // Stats from left
      scrollTl.fromTo(
        stats,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.18
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

      // Stats exits
      scrollTl.fromTo(
        stats,
        { x: 0, opacity: 1 },
        { x: '-8vw', opacity: 0, ease: 'power2.in' },
        0.76
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
      id="operations"
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

      {/* Left content block */}
      <div className="absolute left-[7vw] top-[18vh] w-[44vw]">
        {/* Headline */}
        <div ref={headlineRef}>
          <h2 className="font-display font-black uppercase text-mejora-cream headline-lg">
            <span className="block">Ground</span>
            <span className="block text-mejora-gold">Operations</span>
          </h2>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-8 font-body text-lg text-mejora-cream/90 leading-relaxed max-w-[34vw]"
        >
          Enrollment, training, and long-term support—designed for smallholder realities.
        </p>

        {/* Body */}
        <p
          ref={bodyRef}
          className="mt-6 font-body text-base text-mejora-parchment/80 leading-relaxed max-w-[34vw]"
        >
          We partner with village leadership, map every plot with GPS precision, and stay 
          present—so farmers stay in the program and credits stay verifiable. Our local 
          team, led by professionals with 15+ years of Ghana agricultural experience, 
          builds trust through consistent engagement.
        </p>

        {/* Stats */}
        <div ref={statsRef} className="mt-8 flex gap-10">
          <div>
            <span className="font-display font-black text-4xl text-mejora-gold">477</span>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/60">
              Farmers Enrolled
            </p>
          </div>
          <div>
            <span className="font-display font-black text-4xl text-mejora-gold">60-90</span>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/60">
              Days to Enrollment
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
          src={img('operations_worker_closeup.jpg')}
          alt="Farmer with seedlings"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Caption under circle */}
      <p
        ref={captionRef}
        className="absolute right-[7vw] top-[72vh] w-[28vw] font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/70"
      >
        Local leadership + community agreements = retention that lasts.
      </p>
    </section>
  );
};

export default OperationsSection;
