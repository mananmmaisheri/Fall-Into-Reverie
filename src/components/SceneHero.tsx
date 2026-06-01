import { useState, useEffect } from 'react';
import { CARD_IMAGES } from '../types';
import { useIsMobile as useResMobile } from '../hooks/useIsMobile';
import { Play, Star, X, Leaf, ExternalLink, Globe } from 'lucide-react';

interface SceneHeroProps {
  scrollProgress: number;
}

export default function SceneHero({ scrollProgress }: SceneHeroProps) {
  const isMobile = useResMobile();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [mounted, setMounted] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Measure window width for dynamic visual layouts (Tablet vs Desktop)
  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = windowWidth >= 768 && windowWidth < 1100;
  const isDesktop = windowWidth >= 1100;

  // Render opacity fade-out based on scroll progress: clamp(1 - scrollProgress / 0.45, 0, 1)
  const opacity = Math.max(0, Math.min(1, 1 - scrollProgress / 0.45));

  // Entrance state: mounted state toggling the visual transition classes after 300ms
  const [animateIn, setAnimateIn] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  // Mock trailer placeholder triggers to make the play buttons interactive
  const playVideo = (index: number) => {
    const embeds = [
      'https://www.youtube.com/embed/n3WfN_Gv9sc?autoplay=1', // Dreamy abstract world trailer
      'https://www.youtube.com/embed/S_S7ZPrPqYc?autoplay=1', // Ambient space travel
      'https://www.youtube.com/embed/9A_08I3b9Rk?autoplay=1', // Artistic canvas
    ];
    setActiveVideoUrl(embeds[index] || embeds[0]);
  };

  return (
    <div 
      id="scene-hero-root"
      className="absolute inset-0 pointer-events-none select-none"
      style={{ 
        opacity,
        display: opacity === 0 ? 'none' : 'block',
        transition: 'opacity 0.1s linear'
      }}
    >
      {/* Absolute layout matching the responsive configurations */}
      <div className="relative w-full h-full pointer-events-auto">
        
        {/* MOBILE LAYOUT (<768px) */}
        {isMobile && (
          <div className="absolute inset-x-0 top-[15%] bottom-0 flex flex-col items-center justify-between px-6 pb-20 text-center text-[#3b1a0a]">
            {/* Title & Subtitle Container */}
            <div 
              className={`flex flex-col items-center transform transition-all duration-[900s] ease-out-back ${
                animateIn ? 'translate-y-0 opacity-100' : 'translate-y-[20px] opacity-0'
              }`}
              style={{ transitionDuration: '900ms', transitionDelay: '300ms' }}
            >
              <h1 className="font-serif text-[42px] leading-[1.1] tracking-wide mb-3 uppercase">
                FALL › INTO<br />REVERIE
              </h1>
              <p className="font-sans text-[13px] leading-relaxed max-w-[280px] opacity-90">
                A portal into beautiful, alternate spaces crafted entirely for the imaginative mind.
              </p>
            </div>

            {/* Mobile Nature & E-commerce Stewardship Pledge Card */}
            <div 
              className={`w-full max-w-[310px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-[30px] p-5 text-left shadow-2xl pointer-events-auto mt-4 transition-all duration-500 transform ${
                animateIn ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-[20px] opacity-0 scale-95'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Leaf size={12} className="animate-pulse" />
                </div>
                <span className="text-[9px] font-mono tracking-[0.2em] text-emerald-400 uppercase">Soil Stewardship</span>
              </div>
              <h3 className="font-serif text-[15px] font-normal text-white uppercase tracking-wide mb-1.5">REVERIE CANOPY ALLIANCE</h3>
              <p className="font-sans text-[11px] text-neutral-300 leading-relaxed mb-4">
                To honor the earth, every purchase from our Atelier directly seeds native trees. Support reforestation and preserve global wilderness maps.
              </p>
              <a 
                href="https://onetreeplanted.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-sans text-[10px] uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] transition-all"
              >
                <Globe size={12} /> Support One Tree Planted <ExternalLink size={10} />
              </a>
            </div>
          </div>
        )}

        {/* TABLET LAYOUT (768px - 1099px) */}
        {isTablet && (
          <div className="absolute inset-x-0 top-[12%] bottom-0 flex flex-col items-center justify-between px-10 pb-16 text-center text-[#3b1a0a]">
            {/* Title & Subheading */}
            <div 
              className={`flex flex-col items-center transform transition-all duration-[900ms] ease-out ${
                animateIn ? 'translate-y-0 opacity-100' : 'translate-y-[20px] opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h1 className="font-serif text-[56px] leading-[1.15] tracking-tight mb-4 uppercase">
                FALL › INTO REVERIE
              </h1>
              <p className="font-sans text-[15px] leading-relaxed max-w-[400px] opacity-90">
                Immerse yourself within our newly forged world chambers. Wander freely, explore tactile realities, and listen to the silent whisper of the cosmos.
              </p>
            </div>

            {/* Tablet Nature & E-commerce Stewardship Pledge Card */}
            <div 
              className={`w-full max-w-[440px] bg-black/85 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 text-left shadow-2xl pointer-events-auto my-5 transition-all duration-500 transform ${
                animateIn ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-[20px] opacity-0 scale-95'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Leaf size={14} className="animate-pulse" />
                </div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase">REVERIE CANOPY FUND</span>
              </div>
              <h3 className="font-serif text-lg font-light text-white uppercase tracking-wide mb-2.5">COMMUNE PLEDGE WITH NATURE</h3>
              <p className="font-sans text-xs text-neutral-300 leading-relaxed mb-5">
                Every purchase from the Reverie Atelier directly supports certified afforestation pledges through One Tree Planted. Seed native tree saplings to neutralize fashion's carbon maps dynamically.
              </p>
              <a 
                href="https://onetreeplanted.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-sans text-[11px] uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] transition-all"
              >
                <Globe size={13} /> Donate to One Tree Planted <ExternalLink size={11} />
              </a>
            </div>
          </div>
        )}

        {/* DESKTOP LAYOUT (>=1100px) */}
        {isDesktop && (
          <>
            {/* Left Container */}
            <div 
              className={`absolute top-[46%] left-[60px] -translate-y-1/2 flex flex-col text-left text-white max-w-[440px] transition-all duration-[900ms] ease-out-back ${
                animateIn ? 'translate-x-0 opacity-100' : '-translate-x-[20px] opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h1 className="font-serif text-[68px] leading-[1.05] tracking-wide mb-6 uppercase">
                FALL › INTO<br />REVERIE
              </h1>
              <p className="font-sans text-[14px] leading-[1.65] text-white/80 opacity-95">
                Explore an elegant tapestry of interactive dimensions designed to redefine beauty, scale, and sensory immersion. Scroll to pull back the velvet curtains and step into infinity.
              </p>
            </div>

            {/* Right Container (Nature Canopy Stewardship & NGO Redirection Link) */}
            <div 
              className={`absolute top-[50%] right-[60px] -translate-y-1/2 pointer-events-auto transition-all duration-[900ms] ease-out ${
                animateIn ? 'translate-x-0 opacity-100' : 'translate-x-[30px] opacity-0'
              }`}
              style={{ transitionDelay: '450ms' }}
            >
              <div 
                className="w-full max-w-[390px] bg-black/85 backdrop-blur-xl border border-white/10 rounded-[36px] p-7 text-left shadow-[0_30px_80px_rgba(0,0,0,0.85)] hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Ambient lights */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
                <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-teal-500/5 rounded-full blur-2xl" />
                
                {/* Badge Header info */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Leaf size={15} className="animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-[0.25em] text-emerald-400 uppercase">Nature Stewardship</span>
                    <h3 className="font-serif text-xs font-semibold text-white tracking-wide uppercase">REVERIE CANOPY ALLIANCE</h3>
                  </div>
                </div>

                {/* Subtitle / Headline */}
                <h4 className="font-serif text-sm text-white/95 uppercase tracking-wider mb-3 leading-tight font-normal">
                  FASHION TAILORED FOR REFORESTATION
                </h4>

                {/* Core description */}
                <p className="font-sans text-xs text-neutral-300 leading-relaxed mb-6">
                  To honor the forests that mold our biophilic threads, Reverie Atelier sponsors certified afforestation pledges. Every garment we shape seeds native broadleaf tree saplings in degraded woodlands. Participate directly in our global reforestation movement today.
                </p>

                {/* Micro indicators */}
                <div className="grid grid-cols-2 gap-4 mb-6 bg-white/[0.02] p-4 rounded-2xl border border-white/5 text-[11px] font-mono">
                  <div>
                    <span className="block text-neutral-500 uppercase text-[8px] tracking-wider leading-none mb-1">Afforestation Partner</span>
                    <span className="text-white font-serif font-semibold text-[13px] block">One Tree Planted</span>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <span className="block text-neutral-500 uppercase text-[8px] tracking-wider leading-none mb-1">Direct Pledge</span>
                    <span className="text-emerald-400 font-serif font-semibold text-[13px] block">1.5 Saplings / Order</span>
                  </div>
                </div>

                {/* Action CTA Button */}
                <a 
                  href="https://onetreeplanted.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold font-sans text-[10px] uppercase tracking-widest py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-[0_15px_30px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Globe size={13} /> Support One Tree Planted <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </>
        )}

        {/* Scroll Cue (Descend) - absolutely positioned at bottom: 36px, centered horizontally. Hidden on mobile. */}
        {!isMobile && (
          <div className="absolute bottom-[36px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-auto">
            <span className="uppercase text-[10px] tracking-[0.22em] text-white/60 select-none">
              Descend
            </span>
            <div className="w-[34px] h-[34px] rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-[4px] animate-bob">
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none" 
                className="text-white/80"
              >
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}

        {/* Elegant Modal for video embeds */}
        {activeVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md pointer-events-auto">
            <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-3xl">
              <button 
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-all shadow-lg"
              >
                <X size={18} />
              </button>
              <iframe
                title="Reverie Video Preview"
                src={activeVideoUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
