import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Clock, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const details = detailsRef.current;
    const form = formRef.current;

    if (!section || !headline || !details || !form) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headline,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Details animation
      gsap.fromTo(
        details,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        form,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', organization: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-flowing bg-mejora-espresso min-h-screen py-[12vh]"
      style={{
        background: 'radial-gradient(ellipse at 70% 30%, rgba(214, 162, 58, 0.08) 0%, transparent 50%), #2C1E1A',
      }}
    >
      <div className="px-[7vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left column */}
        <div>
          {/* Headline */}
          <div ref={headlineRef}>
            <h2 className="font-display font-black uppercase text-mejora-cream headline-lg">
              <span className="block">Let's Build</span>
              <span className="block text-mejora-gold">The Future</span>
            </h2>
          </div>

          {/* Details */}
          <div ref={detailsRef} className="mt-8 space-y-6">
            <p className="font-body text-lg text-mejora-parchment/80 leading-relaxed">
              Partnerships, offtake inquiries, and investor updates.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-mejora-gold/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-mejora-gold" />
                </div>
                <span className="font-body text-mejora-cream">
                  mejorabioseed@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-mejora-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-mejora-gold" />
                </div>
                <span className="font-body text-mejora-cream">
                  Accra, Ghana · Singapore
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-mejora-gold/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-mejora-gold" />
                </div>
                <span className="font-body text-mejora-cream">
                  We reply within 2 business days.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Form */}
        <div ref={formRef}>
          <div className="glass-card p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-mejora-gold/20 flex items-center justify-center">
                  <Send className="w-8 h-8 text-mejora-gold" />
                </div>
                <h3 className="mt-6 font-display font-bold text-2xl text-mejora-cream">
                  Message Sent!
                </h3>
                <p className="mt-2 font-body text-mejora-parchment/70">
                  Thank you for reaching out. We'll get back to you within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/60 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/60 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Company or organization"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.1em] text-mejora-parchment/60 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-mejora-espresso/30 border-t-mejora-espresso rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Request a briefing
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 px-[7vw] pt-8 border-t border-mejora-cream/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="22" cy="22" r="20" stroke="#F6F2EA" strokeWidth="1.5" fill="none" />
              <circle cx="22" cy="22" r="14" stroke="#D6A23A" strokeWidth="1.5" fill="none" />
            </svg>
            <span className="font-display font-bold text-mejora-cream">MEJORA BIO-INDUSTRIES LTD</span>
          </div>

          <p className="font-body text-sm text-mejora-parchment/50">
            © MEJORA BIO-INDUSTRIES LTD. All rights reserved.
          </p>

          <p className="font-mono text-xs uppercase tracking-[0.08em] text-mejora-parchment/50">
            Ghana's First Article 6.2-Authorized Carbon Credit Originator
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
