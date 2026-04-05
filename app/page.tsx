'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const heroRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [carouselWidth, setCarouselWidth] = useState(0);

  // Preloader Logic
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Carousel Constraint Logic
  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [loading]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-obsidian flex flex-col justify-center items-center fixed inset-0 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-champagne font-serif italic text-3xl md:text-5xl"
        >
          Dave Photography.
        </motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="h-[1px] bg-champagne/50 mt-6"
        />
      </div>
    );
  }

  return (
    <main ref={container} className="relative bg-obsidian min-h-screen font-sans overflow-hidden">
      
      {/* Ambient Luxury Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-champagne/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-900/20 rounded-full blur-[150px]" />
      </div>

      {/* Navbar (Minimal Luxury) */}
      <nav className="fixed top-0 w-full z-50 p-8 flex justify-between items-center bg-gradient-to-b from-obsidian/80 to-transparent backdrop-blur-sm border-b border-champagne/10">
        <div className="font-serif text-2xl font-semibold tracking-widest text-alabaster">
          DAVE<span className="text-champagne">.</span>
        </div>
        <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-alabaster/70">
          <a href="#vault" data-cursor="hover" className="hover:text-champagne transition-colors">The Vault</a>
          <a href="#studio" data-cursor="hover" className="hover:text-champagne transition-colors">Studio</a>
          <a href="#inquiry" data-cursor="hover" className="text-obsidian bg-champagne px-6 py-2 rounded-sm hover:bg-white transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]">Commission</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="h-[100vh] w-full sticky top-0 flex flex-col justify-center px-6 md:px-24 border-b border-champagne/20">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian z-10" />
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Cinematic" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
        </motion.div>

        <div className="z-10 relative max-w-5xl pt-32">
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[1px] bg-champagne mb-8"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-alabaster font-light"
          >
            Capturing the <span className="italic text-champagne">Elegance</span> <br/>of the Unseen.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg text-alabaster/60 max-w-lg font-light tracking-widest leading-relaxed border-l border-champagne/50 pl-6"
          >
            Bespoke visual storytelling for the world's most discerning brands, editorials, and individuals.
          </motion.p>
        </div>
      </section>

      {/* The Vault (Gold-Trimmed Swipeable Carousel) */}
      <section id="vault" className="relative z-20 bg-charcoal/80 backdrop-blur-md pt-40 pb-32 overflow-hidden border-b border-champagne/20">
        <div className="px-6 md:px-24 mb-20 flex flex-col md:flex-row justify-between items-end">
          <div>
            <div className="text-champagne tracking-[0.3em] text-xs uppercase mb-4">Portfolio</div>
            <h2 className="font-serif text-5xl md:text-7xl text-alabaster">The <span className="text-champagne italic">Vault.</span></h2>
          </div>
          <p className="text-xs tracking-[0.2em] uppercase text-champagne/60 mt-8">&larr; Drag to Explore &rarr;</p>
        </div>

        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden pl-6 md:pl-24">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -carouselWidth }} 
            className="flex gap-12 w-max pb-12"
          >
            {[
              { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3", title: "Couture Editorial", desc: "Paris, 2025" },
              { src: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3", title: "The Royal Union", desc: "Lake Como" },
              { src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3", title: "Midnight Sun", desc: "Fine Art Series" },
              { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3", title: "Vogue Spread", desc: "New York" }
            ].map((item, i) => (
              <motion.div key={i} className="relative w-[85vw] md:w-[35vw] aspect-[3/4] group" data-cursor="hover">
                {/* Gold Frame */}
                <div className="absolute inset-[-1px] bg-gradient-to-b from-champagne/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="w-full h-full relative overflow-hidden bg-obsidian border border-champagne/20">
                  <img src={`${item.src}&auto=format&fit=crop&w=1200&q=80`} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110 pointer-events-none" alt={item.title} />
                  
                  {/* Luxury Info Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <h3 className="font-serif italic text-2xl text-champagne mb-2">{item.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-alabaster/70">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* The Studio */}
      <section id="studio" className="relative z-20 bg-obsidian py-40 px-6 md:px-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 space-y-12">
            <h2 className="font-serif text-5xl md:text-6xl text-alabaster">Beyond the <span className="text-champagne italic">Lens.</span></h2>
            <p className="text-xl font-light text-alabaster/80 leading-relaxed border-l-2 border-champagne pl-6">
              Photography is more than the documentation of time; it is the art of preserving an atmosphere.
            </p>
            <p className="text-alabaster/50 font-light leading-loose text-sm tracking-wide">
              Operating at the intersection of fine art and high fashion, Dave Photography provides a highly curated, white-glove experience. From the initial creative consultation to the final delivery of archival-quality prints, every step is meticulously tailored.
            </p>
            <div className="pt-8 border-t border-champagne/20">
              <img src="/signature.png" alt="Dave Signature" className="h-12 opacity-50" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <p className="font-serif italic text-champagne mt-4">Dave., Creative Director</p>
            </div>
          </div>
          <div className="flex-1 relative aspect-[3/4] w-full border border-champagne/30 p-2">
             <div className="w-full h-full bg-charcoal overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554046920-90dc59f4e6f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Studio" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
             </div>
             {/* Decorative Gold Elements */}
             <div className="absolute top-[-10px] left-[-10px] w-5 h-5 border-t border-l border-champagne" />
             <div className="absolute bottom-[-10px] right-[-10px] w-5 h-5 border-b border-r border-champagne" />
          </div>
        </div>
      </section>

      {/* Inquiry Form (Breathtaking Luxury) */}
      <section id="inquiry" className="relative z-20 bg-charcoal/90 py-40 px-6 md:px-24 border-t border-champagne/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-7xl mb-6">Commission <span className="italic text-champagne">Dave.</span></h2>
            <p className="text-alabaster/50 font-light max-w-lg mx-auto leading-relaxed text-sm tracking-widest uppercase">
              Limited Commissions Available for 2026.
            </p>
          </div>

          <form className="space-y-12 bg-obsidian/50 p-8 md:p-16 border border-champagne/10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-champagne/70 mb-4 transition-colors group-focus-within:text-champagne">01. Identity</label>
                <input type="text" placeholder="Name & Pronouns" className="w-full bg-transparent border-b border-alabaster/10 pb-4 text-lg text-alabaster focus:outline-none focus:border-champagne transition-all duration-500 placeholder:text-alabaster/20" />
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-champagne/70 mb-4 transition-colors group-focus-within:text-champagne">02. Contact</label>
                <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-alabaster/10 pb-4 text-lg text-alabaster focus:outline-none focus:border-champagne transition-all duration-500 placeholder:text-alabaster/20" />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-champagne/70 mb-4 transition-colors group-focus-within:text-champagne">03. Commission Type</label>
              <select className="w-full bg-transparent border-b border-alabaster/10 pb-4 text-lg text-alabaster focus:outline-none focus:border-champagne transition-all duration-500 appearance-none cursor-pointer">
                <option className="bg-obsidian">Editorial Campaign</option>
                <option className="bg-obsidian">Private Commission</option>
                <option className="bg-obsidian">Couture Wedding</option>
                <option className="bg-obsidian">Fine Art Print</option>
              </select>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-champagne/70 mb-4 transition-colors group-focus-within:text-champagne">04. The Vision</label>
              <textarea rows={3} placeholder="Dates, locations, creative concepts..." className="w-full bg-transparent border-b border-alabaster/10 pb-4 text-lg text-alabaster focus:outline-none focus:border-champagne transition-all duration-500 placeholder:text-alabaster/20 resize-none"></textarea>
            </div>

            <div className="text-center pt-8">
              <button type="button" data-cursor="hover" className="inline-flex items-center gap-4 px-16 py-6 border border-champagne text-champagne uppercase tracking-[0.3em] text-xs font-semibold hover:bg-champagne hover:text-obsidian transition-all duration-700 shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                Request Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-obsidian border-t border-champagne/20 py-16 px-12 flex flex-col md:flex-row justify-between items-center text-xs tracking-[0.2em] uppercase text-alabaster/40">
        <div className="flex items-center gap-4">
          <span className="text-champagne">DAVE.</span>
          <span>&copy; 2026. Strictly Confidential.</span>
        </div>
        <div className="flex gap-8 mt-8 md:mt-0">
          <a href="#" className="hover:text-champagne transition-colors">Instagram</a>
          <a href="#" className="hover:text-champagne transition-colors">Vogue</a>
          <a href="#" className="hover:text-champagne transition-colors"><Mail className="w-4 h-4" /></a>
        </div>
      </footer>

    </main>
  );
}