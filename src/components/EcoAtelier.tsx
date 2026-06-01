import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Trees, 
  Droplet, 
  Award, 
  Sparkles, 
  MapPin, 
  Undo2, 
  CheckCircle2, 
  ShieldCheck, 
  Leaf, 
  ArrowRight,
  Eye,
  X,
  Heart
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  waterSavedPerUnit: number;
  co2SavedPerUnit: number;
  image: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Apparel' | 'Footwear' | 'Accessories';
  rating: number;
  materials: string[];
  sourcingCountry: string;
  sourcingRegion: string;
  waterSaved: number; // liters
  co2Saved: number; // kg offset
  image: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string; image?: string }[];
}

export default function EcoAtelier() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Apparel' | 'Footwear' | 'Accessories'>('All');
  const [mounted, setMounted] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Smooth lerp mouse tracking for worlds-page biophilic viewport parallax
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  // Individual card 3D tilts for highly professional interactive hover dynamics
  const [cardTilts, setCardTilts] = useState<Record<string, { x: number; y: number }>>({});
  
  // Direct card dye previews with color coordinate alignment
  const [cardSelectedColors, setCardSelectedColors] = useState<Record<string, string>>({});

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('reverie-cart') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setMounted(true);

    // Dynamic mouse vector tracking for real-time physics-like responses
    let frameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 2 - 1;
      targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMx(currentX);
      setMy(currentY);
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('reverie-cart', JSON.stringify(cart));
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeColor, setActiveColor] = useState<string>('');
  const [activeSize, setActiveSize] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutTicket, setCheckoutTicket] = useState('');

  // Premium eco-friendly products
  const products: Product[] = [
    {
      id: 'rev-01',
      name: 'Eucalyptus Trench Coat',
      price: 245,
      category: 'Apparel',
      rating: 4.9,
      materials: ['85% Tencel Lyocell', '15% Organic Hemp'],
      sourcingCountry: 'Portugal',
      sourcingRegion: 'Guimarães',
      waterSaved: 2300,
      co2Saved: 12.4,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
      description: 'An elegant weatherproof trench masterfully loomed with unbleached organic hemp and silky sustainably-harvested eucalyptus lyocell. Completely biodegradable and chemical-free coloring.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Forest Sage', hex: '#2C3A2E', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop' },
        { name: 'Oatmeal Milk', hex: '#EAE1D4', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop' },
        { name: 'Madder Rust', hex: '#944436', image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=600&auto=format&fit=crop' }
      ]
    },
    {
      id: 'rev-02',
      name: 'Pine-Fiber Vegan Hikers',
      price: 180,
      category: 'Footwear',
      rating: 4.8,
      materials: ['Piñatex® Pineapple Leather', 'Natural Hevea Rubber'],
      sourcingCountry: 'Philippines',
      sourcingRegion: 'Manila Sourcing Farms',
      waterSaved: 1650,
      co2Saved: 9.8,
      image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop',
      description: 'Waterproof trail hikers crafted from Piñatex—patented plant fiber leather upcycled from discarded pineapple leaves. Mounted on unvulcanized natural rubber soles harvested from wild Hevea trees.',
      sizes: ['38', '40', '42', '44', '46'],
      colors: [
        { name: 'Earth Earth', hex: '#4B3F35', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop' },
        { name: 'Kelp Charcoal', hex: '#1C2522', image: 'https://images.unsplash.com/photo-1508150148166-77af2850990a?q=80&w=600&auto=format&fit=crop' }
      ]
    },
    {
      id: 'rev-03',
      name: 'Cork Daypack',
      price: 145,
      category: 'Accessories',
      rating: 4.7,
      materials: ['90% Natural Cork Bark', 'Recycled Marine Canvas'],
      sourcingCountry: 'Portugal',
      sourcingRegion: 'Alentejo Oak Groves',
      waterSaved: 980,
      co2Saved: 7.2,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
      description: 'An ultra-light, highly water-resistant companion constructed from premium shaved oak cork bark, harvested harmlessly without ever cutting down a single cork oak tree.',
      sizes: ['One Size'],
      colors: [
        { name: 'Sandy Cork', hex: '#D2AC84', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop' },
        { name: 'Obsidian Black', hex: '#141414', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop' }
      ]
    },
    {
      id: 'rev-04',
      name: 'Organic Indigo Knit Pull',
      price: 135,
      category: 'Apparel',
      rating: 4.9,
      materials: ['100% GOTS Certified Organic Cotton'],
      sourcingCountry: 'Turkey',
      sourcingRegion: 'Aegean Cotton Fields',
      waterSaved: 1800,
      co2Saved: 8.5,
      image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop',
      description: 'A plush, cloud-soft cable sweater colored exclusively with raw natural indigo plant extract. Sourced from GOTS certified family-owned cotton fields utilizing purely rainwater irrigation.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Organic Indigo', hex: '#1E2D4A', image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop' },
        { name: 'Unbleached Cream', hex: '#F9F6F0', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop' }
      ]
    },
    {
      id: 'rev-05',
      name: 'Recycled Ocean Trainers',
      price: 165,
      category: 'Footwear',
      rating: 4.8,
      materials: ['100% Ocean-Bound Post-Consumer Nylon', 'Algae Foam Sole'],
      sourcingCountry: 'Spain',
      sourcingRegion: 'Galician Coastline Cleanups',
      waterSaved: 1420,
      co2Saved: 11.2,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
      description: 'Ultralight performance lifestyle trainers woven with 12 recycled ocean plastic bottles. Backed by Bloom Algae Foam technology utilizing invasive algae blooms to clear freshwater rivers.',
      sizes: ['37', '39', '41', '43', '45'],
      colors: [
        { name: 'Ocean Mist', hex: '#879CA3', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop' },
        { name: 'Dune Sand', hex: '#E0D3C1', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop' }
      ]
    },
    {
      id: 'rev-06',
      name: 'Kelp Indigo Carryall',
      price: 120,
      category: 'Accessories',
      rating: 4.6,
      materials: ['Algae-based Leather alternative', 'Organic Hemp cordage'],
      sourcingCountry: 'Germany',
      sourcingRegion: 'North Sea Seaweed Farms',
      waterSaved: 740,
      co2Saved: 6.9,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
      description: 'A versatile overnight tote crafted using a completely polymer-free seaweed biomass skin that is both exceptionally durable and organically naturally compostable.',
      sizes: ['One Size'],
      colors: [
        { name: 'Algae Slate', hex: '#3E4E4A', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop' },
        { name: 'Hemp Raw', hex: '#D2C1A8', image: 'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?q=80&w=600&auto=format&fit=crop' }
      ]
    }
  ];

  // Filter items
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.materials.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate environmental benefits
  const totalWaterSaved = cart.reduce((acc, item) => acc + (item.waterSavedPerUnit * item.quantity), 0);
  const totalCo2Saved = cart.reduce((acc, item) => acc + (item.co2SavedPerUnit * item.quantity), 0);
  const totalTreesPlanted = Math.floor(cart.reduce((acc, item) => acc + item.quantity, 0) * 1.5);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Cart operations
  const addToCart = (product: Product, selectedColor: string, selectedSize: string) => {
    const colName = selectedColor || product.colors[0].name;
    const szName = selectedSize || product.sizes[0];
    const itemId = `${product.id}-${colName}-${szName}`;

    const existingIndex = cart.findIndex(item => item.id === itemId);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, {
        id: itemId,
        name: product.name,
        price: product.price,
        quantity: 1,
        color: colName,
        size: szName,
        waterSavedPerUnit: product.waterSaved,
        co2SavedPerUnit: product.co2Saved,
        image: product.colors.find(c => c.name === colName)?.image || product.image
      }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      setCart(cart.filter(i => i.id !== id));
    } else {
      setCart(cart.map(i => i.id === id ? { ...i, quantity: newQty } : i));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setActiveColor(cardSelectedColors[product.id] || product.colors[0].name);
    setActiveSize(product.sizes[0]);
  };

  const processMockCheckout = () => {
    setCheckoutTicket(`REV-ECO-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`);
    setCheckoutComplete(true);
  };

  const resetStorefront = () => {
    setCart([]);
    setCheckoutComplete(false);
    setIsCartOpen(false);
  };

  return (
    <div id="eco-atelier-store" className="min-h-screen bg-[#070506] text-white pt-28 px-6 md:px-12 pb-24 overflow-y-auto w-full relative z-[100] transition-opacity duration-700">
      
      {/* Custom Keyframe Styles for Premium Cinematic Touches */}
      <style>{`
        @keyframes driftUp {
          0% { transform: translateY(100vh) translateX(0px) scale(0.5); opacity: 0; }
          40% { opacity: 0.6; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-10vh) translateX(40px) scale(1.2); opacity: 0; }
        }
        @keyframes shinePulse {
          0%, 100% { opacity: 0.25; filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.2)); }
          50% { opacity: 0.6; filter: drop-shadow(0 0 35px rgba(20, 184, 166, 0.4)); }
        }
        @keyframes bannerSweep {
          0% { transform: scale(1.03) translate3d(0,0,0); }
          50% { transform: scale(1.08) translate3d(5px, 8px, 0); }
          100% { transform: scale(1.03) translate3d(0,0,0); }
        }
        .animate-drift-slow-1 { animation: driftUp 18s linear infinite; }
        .animate-drift-slow-2 { animation: driftUp 24s linear infinite; animation-delay: -5s; }
        .animate-drift-slow-3 { animation: driftUp 29s linear infinite; animation-delay: -12s; }
        .animate-drift-slow-4 { animation: driftUp 34s linear infinite; animation-delay: -2s; }
        
        .animate-banner-landscape { animation: bannerSweep 28s ease-in-out infinite; }
        .animate-shine-eco { animation: shinePulse 6s ease-in-out infinite; }
      `}</style>

      {/* Dynamic Floating Particles Backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute left-[10%] w-1.5 h-1.5 rounded-full bg-emerald-400 animate-drift-slow-1" />
        <div className="absolute left-[35%] w-2 h-2 rounded-full bg-teal-400 animate-drift-slow-2" />
        <div className="absolute left-[65%] w-1 h-1 rounded-full bg-emerald-300 animate-drift-slow-3" />
        <div className="absolute right-[15%] w-2.5 h-2.5 rounded-full bg-emerald-500 animate-drift-slow-4" />
      </div>

      {/* Subtle nature background gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-950/15 blur-[160px] pointer-events-none select-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-stone-900/15 blur-[140px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Hero Banner (Worlds-Page inspired Parallax Portal) */}
        <div 
          id="store-banner" 
          className="relative min-h-[460px] md:min-h-[500px] rounded-[48px] overflow-hidden mb-16 border border-white/10 bg-[#0a0708] shadow-[0_45px_120px_rgba(0,0,0,0.85)] flex items-center p-8 md:p-16 transition-all duration-1000 ease-out z-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translate3d(0,0,0)' : 'translate3d(0, 40px, 0)'
          }}
        >
          {/* Immersive Parallax Background Layers */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Deep Forest Layer (responds to mouse mx and my) */}
            <div 
              className="absolute inset-[-15%] bg-cover bg-center opacity-25 select-none transition-transform duration-300 ease-out"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop")',
                transform: `translate3d(${mx * -22}px, ${my * -22}px, 0) scale(1.08)`,
              }}
              referrerPolicy="no-referrer"
            />
            {/* Ambient Light Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070506] via-[#070506]/90 to-[#070506]/40" />
            {/* Ambient Emerald Aura Sphere */}
            <div 
              className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-[100px] transition-transform duration-700 pointer-events-none"
              style={{
                transform: `translate3d(${mx * 30}px, ${my * 30}px, 0)`,
              }}
            />
          </div>

          {/* Grid layout splitting the Banner into Portal Viewport & Rich Editorial Sourcing Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full relative z-10 items-center">
            
            {/* Editorial description text column (LHS) */}
            <div className="col-span-1 lg:col-span-7 text-left flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-[10px] text-emerald-400 font-mono tracking-[0.3em] uppercase mb-5 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full max-w-max">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Atelier Portal Active
              </div>
              
              <h1 className="font-serif text-4xl md:text-6xl tracking-wide uppercase leading-[1.05] text-white font-light mb-6">
                Wander the <br/>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 animate-pulse">Reverie Atelier</span>
              </h1>
              
              <p className="font-sans text-[13px] md:text-sm text-neutral-300 leading-relaxed max-w-lg mb-8">
                Every garment, pair of footwear, and accessory we shape is born from an intimate dialog with nature. Our coordinates protect rainforest watersheds, absorb industrial emissions, and honor small family-run agricultural networks.
              </p>

              {/* Micro statistics of the sourcing center */}
              <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5">
                <div>
                  <span className="block text-[9px] font-mono tracking-wider text-neutral-500 uppercase">Atmosphere Control</span>
                  <span className="font-serif text-lg text-emerald-300 mt-1 block">100% Negative Carbon</span>
                </div>
                <div className="border-l border-white/5 pl-8">
                  <span className="block text-[9px] font-mono tracking-wider text-neutral-500 uppercase">Active Forestry</span>
                  <span className="font-serif text-lg text-teal-300 mt-1 block">34,210 Trees Seeded</span>
                </div>
                <div className="border-l border-white/5 pl-8">
                  <span className="block text-[9px] font-mono tracking-wider text-neutral-500 uppercase">Sourced Zones</span>
                  <span className="font-serif text-lg text-sky-300 mt-1 block">6 Communities Worldwide</span>
                </div>
              </div>
            </div>

            {/* Biophilic Floating Portal Circular Viewport column (RHS, highly animative and reacts to mouse) */}
            <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end items-center relative">
              <div 
                className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full p-1.5 bg-gradient-to-tr from-emerald-500/30 via-teal-500/10 to-transparent shadow-[0_0_60px_rgba(16,185,129,0.15)] flex items-center justify-center transition-all duration-700 hover:scale-105 group cursor-pointer"
                style={{
                  transform: `translate3d(${mx * 18}px, ${my * 18}px, 0) rotate(${mx * 8}deg)`
                }}
              >
                {/* Lens flare rings */}
                <div className="absolute inset-0 rounded-full border border-white/10 animate-spin" style={{ animationDuration: '40s' }} />
                <div className="absolute inset-3 rounded-full border border-emerald-500/20 border-dashed animate-spin" style={{ animationDuration: '25s' }} />

                {/* Core Image Portal */}
                <div className="w-full h-full rounded-full overflow-hidden relative border border-white/15">
                  <img 
                    src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop" 
                    alt="Atelier Core Portal"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
                  
                  {/* Center Label HUD Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
                    <span className="text-[9px] font-mono tracking-[0.3em] text-emerald-300 uppercase bg-[#070506]/80 px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-sm shadow-xl">
                      Eco Chamber 01
                    </span>
                    <span className="font-serif text-sm text-white font-light tracking-wide mt-3 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Deep Moss Forest
                    </span>
                  </div>
                </div>

                {/* Tiny orbiting satellite node */}
                <div 
                  className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-emerald-400 border border-white/20 shadow-lg flex items-center justify-center"
                  style={{
                    transform: `translate3d(${Math.sin(mx * 5) * 15}px, ${Math.cos(my * 5) * 15}px, 0)`
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Global Sourcing Senses Row / Highlight Stat Cards */}
        <div 
          id="eco-highlights-row" 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-[150ms] ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translate3d(0,0,0)' : 'translate3d(0, 30px, 0)'
          }}
        >
          
          <div className="bg-white/[0.01] border border-white/5 rounded-[28px] p-7 flex items-start gap-5 hover:border-sky-500/30 hover:bg-black/30 transition-all duration-500 shadow-xl group">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-110 transition-transform">
              <Droplet size={24} />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-sans tracking-[15%] text-neutral-500 uppercase">Aesthetic Hydration</span>
              <span className="block font-serif text-lg text-white mt-1">Water Protected</span>
              <p className="text-[12px] text-neutral-400 font-sans mt-2 leading-relaxed">Sourcing certified moisture loops requiring up to 90% less crop watering compared to traditional systems.</p>
            </div>
          </div>

          <div className="bg-white/[0.01] border border-white/5 rounded-[28px] p-7 flex items-start gap-5 hover:border-emerald-500/30 hover:bg-black/30 transition-all duration-500 shadow-xl group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
              <Trees size={24} />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-sans tracking-[15%] text-neutral-500 uppercase">Tree Canopy Pledge</span>
              <span className="block font-serif text-lg text-white mt-1">Afforestation Pledge</span>
              <p className="text-[12px] text-neutral-400 font-sans mt-2 leading-relaxed">For every accessory or garment adopted, we plant exactly 1.5 native broadleaf tree saplings in degraded forests.</p>
            </div>
          </div>

          <div className="bg-white/[0.01] border border-white/5 rounded-[28px] p-7 flex items-start gap-5 hover:border-rose-500/30 hover:bg-black/30 transition-all duration-500 shadow-xl group">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-sans tracking-[15%] text-neutral-500 uppercase">Trans-Origin Guarantee</span>
              <span className="block font-serif text-lg text-white mt-1">Strict Traceability</span>
              <p className="text-[12px] text-neutral-400 font-sans mt-2 leading-relaxed">We track all plant fibers via encrypted geographic receipts to ensure complete zero-waste, safe working spaces.</p>
            </div>
          </div>

        </div>

        {/* Shop Navigation, Search & Controls */}
        <div id="shop-controls" className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-6 border-b border-white/5 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Apparel', 'Footwear', 'Accessories'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-sans font-medium transition-all duration-300 pointer-events-auto cursor-pointer select-none ${
                  activeCategory === cat 
                    ? 'bg-emerald-500 text-[#070506] shadow-xl shadow-emerald-500/10 font-bold' 
                    : 'bg-white/[0.03] text-neutral-400 border border-white/5 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field & Drawer Triggers */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-[250px]">
              <input
                type="text"
                placeholder="Search raw materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-full px-5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/30 transition-all font-sans"
              />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3.5 bg-white/[0.03] border border-white/5 rounded-full text-white hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all cursor-pointer shadow-lg group"
            >
              <ShoppingBag size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-black text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#070506]">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Live Environment Offset Counter (Cart Dependent) */}
        {cart.length > 0 && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all text-left">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400">
                <Trees size={28} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-emerald-400 uppercase">Live Environmental Ledger</span>
                <h3 className="font-serif text-lg font-normal text-white mt-1">Your adoption carbon offset impact.</h3>
              </div>
            </div>

            <div className="flex gap-4 md:gap-8 flex-wrap">
              <div className="text-left bg-white/5 px-4 py-2 rounded-2xl border border-white/5 min-w-[120px]">
                <span className="block text-[9px] text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                  <Droplet size={10} className="text-sky-400" /> Pure Water Saved
                </span>
                <span className="font-serif text-lg text-sky-400">{totalWaterSaved.toLocaleString()} L</span>
              </div>
              <div className="text-left bg-white/5 px-4 py-2 rounded-2xl border border-white/5 min-w-[120px]">
                <span className="block text-[9px] text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                  <Leaf size={10} className="text-rose-400" /> CO₂ Blocked
                </span>
                <span className="font-serif text-lg text-rose-400">{totalCo2Saved.toFixed(1)} kg</span>
              </div>
              <div className="text-left bg-white/5 px-4 py-2 rounded-2xl border border-white/5 min-w-[120px]">
                <span className="block text-[9px] text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                  <Trees size={10} className="text-emerald-400" /> Trees Sown
                </span>
                <span className="font-serif text-lg text-emerald-400">{totalTreesPlanted} Saplings</span>
              </div>
            </div>
          </div>
        )}

        {/* Store Grid */}
        <div id="store-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p, index) => {
            const isFaved = favorites.includes(p.id);
            const selectedCol = cardSelectedColors[p.id] || p.colors[0].name;
            const currentTilt = cardTilts[p.id] || { x: 0, y: 0 };
            const isHovered = hoveredCardId === p.id;

            // Get background glow matching dye tone for premium micro atmosphere
            const selectedColorObj = p.colors.find(c => c.name === selectedCol) || p.colors[0];
            const dyeGlowStyle = isHovered 
              ? { boxShadow: `0 35px 80px -15px rgba(0, 0, 0, 0.9), 0 0 40px -5px ${selectedColorObj.hex}22` } 
              : {};

            const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left; 
              const y = e.clientY - rect.top;  
              const px = (x / rect.width) * 2 - 1; 
              const py = (y / rect.height) * 2 - 1;
              setCardTilts(prev => ({
                ...prev,
                [p.id]: { x: px * 10, y: -py * 10 }
              }));
            };

            const handleCardMouseLeave = () => {
              setCardTilts(prev => ({
                ...prev,
                [p.id]: { x: 0, y: 0 }
              }));
              setHoveredCardId(null);
            };

            return (
              <div
                key={p.id}
                onMouseMove={handleCardMouseMove}
                onMouseEnter={() => setHoveredCardId(p.id)}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted 
                    ? `perspective(1000px) rotateX(${currentTilt.y}deg) rotateY(${currentTilt.x}deg) translate3d(0, ${isHovered ? '-12px' : '0px'}, ${isHovered ? '20px' : '0px'})`
                    : 'translate3d(0, 35px, 0) scale(0.95)',
                  transition: isHovered ? 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)' : 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: isHovered ? '0ms' : `${index * 60}ms`,
                  ...dyeGlowStyle
                }}
                className={`bg-[#0d0a0b]/40 border rounded-[36px] overflow-hidden flex flex-col group transition-all duration-500 select-none pointer-events-auto cursor-default ${
                  isHovered ? 'border-emerald-500/40 bg-[#0e0a0c]/80' : 'border-white/5'
                }`}
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950 border-b border-white/5">
                  <img
                    src={p.colors.find(c => c.name === selectedCol)?.image || p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 bg-[#070506]/90 backdrop-blur-[10px] border border-white/10 text-white text-[9px] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-mono z-10">
                    {p.category}
                  </span>

                  {/* Favorite button */}
                  <button
                    onClick={() => toggleFavorite(p.id)}
                    className={`absolute top-4 right-4 p-2.5 bg-[#070506]/90 backdrop-blur-[10px] border border-white/10 rounded-full transition-all duration-300 z-10 ${
                      isFaved ? 'text-rose-400 scale-110 shadow-[0_0_15px_rgba(251,113,133,0.3)]' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Heart size={13} fill={isFaved ? 'currentColor' : 'none'} />
                  </button>

                  {/* High-End Frosted Sliding Coordinate overlay on bottom hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/85 to-transparent backdrop-blur-[3px] border-t border-white/5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-between text-[11px] text-neutral-300">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">
                      <MapPin size={11} className="text-emerald-400 animate-pulse" /> {p.sourcingCountry}
                    </span>
                    <span className="text-neutral-400 text-[10px] uppercase font-mono tracking-wider bg-white/5 px-2.5 py-0.5 rounded border border-white/5">
                      Trace Verified
                    </span>
                  </div>
                </div>

                {/* Card Info Details */}
                <div className="p-7 flex flex-col flex-1 text-left relative">
                  
                  {/* Title & Price info */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-lg group-hover:text-emerald-300 transition-colors uppercase leading-tight font-normal tracking-wide">
                      {p.name}
                    </h3>
                    <span className="font-mono text-base text-white/95 font-medium">${p.price}</span>
                  </div>

                  <p className="text-[12px] text-neutral-400 font-sans leading-relaxed mb-4 flex-1">
                    {p.description.slice(0, 105)}...
                  </p>

                  {/* Raw Dye picker section integrated directly in card */}
                  <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-4 mb-4">
                    <span className="text-[9px] uppercase font-mono tracking-[0.15em] text-neutral-500">
                      dye Choice: <span className="text-neutral-300 font-medium">{selectedCol}</span>
                    </span>
                    <div className="flex gap-2">
                      {p.colors.map((col) => {
                        const isSelected = selectedCol === col.name;
                        return (
                          <button
                            key={col.name}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardSelectedColors(prev => ({ ...prev, [p.id]: col.name }));
                            }}
                            className={`w-4 h-4 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                              isSelected ? 'border-emerald-400 scale-125' : 'border-transparent hover:scale-110'
                            }`}
                            title={col.name}
                          >
                            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: col.hex }} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sustainable Benefits Badges */}
                  <div className="flex items-center gap-3 pt-3 mb-6 border-t border-white/5">
                    <div className="text-[10px] text-sky-400 font-mono flex items-center gap-1.5 bg-sky-500/5 px-3 py-1.5 rounded-xl border border-sky-500/10 transition-colors group-hover:border-sky-500/20">
                      <Droplet size={11} className="text-sky-400" /> -{p.waterSaved}L Water
                    </div>
                    <div className="text-[10px] text-rose-400 font-mono flex items-center gap-1.5 bg-rose-500/5 px-3 py-1.5 rounded-xl border border-rose-500/10 transition-colors group-hover:border-rose-500/20">
                      <Leaf size={11} className="text-rose-400" /> -{p.co2Saved}kg CO₂
                    </div>
                  </div>

                  {/* Direct interactive actions */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button
                      onClick={() => openQuickView(p)}
                      className="w-full bg-white/[0.02] border border-white/5 hover:bg-neutral-800 hover:border-white/15 hover:text-white transition-all font-sans text-[10px] uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-neutral-300"
                    >
                      <Eye size={12} /> Explore
                    </button>
                    <button
                      onClick={() => addToCart(p, selectedCol, p.sizes[0])}
                      className="w-full bg-emerald-500 text-black font-bold hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all font-sans text-[10px] uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_20px_rgba(16,185,129,0.15)]"
                    >
                      <ShoppingBag size={12} /> Quick Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* QUICK VIEW DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4 pt-12 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0d0a0b]/95 border border-white/10 rounded-[32px] p-6 md:p-8 shadow-3xl text-left my-auto">
            
            {/* Close Toggle */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/20 transition-all text-white cursor-pointer z-20"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Side: Detail Image & Trace map */}
              <div>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 mb-4 border border-white/5">
                  <img
                    src={selectedProduct.colors.find(c => c.name === activeColor)?.image || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover animate-fade-in"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Sourcing Transparency Widget */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <span className="block text-[9px] uppercase tracking-widest text-[#9e9e9e] mb-2 flex items-center gap-1 font-bold">
                    <MapPin size={10} className="text-emerald-400" /> Raw Materials Origin map
                  </span>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="block text-white font-medium">{selectedProduct.sourcingRegion}</span>
                      <span className="block text-[10px] text-neutral-500 mt-0.5">{selectedProduct.sourcingCountry} Sourcing Zone</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                      Trace Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: details and select customization configs */}
              <div className="flex flex-col">
                <span className="inline-flex max-w-max text-[9px] tracking-wider uppercase font-sans text-neutral-400 bg-white/5 outline-emerald-500 border border-white/5 px-2.5 py-0.5 rounded mb-3">
                  {selectedProduct.category}
                </span>

                <h1 className="font-serif text-2xl uppercase tracking-wider mb-2 leading-tight">
                  {selectedProduct.name}
                </h1>

                <span className="font-serif text-xl font-medium text-emerald-400 mb-4">
                  ${selectedProduct.price}
                </span>

                <p className="text-[12px] text-neutral-400 font-sans leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>

                {/* Materials Breakdown List */}
                <div className="mb-6">
                  <span className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-2 font-semibold">Materials & Composition:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.materials.map((m) => (
                      <span key={m} className="text-[11px] font-sans bg-white/5 px-3 py-1 rounded-lg border border-white/5 text-white/90">
                        ☘️ {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Choice Customization: Colors */}
                <div className="mb-6">
                  <span className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-2 font-semibold">Raw Natural Dye Choice: ({activeColor})</span>
                  <div className="flex gap-2">
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setActiveColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                          activeColor === c.name ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        title={c.name}
                      >
                        <span className="w-5 h-5 rounded-full inline-block" style={{ backgroundColor: c.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Choice Customization: Sizes */}
                {selectedProduct.sizes[0] !== 'One Size' && (
                  <div className="mb-6">
                    <span className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-2 font-semibold">Coordinate Size: ({activeSize})</span>
                    <div className="flex gap-2">
                      {selectedProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setActiveSize(s)}
                          className={`w-10 h-10 rounded-xl border text-[11px] font-sans font-medium hover:border-white transition-all cursor-pointer ${
                            activeSize === s ? 'bg-white text-black border-white' : 'border-white/10 bg-white/5 text-neutral-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Environmental Stat saved */}
                <div className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-2xl p-4 mb-6 flex justify-around">
                  <div className="text-center">
                    <span className="text-[9px] block text-neutral-400 tracking-wider">PURE WATER SAVED</span>
                    <span className="text-base font-serif font-semibold text-sky-400 mt-1 block">{selectedProduct.waterSaved} Liters</span>
                  </div>
                  <div className="text-center border-l border-white/5 pl-4">
                    <span className="text-[9px] block text-neutral-400 tracking-wider">CO₂ OFFSET SAVED</span>
                    <span className="text-base font-serif font-semibold text-rose-400 mt-1 block">{selectedProduct.co2Saved} kg</span>
                  </div>
                </div>

                {/* CTA Action */}
                <button
                  onClick={() => {
                    addToCart(selectedProduct, activeColor, activeSize);
                    setSelectedProduct(null);
                  }}
                  className="w-full mt-auto bg-emerald-500 text-black font-semibold hover:bg-emerald-400 font-sans text-xs uppercase tracking-[0.16em] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Adopt to Shopping Bag <ArrowRight size={14} />
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* SHOPPING CART DRAWER / ECO-OUTLET SLIDEOUT */}
      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 z-[200] w-full max-w-md bg-[#0a0708]/95 border-l border-white/10 backdrop-blur-lg flex flex-col p-6 shadow-3xl text-left pointer-events-auto">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
            <h2 className="font-serif text-lg uppercase tracking-wider flex items-center gap-2">
              <ShoppingBag size={18} /> Your Eco-Cart
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Cart Contents list */}
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-10">
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-4">
                <ShoppingBag size={24} />
              </div>
              <p className="font-serif text-base text-neutral-400">Bag is entirely empty</p>
              <p className="text-xs text-neutral-500 font-sans max-w-[240px] mt-2">Explore the Reverie collection and adopt plant-first choices into your life dynamics.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 bg-white/[0.04] border border-white/10 text-white hover:bg-white/10 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-wider font-semibold"
              >
                Continue wandering
              </button>
            </div>
          ) : (
            <div className="flex flex-col flex-1 h-0 overflow-y-auto pr-1 gap-4">
              
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                  <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-neutral-950 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <div className="flex flex-col flex-1 text-left justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-serif uppercase tracking-wide pr-2">{item.name}</h4>
                        <span className="text-[11px] font-sans font-medium">${item.price * item.quantity}</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 mt-1 block">
                        Dye: {item.color} | Size: {item.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 bg-white/5 border border-white/15 rounded hover:bg-neutral-800 transition-colors cursor-pointer text-white"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-[11px] font-sans w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 bg-white/5 border border-white/15 rounded hover:bg-neutral-800 transition-colors cursor-pointer text-white"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Carbon impact stats */}
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 text-left mt-4">
                <span className="block text-[9px] uppercase tracking-wider text-emerald-400 font-bold mb-2">DYNAMIC ENVIRONMENTAL REWARD PLEDGE</span>
                <div className="space-y-1.5 text-[11px] text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Freshwater Conserved:</span>
                    <span className="font-serif text-sky-400 font-medium">{totalWaterSaved} Liters</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Emission Avoidance:</span>
                    <span className="font-serif text-rose-400 font-medium">{totalCo2Saved.toFixed(1)} kg CO₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Trees Seeded in Canopy:</span>
                    <span className="font-serif text-emerald-400 font-medium">{totalTreesPlanted} Saplings</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Checkout pricing details block */}
          {cart.length > 0 && (
            <div className="mt-auto border-t border-white/5 pt-4 space-y-4">
              <div className="space-y-1.5 font-sans text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Carbon-neutral Shipment:</span>
                  <span className="text-emerald-400">Pledged Free</span>
                </div>
                <div className="flex justify-between text-sm text-white font-medium border-t border-white/5 pt-2">
                  <span className="font-serif text-neutral-300 uppercase">Cart Total:</span>
                  <span className="font-serif text-base text-white">${cartTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={processMockCheckout}
                className="w-full bg-white text-[#0a0608] hover:bg-neutral-200 uppercase tracking-widest font-sans text-xs py-4 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                Secure Purchase & Plant Trees <ArrowRight size={14} />
              </button>

              <div className="flex justify-center items-center gap-2 text-[10px] text-neutral-500">
                <ShieldCheck size={12} className="text-emerald-500" /> Secure unbleached checkout channel
              </div>
            </div>
          )}

        </div>
      )}

      {/* CHECKOUT PURCHASE COMPLETE CERTIFICATE TICKETS */}
      {checkoutComplete && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4 pt-12 backdrop-blur-lg overflow-y-auto">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-[#2c3d2e] rounded-[36px] p-8 shadow-3xl text-center my-auto overflow-hidden">
            
            {/* Visual ambient green halo rings */}
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-emerald-600/10 blur-[80px]" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-teal-600/10 blur-[80px]" />

            <div className="relative z-10">
              {/* Animated eco seal circle check badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                <Trees size={32} />
              </div>

              <h2 className="font-serif text-3xl text-white uppercase tracking-wider mb-2">
                Pledged Accomplished
              </h2>
              <p className="font-sans text-[13px] text-neutral-400 max-w-[340px] mx-auto mb-8 leading-relaxed">
                Your adoption coordinates are fully aligned. We have successfully registered your carbon offset coordinates on the global sustainable network.
              </p>

              {/* Certificate layout */}
              <div className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-5 text-left font-mono relative overflow-hidden mb-8">
                <div className="absolute -top-4 -right-4 w-20 h-20 text-emerald-500/5 font-serif text-[72px] pointer-events-none select-none">
                  Leaf
                </div>

                <div className="border-b border-white/5 pb-2.5 mb-3 text-[10px] text-neutral-500 uppercase tracking-widest flex items-center justify-between">
                  <span>Reverie Botanical Ledger</span>
                  <span className="text-emerald-400">Green Certified</span>
                </div>

                <div className="space-y-2 text-xs text-neutral-300">
                  <div>
                    <span className="text-neutral-500 uppercase">Order Coordinate ID:</span>
                    <span className="text-yellow-200 ml-1.5 block md:inline">{checkoutTicket}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 uppercase">Nature Conserved:</span>
                    <span className="text-sky-400 ml-1.5 font-sans font-bold">{totalWaterSaved} Liters of Water</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 uppercase">CO₂ Footprint Avoided:</span>
                    <span className="text-rose-400 ml-1.5 font-sans font-bold">{totalCo2Saved.toFixed(1)} kg</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 uppercase">Certified Trees Seeded:</span>
                    <span className="text-emerald-400 ml-1.5 font-sans font-bold">{totalTreesPlanted} Broadleaf Saplings</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 text-[10px] text-neutral-500 leading-relaxed italic">
                    Coordinates planted under climate registry standards. Handled securely with unvulcanized plant shipping cases.
                  </div>
                </div>
              </div>

              {/* Close CTAs */}
              <div className="flex gap-4">
                <button
                  onClick={resetStorefront}
                  className="flex-1 bg-white text-black font-semibold uppercase tracking-wider font-sans text-xs py-3.5 rounded-xl hover:bg-neutral-200 transition-colors"
                >
                  Continue Wandering
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
