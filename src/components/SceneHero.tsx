import { useState, useEffect } from 'react';
import { CARD_IMAGES } from '../types';
import { useIsMobile as useResMobile } from '../hooks/useIsMobile';
import { Play, Star, X } from 'lucide-react';

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

  // Render opacity fade-out based on scroll progress: clamp(1 - scrollProgress / 0.22, 0, 1)
  const opacity = Math.max(0, Math.min(1, 1 - scrollProgress / 0.22));

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

            {/* Single Card: CARD_IMAGES[0] */}
            <div 
              className="relative w-[180px] h-[180px] rounded-[24px] overflow-hidden shadow-2xl cursor-pointer group hover:scale-105 transition-transform duration-300 pointer-events-auto mt-4"
              onClick={() => playVideo(0)}
            >
              <img 
                src={CARD_IMAGES[0]} 
                alt="Reverie Card" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div 
                className="absolute inset-0 flex flex-col justify-end p-3"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)'
                }}
              >
                <div className="flex items-center gap-2 text-white text-left">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold tracking-wider uppercase">View Reel</span>
                    <span className="block text-[9px] text-white/70">Dreamscape Atelier</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex gap-2 justify-center items-center h-4 mt-6">
              <span className="h-1.5 rounded-full bg-[#3b1a0a] transition-all duration-300 w-[28px]" />
              <span className="h-1.5 rounded-full bg-[#3b1a0a]/30 transition-all duration-300 w-[14px]" />
              <span className="h-1.5 rounded-full bg-[#3b1a0a]/30 transition-all duration-300 w-[14px]" />
              <span className="h-1.5 rounded-full bg-[#3b1a0a]/30 transition-all duration-300 w-[14px]" />
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

            {/* Row of 3 Cards in exact order */}
            <div className="flex gap-6 justify-center items-center my-6 pointer-events-auto">
              
              {/* Card 3 (repaired position in list) */}
              <div 
                className="relative w-[158px] h-[158px] rounded-[24px] overflow-hidden shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => playVideo(0)}
              >
                <img 
                  src={CARD_IMAGES[0]} 
                  alt="Card 3" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div 
                  className="absolute inset-0 flex flex-col justify-end p-3"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)'
                  }}
                >
                  <div className="flex items-center gap-2 text-white text-left">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black">
                      <Play size={10} fill="currentColor" className="ml-0.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold tracking-wider uppercase">View Reel</span>
                      <span className="block text-[8px] text-white/70">Aeon Gate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 1 */}
              <div 
                className="relative w-[158px] h-[158px] rounded-[24px] overflow-hidden shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => playVideo(1)}
              >
                <img 
                  src={CARD_IMAGES[1]} 
                  alt="Card 1" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div 
                  className="absolute inset-0 flex flex-col justify-end p-3"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)'
                  }}
                >
                  <div className="text-white text-left">
                    <span className="block text-[16px] font-serif tracking-tight leading-tight flex items-center gap-1">
                      32
                      <Star size={11} fill="currentColor" className="text-amber-400" />
                    </span>
                    <span className="block text-[8px] uppercase tracking-[0.1em] text-white/80">World Patrons</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                className="relative w-[158px] h-[158px] rounded-[24px] overflow-hidden shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => playVideo(2)}
              >
                <img 
                  src={CARD_IMAGES[2]} 
                  alt="Card 2" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div 
                  className="absolute inset-0 flex flex-col justify-end p-3"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)'
                  }}
                >
                  <div className="flex items-center gap-2 text-white text-left">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black">
                      <Play size={10} fill="currentColor" className="ml-0.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold tracking-wider uppercase">View Reel</span>
                      <span className="block text-[8px] text-white/70">Astraea</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Slider Dots */}
            <div className="flex gap-2 justify-center items-center h-4">
              <span className="h-1.5 rounded-full bg-[#3b1a0a] transition-all duration-300 w-[28px]" />
              <span className="h-1.5 rounded-full bg-[#3b1a0a]/30 transition-all duration-300 w-[14px]" />
              <span className="h-1.5 rounded-full bg-[#3b1a0a]/30 transition-all duration-300 w-[14px]" />
              <span className="h-1.5 rounded-full bg-[#3b1a0a]/30 transition-all duration-300 w-[14px]" />
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

            {/* Right Container */}
            <div 
              className={`absolute top-[50%] right-[40px] -translate-y-1/2 flex items-center gap-6 pointer-events-auto transition-all duration-[900ms] ease-out ${
                animateIn ? 'translate-x-0 opacity-100' : 'translate-x-[20px] opacity-0'
              }`}
              style={{ transitionDelay: '450ms' }}
            >
              
              {/* Card 3 */}
              <div 
                className="relative w-[158px] h-[158px] rounded-[28px] overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => playVideo(0)}
              >
                <img 
                  src={CARD_IMAGES[0]} 
                  alt="Aeon Gate Card" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div 
                  className="absolute inset-0 flex flex-col justify-end p-4"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)'
                  }}
                >
                  <div className="flex items-center gap-2.5 text-white">
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform">
                      <Play size={12} fill="currentColor" className="ml-0.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold tracking-wider uppercase">View Reel</span>
                      <span className="block text-[8px] text-white/60">Aeon Gate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 1 */}
              <div 
                className="relative w-[158px] h-[158px] rounded-[28px] overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => playVideo(1)}
              >
                <img 
                  src={CARD_IMAGES[1]} 
                  alt="Patrons Card" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div 
                  className="absolute inset-0 flex flex-col justify-end p-4"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)'
                  }}
                >
                  <div className="text-white">
                    <span className="block text-[19px] font-serif leading-tight tracking-tight flex items-center gap-1">
                      32
                      <Star size={12} fill="currentColor" className="text-amber-400" />
                    </span>
                    <span className="block text-[8px] uppercase tracking-[0.14em] text-white/70">World Patrons</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                className="relative w-[158px] h-[158px] rounded-[28px] overflow-hidden shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => playVideo(2)}
              >
                <img 
                  src={CARD_IMAGES[2]} 
                  alt="Astraea Card" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div 
                  className="absolute inset-0 flex flex-col justify-end p-4"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)'
                  }}
                >
                  <div className="flex items-center gap-2.5 text-white">
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform">
                      <Play size={12} fill="currentColor" className="ml-0.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold tracking-wider uppercase">View Reel</span>
                      <span className="block text-[8px] text-white/60">Astraea</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Slider Dots at Bottom Left (at 60px) */}
            <div className="absolute bottom-[36px] left-[60px] flex gap-2 items-center pointer-events-auto">
              <span className="h-1.5 rounded-full bg-white transition-all duration-300 w-[28px]" />
              <span className="h-1.5 rounded-full bg-white/40 transition-all duration-300 w-[14px] hover:bg-white/70 cursor-pointer" />
              <span className="h-1.5 rounded-full bg-white/40 transition-all duration-300 w-[14px] hover:bg-white/70 cursor-pointer" />
              <span className="h-1.5 rounded-full bg-white/40 transition-all duration-300 w-[14px] hover:bg-white/70 cursor-pointer" />
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
