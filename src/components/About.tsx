import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Leaf, Compass, ArrowRight, ShieldCheck, Heart, Eye, Trees, Droplet, Layers } from 'lucide-react';

interface AboutProps {
  onBackToWorlds?: () => void;
  onGoToStore?: () => void;
}

export default function About({ onBackToWorlds, onGoToStore }: AboutProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'essence' | 'process' | 'future'>('essence');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Background and frame images matching the biophilic portal vibe
  const ABOUT_HERO_BG = "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1600&auto=format&fit=crop"; // Misty Pine conifers
  const PORTAL_GATEWAY = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop"; // Single green leaf close up
  const WEAVE_IMG = "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1000&auto=format&fit=crop"; // Hands weaving organic loom
  const WATER_IMG = "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=1000&auto=format&fit=crop"; // Hands holding botanical plant extract

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1; // Normalize to -1 to 1
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Parallax calculations based on scroll position
  const heroScale = 1.1 + scrollY * 0.0006;
  const portalScale = 1.05 + scrollY * 0.0015;
  const portalOpacity = Math.max(0, 1 - scrollY / 700);
  const textTranslateY = Math.min(220, scrollY * 0.38);
  const textOpacity = Math.max(0, 1 - scrollY / 420);

  // Parallax mouse offsets
  const mx = mousePos.x * 12;
  const my = mousePos.y * 12;

  // Static narrative coordinates
  const coreValues = [
    {
      icon: <Trees className="text-emerald-400" size={24} />,
      title: "Biophilic Co-existence",
      desc: "Our materials aren't just sustainable—they are harvested as an extension of the earth, aligning garments with nature's circular timeline."
    },
    {
      icon: <Droplet className="text-sky-400" size={24} />,
      title: "Atmospheric Water Saving",
      desc: "By designing through certified Tencel and wild-growing organic hemp, we bypass agricultural irrigation entirely, conserving pristine aquifers."
    },
    {
      icon: <Layers className="text-rose-400" size={24} />,
      title: "Symmetric Traceability",
      desc: "Each individual design comes connected with coordinates. From family seed nurseries to Lisbon hand-weaving tables, every action is open sourced."
    }
  ];

  return (
    <div id="about-root" className="w-full text-white bg-[#0a0608] overflow-hidden text-left font-sans select-none relative">
      
      {/* SECTION 1: MASTER IMMERSIVE STICKY HERO (Same dynamic 3D feel of worlds page) */}
      <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-black">
        
        {/* Layer 1: Parallax Wilderness Backdrop */}
        <img 
          src={ABOUT_HERO_BG} 
          alt="Parallax Woods" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-60"
          style={{
            transform: `scale(${heroScale}) translate3d(${mx * -0.4}px, ${my * -0.4}px, 0)`,
            transition: 'transform 0.1s ease-out'
          }}
        />

        {/* Glow Overlay mimicking portal ambiance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0608] via-black/35 to-black/40 z-10 pointer-events-none" />

        {/* Layer 2: Glowing Bio-Portal Frame mirroring the main portal */}
        <div 
          className="absolute w-[80vw] h-[75vh] md:w-[60vw] md:h-[65vh] border-2 border-emerald-500/20 rounded-[48px] overflow-hidden z-20 shadow-[0_0_80px_rgba(16,185,129,0.06)] bg-black/30 backdrop-blur-[4px] pointer-events-none"
          style={{
            transform: `scale(${portalScale}) translate3d(${mx * 0.5}px, ${my * 0.5}px, 0)`,
            opacity: portalOpacity,
            transition: 'transform 0.1s ease-out, opacity 0.15s ease-out'
          }}
        >
          {/* Internal image clipped representing raw fiber origin */}
          <img 
            src={PORTAL_GATEWAY}
            alt="Bio Portal"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        {/* Layer 3: Central Cinematic Typography */}
        <div 
          className="text-center relative z-30 px-6 max-w-3xl pointer-events-auto"
          style={{
            transform: `translate3d(0, ${textTranslateY}px, 0)`,
            opacity: textOpacity,
            transition: 'transform 0.05s ease-out, opacity 0.1s ease-out'
          }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-sans tracking-[0.25em] uppercase mb-4 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            <Sparkles size={11} className="animate-spin-slow" /> The Ledger of Reverie
          </span>
          <h1 className="font-serif font-normal text-4xl sm:text-6xl uppercase tracking-[0.05em] leading-tight mb-6">
            Looming Natural <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-emerald-500 font-semibold font-serif">
              Cosmic Realities
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans tracking-wide max-w-xl mx-auto leading-relaxed">
            Reverie is a biophilic textile observatory. We craft coordinates rather than garments, tracing the physical carbon offsets and water conservation of every unbleached thread.
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-bounce">
            <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-400/70 select-none">
              Scroll downward to view coordinates
            </span>
          </div>
        </div>

        {/* Left and Right Organic Decorative Borders */}
        <div className="absolute left-6 bottom-12 z-40 hidden md:block text-left text-white/40 font-mono text-[9px] tracking-widest uppercase">
          Observatory Map: 38.72° N, 9.13° W
        </div>
        <div className="absolute right-6 bottom-12 z-40 hidden md:block text-right text-white/40 font-mono text-[9px] tracking-widest uppercase">
          Zero-plastic Thread Certified
        </div>
      </div>

      {/* SECTION 2: THE ECO INTEGRITY METRICS */}
      <div className="relative py-24 px-6 md:px-12 bg-[#0a0608] border-t border-white/5 z-40">
        
        {/* Abstract glowing biophilic points */}
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-emerald-950/10 blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          
          {/* Heading */}
          <div className="text-center md:text-left mb-16 border-b border-white/5 pb-8 max-w-2xl">
            <span className="text-rose-400 text-xs font-mono tracking-[0.2em] uppercase mb-2 block">
              01 / Core Pillars
            </span>
            <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-wide mb-4">
              Our Axiom of Design
            </h2>
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
              We operate an uncompromising system of natural design parameters, allowing our pieces to harmonize back into planetary soil upon lifecycle completion.
            </p>
          </div>

          {/* Cards mapping dynamic effects on hover */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => (
              <div
                key={val.title}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-white/[0.01] border border-white/5 rounded-[32px] p-8 flex flex-col justify-between hover:bg-black/40 hover:border-emerald-500/30 transition-all duration-300 group shadow-lg pointer-events-auto"
                style={{
                  transform: hoveredCard === idx ? 'translateY(-6px)' : 'none',
                }}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {val.icon}
                  </div>
                  <h3 className="font-serif text-lg uppercase text-white group-hover:text-emerald-400 transition-colors mb-3">
                    {val.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {val.desc}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
                  <span>Standard Valid</span>
                  <span className="text-emerald-400">100% verified</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* SECTION 3: THE INTERACTIVE STORY CHRONOLOGY (Tabs + Parallax Slide) */}
      <div className="relative py-24 px-6 md:px-12 bg-black/30 border-t border-white/5 z-40">
        
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-emerald-400 text-xs font-mono tracking-[0.2em] uppercase block">
                02 / Traceable Chronology
              </span>
              <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-wide">
                Botanical <br />Weaves & Origin
              </h2>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-md">
                Select coordinates to explore how raw soils morph into structural fabrics without touching a single drop of petrochemicals or chlorine bleaches.
              </p>

              {/* TABS SELECTORS */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                
                <button
                  onClick={() => setActiveTab('essence')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl text-left border transition-all ${
                    activeTab === 'essence' 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                      : 'bg-transparent border-white/5 text-neutral-500 hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs">01.</span>
                    <span className="caption font-serif text-[13px] uppercase tracking-wider font-semibold">Agricultural Essence</span>
                  </div>
                  <ArrowRight size={14} className={activeTab === 'essence' ? 'text-emerald-400' : 'text-neutral-600'} />
                </button>

                <button
                  onClick={() => setActiveTab('process')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl text-left border transition-all ${
                    activeTab === 'process' 
                      ? 'bg-sky-500/10 border-sky-500/30 text-white' 
                      : 'bg-transparent border-white/5 text-neutral-500 hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs">02.</span>
                    <span className="caption font-serif text-[13px] uppercase tracking-wider font-semibold">The Weaving Loom</span>
                  </div>
                  <ArrowRight size={14} className={activeTab === 'process' ? 'text-sky-400' : 'text-neutral-600'} />
                </button>

                <button
                  onClick={() => setActiveTab('future')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl text-left border transition-all ${
                    activeTab === 'future' 
                      ? 'bg-rose-500/10 border-rose-500/30 text-white' 
                      : 'bg-transparent border-white/5 text-neutral-500 hover:text-white hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs">03.</span>
                    <span className="caption font-serif text-[13px] uppercase tracking-wider font-semibold">Plant Life Cycle</span>
                  </div>
                  <ArrowRight size={14} className={activeTab === 'future' ? 'text-rose-400' : 'text-neutral-600'} />
                </button>

              </div>
            </div>

            {/* Right Interactive Card Preview Column */}
            <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-[40px] p-6 self-stretch flex flex-col justify-between relative overflow-hidden group">
              
              {/* Dynamic Image Overlay based on Tab Selection */}
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-neutral-900 mb-6 border border-white/5">
                <img 
                  src={
                    activeTab === 'essence' ? WEAVE_IMG : 
                    activeTab === 'process' ? PORTAL_GATEWAY : WATER_IMG
                  }
                  alt="Dynamic trace view"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 brightness-75 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />
                
                <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest bg-black/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-emerald-400">
                  {activeTab === 'essence' ? 'Location: Manila Hub' : activeTab === 'process' ? 'Lisbon Lab' : 'Oaxaca Cooperatives'}
                </span>
              </div>

              {/* Dynamic Content Detail */}
              <div className="flex-1 flex flex-col justify-between px-2">
                <div>
                  <h4 className="font-serif text-2xl uppercase text-white mb-3">
                    {activeTab === 'essence' && "Eucalyptus & Pineapple Sourcing"}
                    {activeTab === 'process' && "Lisbon Fluid-Loom Handcrafted Setup"}
                    {activeTab === 'future' && "100% Soil Biodegradation Guarantee"}
                  </h4>
                  
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-6">
                    {activeTab === 'essence' && "Our primary fibers are harvested by family cooperatives from pineapples leaves and fast-regenerating eucalyptus trees, needing exactly zero pesticides or extra agricultural watering systems."}
                    {activeTab === 'process' && "These fibers are shipped to our Lisbon weaver room, where craftsmen employ mechanical hand looms. No natural gas or heavy energy generators are utilized in the weft and warp setup."}
                    {activeTab === 'future' && "Upon finishing its multi-decade journey, any Reverie garment can be shredded and buried in clean garden compost. They completely degrade within 90 days, replenishing soils with organic nitrogen."}
                  </p>
                </div>

                <div className="bg-[#070506] border border-white/5 rounded-2xl p-4 flex justify-between items-center text-[11px] font-mono">
                  <div className="space-y-1">
                    <span className="block text-neutral-500">CARBON FOOTPRINT</span>
                    <span className="text-emerald-400 font-bold">0.45 kg CO₂ (A third of cotton)</span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="block text-neutral-500">WATER IMPACT</span>
                    <span className="text-sky-400 font-bold">100% Reclaimed</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* SECTION 4: CONCLUDING CINEMATIC CALL-TO-ACTIONS */}
      <div className="relative py-24 px-6 text-center bg-black/60 border-t border-white/5 z-40">
        <div className="max-w-2xl mx-auto space-y-8">
          
          <h3 className="font-serif font-light text-2xl sm:text-4xl text-neutral-300 uppercase tracking-widest">
            A BEAUTIFUL SYSTEM IS <br />
            <span className="font-semibold text-white">AN HONEST SYSTEM</span>
          </h3>
          
          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
            Ready to explore our immersive natural systems, or navigate directly to our active catalogs? Choose your course coordinate below.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            
            {onBackToWorlds && (
              <button 
                onClick={onBackToWorlds}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-black hover:bg-emerald-400 font-sans text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all cursor-pointer shadow-lg active:scale-[0.98]"
              >
                Launch Immersive Worlds
              </button>
            )}

            {onGoToStore && (
              <button 
                onClick={onGoToStore}
                className="w-full sm:w-auto px-8 py-4 bg-[#0a0608] hover:bg-neutral-900 text-white border border-white/10 font-sans text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all cursor-pointer active:scale-[0.98]"
              >
                Inquire Atelier Catalog
              </button>
            )}

          </div>

          <p className="text-[10px] text-neutral-600 font-mono tracking-widest uppercase pt-6">
            © REVERIE OBSERVATORIES — ALL SHADES ORIGIN FROM NATURAL INFUSIONS.
          </p>
        </div>
      </div>

    </div>
  );
}
