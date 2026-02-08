import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImpactSection = () => {
  const img = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const intro = introRef.current;
    const metrics = metricsRef.current;
    const cards = cardsRef.current;

    if (!section || !label || !headline || !intro || !metrics || !cards) return;

    const ctx = gsap.context(() => {
      // Label animation
      gsap.fromTo(
        label,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Headline animation
      gsap.fromTo(
        headline,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Intro animation
      gsap.fromTo(
        intro,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Metrics animation with stagger
      const metricItems = metrics.querySelectorAll('.metric-item');
      gsap.fromTo(
        metricItems,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: metrics,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cardItems = cards.querySelectorAll('.impact-card');
      gsap.fromTo(
        cardItems,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { value: '477', label: 'Farmers Enrolled', description: 'In the first 90 days of operations.' },
    { value: '2,000+', label: 'Hectares Target', description: 'Community agreements in progress.' },
    { value: '15×', label: 'Volume Multiplier', description: 'Agroforestry expands credit volume over time.' },
  ];

  const cards = [
    {
      image: img('impact_seedling.jpg'),
      title: 'Farmer-first design',
      description: 'Enrollment is just the start. We optimize for 5-year retention with training, inputs, and transparent revenue sharing.',
    },
    {
      image: img('impact_team_meeting.jpg'),
      title: 'Compliance-grade MRV',
      description: 'From GPS baselines to satellite checks, our data package is built for Article 6.2 authorization.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="section-flowing bg-mejora-rust py-[10vh]"
      style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(214, 162, 58, 0.15) 0%, transparent 50%), #B9612B',
      }}
    >
      <div className="px-[7vw]">
        {/* Label */}
        <span
          ref={labelRef}
          className="label-text text-mejora-gold"
        >
          Impact
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="mt-4 font-display font-black text-4xl md:text-5xl text-mejora-cream"
        >
          Real numbers. Real farms. Real carbon.
        </h2>

        {/* Intro */}
        <p
          ref={introRef}
          className="mt-4 font-body text-base text-mejora-parchment/80 leading-relaxed max-w-[46vw]"
        >
          We measure what matters—enrollment, retention, sequestration, and farmer income.
        </p>

        {/* Metrics Grid */}
        <div
          ref={metricsRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-item">
              <span className="font-display font-black text-5xl md:text-6xl text-mejora-gold">
                {metric.value}
              </span>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-mejora-cream/90">
                {metric.label}
              </p>
              <p className="mt-1 font-body text-sm text-mejora-parchment/70">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="impact-card glass-card p-6 flex gap-6 items-start"
            >
              {/* Circle thumbnail */}
              <div className="w-20 h-20 circle-mask flex-shrink-0 animate-slow-rotate">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display font-bold text-xl text-mejora-cream">
                  {card.title}
                </h3>
                <p className="mt-2 font-body text-sm text-mejora-parchment/80 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional impact stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '$280', label: 'Revenue per Farmer' },
            { value: '66%', label: 'Gross Margin' },
            { value: '20+', label: 'Years Sequestration' },
            { value: '$20-35', label: 'ITMO Price per Ton' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display font-bold text-2xl text-mejora-gold">
                {stat.value}
              </span>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-mejora-parchment/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
