'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Instagram, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const heroRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Preloader Logic
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-obsidian flex flex-col justify-center items-center fixed inset-0 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-alabaster/60 font-sans tracking-[0.3em] uppercase text-sm"
        >
          Light. Form. Emotion.
        </motion.div>
      </div>
    );
  }

  return (
    <main ref={container} className="relative bg-obsidian min-h-screen font-sans">
      
      {/* Navbar (Minimal) */}
      <nav className="fixed top-0 w-full z-40 p-8 flex justify-between items-center mix-blend-difference">
        <div className="font-serif text-2xl font-semibold tracking-wide text-white">L&L.</div>
        <div className="flex gap-8 text-xs uppercase tracking-widest text-white/70">
          <a href="#vault" data-cursor="hover" className="hover:text-champagne transition-colors">The Vault</a>
          <a href="#studio" data-cursor="hover" className="hover:text-champagne transition-colors">Studio</a>
          <a href="#inquiry" data-cursor="hover" className="text-champagne font-bold">Commission</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="h-[100vh] w-full sticky top-0 flex flex-col justify-center px-12 md:px-24">
        {/* Placeholder for Cinematic Video/Image Background */}
        <motion.div 
          className="absolute inset-0 z-0 bg-charcoal"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian" />
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Cinematic" 
            className="w-full h-full object-cover opacity-30 grayscale contrast-125 mix-blend-luminosity"
          />
        </motion.div>

        <div className="z-10 relative max-w-4xl pt-32">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-alabaster font-light"
          >
            Capturing the <span className="italic text-champagne">Elegance</span> <br/>of the Unseen.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg text-alabaster/60 max-w-lg font-light tracking-wide leading-relaxed"
          >
            Bespoke visual storytelling for the world's most discerning brands and individuals.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16"
          >
            <a href="#vault" data-cursor="hover" className="group flex items-center gap-4 text-sm uppercase tracking-widest text-champagne border-b border-champagne/30 pb-2 w-fit hover:border-champagne transition-all">
              Enter the Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* The Vault (Gallery) */}
      <section id="vault" className="relative z-20 bg-obsidian pt-40 pb-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <h2 className="font-serif text-5xl md:text-7xl text-alabaster">A Curation <br/><span className="text-champagne italic">of Moments.</span></h2>
            <div className="flex gap-6 text-sm uppercase tracking-wider text-alabaster/50 mt-8 md:mt-0">
              <span className="text-champagne border-b border-champagne pb-1 cursor-pointer">Editorial</span>
              <span className="hover:text-alabaster cursor-pointer transition-colors">Weddings</span>
              <span className="hover:text-alabaster cursor-pointer transition-colors">Fine Art</span>
            </div>
          </div>

          {/* Asymmetrical Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-5 space-y-16">
              <div className="relative aspect-[3/4] group overflow-hidden bg-charcoal" data-cursor="hover">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="Fashion 1" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <p className="text-sm tracking-widest uppercase text-champagne">View Editorial</p>
                </div>
              </div>
              <div className="relative aspect-square group overflow-hidden bg-charcoal" data-cursor="hover">
                <img src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="Wedding 1" />
              </div>
            </div>
            
            <div className="md:col-span-7 space-y-16 md:pt-32">
              <div className="relative aspect-video group overflow-hidden bg-charcoal" data-cursor="hover">
                <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="Fine Art 1" />
              </div>
              <div className="relative aspect-[3/4] md:w-3/4 ml-auto group overflow-hidden bg-charcoal" data-cursor="hover">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt="Fashion 2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Studio */}
      <section id="studio" className="relative z-20 bg-charcoal py-40 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="font-serif text-5xl md:text-6xl text-champagne italic">Beyond the Lens.</h2>
          <p className="text-xl md:text-2xl font-light text-alabaster leading-relaxed">
            Photography is more than the documentation of time; it is the art of preserving an atmosphere.
          </p>
          <p className="text-alabaster/60 font-light leading-loose max-w-2xl mx-auto">
            Operating at the intersection of fine art and high fashion, our studio provides a highly curated, white-glove experience. From the initial creative consultation to the final delivery of archival-quality prints, every step is tailored to reflect the unique essence of our clients.
          </p>

          <div className="grid md:grid-cols-3 gap-12 pt-20 text-left border-t border-white/10">
            <div>
              <h4 className="text-champagne tracking-widest text-sm uppercase mb-4">I. Conceptualization</h4>
              <p className="text-sm text-alabaster/60 leading-relaxed">Translating your vision into a cohesive, cinematic visual narrative.</p>
            </div>
            <div>
              <h4 className="text-champagne tracking-widest text-sm uppercase mb-4">II. Production</h4>
              <p className="text-sm text-alabaster/60 leading-relaxed">Exclusive access to elite styling, avant-garde set design, and private location scouting.</p>
            </div>
            <div>
              <h4 className="text-champagne tracking-widest text-sm uppercase mb-4">III. The Archive</h4>
              <p className="text-sm text-alabaster/60 leading-relaxed">Masterful post-production and color grading, ensuring your imagery remains timeless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="relative z-20 bg-obsidian py-40 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-5xl md:text-7xl mb-6">Commission <span className="italic text-champagne">a Vision.</span></h2>
          <p className="text-alabaster/50 font-light mb-16 max-w-lg leading-relaxed">
            Due to the bespoke nature of our work, we accept a limited number of commissions each season to ensure uncompromising quality.
          </p>

          <form className="space-y-12">
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-champagne mb-4">01. How shall we address you?</label>
              <input type="text" placeholder="Name & Pronouns" className="w-full bg-transparent border-b border-white/20 pb-4 text-lg text-alabaster focus:outline-none focus:border-champagne transition-colors placeholder:text-white/20" />
            </div>
            
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-champagne mb-4">02. Where can we reach you?</label>
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 pb-4 text-lg text-alabaster focus:outline-none focus:border-champagne transition-colors placeholder:text-white/20" />
            </div>

            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-champagne mb-4">03. What is the nature of your inquiry?</label>
              <select className="w-full bg-obsidian border-b border-white/20 pb-4 text-lg text-alabaster/80 focus:outline-none focus:border-champagne transition-colors appearance-none cursor-pointer">
                <option>Editorial Campaign</option>
                <option>Private Commission</option>
                <option>Couture Wedding</option>
                <option>Other</option>
              </select>
            </div>

            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-champagne mb-4">04. Share the details of your vision</label>
              <textarea rows={4} placeholder="Dates, locations, concepts..." className="w-full bg-transparent border-b border-white/20 pb-4 text-lg text-alabaster focus:outline-none focus:border-champagne transition-colors placeholder:text-white/20 resize-none"></textarea>
            </div>

            <button type="submit" data-cursor="hover" className="w-full md:w-auto px-12 py-5 bg-champagne text-obsidian uppercase tracking-widest text-sm font-semibold hover:bg-white transition-colors duration-500">
              Request Consultation
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-obsidian border-t border-white/10 py-12 px-12 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase text-alabaster/40">
        <p>Strictly confidential. Studio director will reply within 48h.</p>
        <div className="flex gap-6 mt-6 md:mt-0">
          <a href="#" className="hover:text-champagne"><Instagram className="w-4 h-4" /></a>
          <a href="#" className="hover:text-champagne"><Mail className="w-4 h-4" /></a>
        </div>
      </footer>

    </main>
  );
}
