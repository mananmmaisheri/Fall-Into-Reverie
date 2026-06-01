import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { Sparkles, Droplet, Leaf, ShoppingBag, ArrowRight, Check, Heart } from 'lucide-react';

interface SceneCTAProps {
  scrollProgress: number;
  onChangeView?: (view: 'home' | 'about' | 'atelier' | 'connect') => void;
}

interface FloatingProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  materials: string[];
  waterSaved: number;
  co2Saved: number;
  image: string;
  description: string;
}

export default function SceneCTA({ scrollProgress, onChangeView }: SceneCTAProps) {
  const isMobile = useIsMobile();
  
  // Staggered timeline curves
  const opacity = Math.max(0, Math.min(1, (scrollProgress - 0.40) / 0.12));
  
  // Title fades and rises earlier
  const titleOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.42) / 0.18));
  const titleY = isMobile ? 0 : Math.max(0, 35 * (1 - titleOpacity));

  // Card progress stagger thresholds
  const p1 = Math.max(0, Math.min(1, (scrollProgress - 0.44) / 0.22));
  const p2 = Math.max(0, Math.min(1, (scrollProgress - 0.48) / 0.22));
  const p3 = Math.max(0, Math.min(1, (scrollProgress - 0.52) / 0.22));
  const cardProgressList = [p1, p2, p3];

  const getCardStyle = (index: number, progress: number) => {
    if (isMobile) {
      const scale = 0.88 + 0.12 * progress;
      const translateY = 45 * (1 - progress);
      const blur = 6 * (1 - progress);
      return {
        opacity: progress,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        filter: `blur(${blur}px)`,
        pointerEvents: progress > 0.65 ? ('auto' as const) : ('none' as const)
      };
    }

    // Desktop: Premium 3D flight trajectory emerging elegantly from center gates
    const scale = 0.4 + 0.6 * progress;
    const blur = 12 * (1 - progress);
    
    let translateX = 0;
    let translateY = 120 * (1 - progress);
    let rotate = 0;

    if (index === 0) {
      translateX = -140 * (1 - progress);
      rotate = -10 * (1 - progress);
    } else if (index === 1) {
      translateY = 160 * (1 - progress);
    } else if (index === 2) {
      translateX = 140 * (1 - progress);
      rotate = 10 * (1 - progress);
    }

    return {
      opacity: progress,
      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
      filter: `blur(${blur}px)`,
      pointerEvents: progress > 0.65 ? ('auto' as const) : ('none' as const)
    };
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Show premium physical eco products aligned to the nature theme
  const floatingProducts: FloatingProduct[] = [
    {
      id: 'rev-01',
      name: 'Eucalyptus Trench Coat',
      price: 245,
      category: 'Apparel',
      materials: ['85% Tencel Lyocell', '15% Organic Hemp'],
      waterSaved: 2300,
      co2Saved: 12.4,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
      description: 'An elegant weatherproof trench masterfully loomed with unbleached organic hemp and silky eucalyptus lyocell.'
    },
    {
      id: 'rev-02',
      name: 'Pine-Fiber Vegan Hikers',
      price: 180,
      category: 'Footwear',
      materials: ['Piñatex® Pineapple Leather', 'Natural Hevea Sole'],
      waterSaved: 1650,
      co2Saved: 9.8,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
      description: 'Waterproof trail hikers crafted from Piñatex—patented plant fiber leather upcycled from pineapple leaves.'
    },
    {
      id: 'rev-03',
      name: 'Cork Daypack',
      price: 145,
      category: 'Accessories',
      materials: ['90% Natural Cork Bark', 'Recycled Canvas'],
      waterSaved: 980,
      co2Saved: 7.2,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
      description: 'An ultra-light, highly water-resistant pack constructed from premium shaved oak cork bark.'
    }
  ];

  // Functional cart adder syncing to standard storage
  const handleAdoptToBag = (product: FloatingProduct) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('reverie-cart') || '[]');
      const itemId = `${product.id}-Default-Default`;
      
      const existingIndex = currentCart.findIndex((item: any) => item.id === itemId);
      if (existingIndex > -1) {
        currentCart[existingIndex].quantity += 1;
      } else {
        currentCart.push({
          id: itemId,
          name: product.name,
          price: product.price,
          quantity: 1,
          color: 'Original Trace',
          size: 'M',
          waterSavedPerUnit: product.waterSaved,
          co2SavedPerUnit: product.co2Saved,
          image: product.image
        });
      }

      localStorage.setItem('reverie-cart', JSON.stringify(currentCart));
      
      // Dispatch storage event to trigger any multi-listeners
      window.dispatchEvent(new Event('storage'));

      // Pop Toast notification
      setToastMessage(`☘️ ${product.name} successfully aligned to Eco Bag!`);
    } catch (err) {
      setToastMessage('Could not register item coordinates.');
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Clear toast after timeout
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div 
      id="scene-cta-root"
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-[46] pt-16 pb-6 overflow-y-auto"
      style={{ 
        opacity,
        display: opacity === 0 ? 'none' : 'flex',
        transition: 'opacity 0.15s linear'
      }}
    >
      <style>{`
        @keyframes floatSlow1 {
          0%, 100% { transform: translateY(0px) rotate(0.5deg); }
          50% { transform: translateY(-14px) rotate(-0.5deg); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translateY(-8px) rotate(-0.5deg); }
          50% { transform: translateY(6px) rotate(0.5deg); }
        }
        @keyframes floatSlow3 {
          0%, 100% { transform: translateY(6px) rotate(0.5deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-float-1 { animation: floatSlow1 8s ease-in-out infinite; }
        .animate-float-2 { animation: floatSlow2 9s ease-in-out infinite; }
        .animate-float-3 { animation: floatSlow3 7s ease-in-out infinite; }
      `}</style>

      {/* Floating alert toast notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[999] bg-[#0a0708]/95 border border-emerald-500/30 px-6 py-3 rounded-full text-xs font-sans text-emerald-400 font-semibold shadow-2xl flex items-center gap-2 animate-bounce pointer-events-auto">
          <Sparkles size={14} className="text-emerald-400" />
          {toastMessage}
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        
        {/* Main Heading Text */}
        <div 
          className="text-center max-w-2xl mx-auto mb-10 shrink-0 pointer-events-auto transition-all duration-75"
          style={{
            opacity: titleOpacity,
            transform: `translate3d(0, ${titleY}px, 0)`
          }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-sans tracking-[0.2em] uppercase mb-3 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <Sparkles size={12} /> Immersive Storefront
          </span>
          <h2 
            className="font-serif font-normal text-white uppercase tracking-[0.03em] mb-3 select-none leading-none"
            style={{
              fontSize: isMobile ? '28px' : 'clamp(32px, 4.5vw, 54px)',
              textShadow: '0 2px 20px rgba(0,0,0,0.7)'
            }}
          >
            ADOPT BIOPHILIC APPAREL
          </h2>
          <p className="font-sans text-neutral-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Floating forms created using completely water-conservative weaves, unbleached organic cellulose, and certified local plant dyes.
          </p>
        </div>

        {/* 3 Floating Products Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl mx-auto mb-10 items-stretch">
          {floatingProducts.map((p, index) => {
            const isFaved = favorites.includes(p.id);
            // Assign different float speeds
            const floatClass = index === 0 ? 'animate-float-1' : index === 1 ? 'animate-float-2' : 'animate-float-3';
            const progress = cardProgressList[index];
            const cardSpaceStyle = getCardStyle(index, progress);
            
            return (
              <div
                key={p.id}
                style={cardSpaceStyle}
                className="transition-all duration-75 ease-out flex"
              >
                <div
                  className={`${floatClass} w-full bg-black/45 backdrop-blur-[12px] border border-white/10 rounded-[32px] overflow-hidden p-5 flex flex-col text-left hover:border-emerald-500/30 hover:bg-black/60 transition-all duration-300 group shadow-2xl select-text pointer-events-auto`}
                >
                  {/* Image panel */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 mb-4 border border-white/5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-[#070506]/90 backdrop-blur-[4px] border border-white/10 text-white text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      {p.category}
                    </span>
                    
                    {/* Save state toggle */}
                    <button
                      onClick={(e) => toggleFavorite(p.id, e)}
                      className={`absolute top-3 right-3 p-2 bg-[#070506]/90 backdrop-blur-[4px] border border-white/10 rounded-full transition-colors ${
                        isFaved ? 'text-rose-400' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Heart size={12} fill={isFaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Details layout */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline gap-2 mb-1.5">
                        <h4 className="font-serif text-base text-white group-hover:text-emerald-400 transition-colors uppercase truncate" title={p.name}>
                          {p.name}
                        </h4>
                        <span className="font-serif text-sm font-semibold text-white/90 shrink-0">${p.price}</span>
                      </div>

                      <p className="text-[11px] text-neutral-400 font-sans leading-relaxed mb-4 h-12 overflow-hidden">
                        {p.description}
                      </p>
                    </div>

                    {/* Ecological metrics stats */}
                    <div className="space-y-1.5 pt-3 border-t border-white/5 mb-4 font-sans text-[10px]">
                      <div className="flex justify-between text-neutral-500">
                        <span>Water Avoided:</span>
                        <span className="text-sky-400 font-semibold">{p.waterSaved} Liters</span>
                      </div>
                      <div className="flex justify-between text-neutral-500">
                        <span>CO₂ offset saved:</span>
                        <span className="text-rose-400 font-semibold">{p.co2Saved} kg</span>
                      </div>
                    </div>

                    {/* Quick buy actions */}
                    <button
                      onClick={() => handleAdoptToBag(p)}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#070506] font-semibold font-sans text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-[0.98] transition-all"
                    >
                      <ShoppingBag size={12} /> Adopt to bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Catalog trigger */}
        {onChangeView && (
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 shrink-0 pointer-events-auto">
            <button
              onClick={() => onChangeView('atelier')}
              className="px-6 py-3.5 bg-white text-[#0a0608] hover:bg-neutral-100 font-sans text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5"
            >
              Enter Full Atelier Storefront <ArrowRight size={13} />
            </button>
            <span className="text-xs text-neutral-500 font-sans">
              Or use navbar topics to explore source ledger.
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
