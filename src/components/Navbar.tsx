import { useIsMobile } from '../hooks/useIsMobile';

interface NavbarProps {
  activeView: string;
  onChangeView: (view: 'home' | 'about' | 'atelier' | 'connect') => void;
}

export default function Navbar({ activeView, onChangeView }: NavbarProps) {
  const isMobile = useIsMobile();

  // Navigation link styling helper
  const linkClass = (view: 'home' | 'about' | 'atelier' | 'connect') => 
    `uppercase text-[12px] tracking-[0.12em] font-sans cursor-pointer select-none transition-all duration-300 ${
      activeView === view 
        ? 'text-emerald-400 font-bold border-b border-emerald-500/30 pb-0.5' 
        : 'text-white/80 hover:text-white'
    }`;

  // Symmetric Star SVG component
  const StarLogo = () => (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 28 28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onChangeView('home')}
      className={`transition-all duration-300 cursor-pointer ${
        activeView === 'home' ? 'text-emerald-400' : 'text-white'
      } hover:scale-110`}
    >
      <path 
        d="M14 2L16.09 8.42H23L17.55 12.39L19.63 18.8L14 14.83L8.37 18.8L10.45 12.39L5 8.42H11.91L14 2Z" 
        fill="currentColor" 
      />
    </svg>
  );

  return (
    <nav 
      id="navbar-reverie"
      className="absolute top-0 left-0 w-full z-50 transition-all duration-500 bg-black/20 backdrop-blur-[2px]"
      style={{
        padding: isMobile ? '18px 12px' : '22px 48px'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {isMobile ? (
          // Mobile Layout: Clean spaced links
          <div className="w-full flex items-center justify-between px-2">
            <span onClick={() => onChangeView('home')} className={linkClass('home')}>Explore</span>
            <span onClick={() => onChangeView('about')} className={linkClass('about')}>About</span>
            <span onClick={() => onChangeView('connect')} className={linkClass('connect')}>Connect</span>
          </div>
        ) : (
          // Desktop Layout: Split Navigation
          <div className="w-full flex items-center justify-between w-full">
            {/* Left Nav links */}
            <div className="flex items-center gap-10 w-[30%] justify-start">
              <span onClick={() => onChangeView('home')} className={linkClass('home')}>Worlds</span>
              <span onClick={() => onChangeView('atelier')} className={linkClass('atelier')}>Atelier</span>
            </div>

            {/* Central Logo */}
            <div className="flex items-center justify-center w-[40%]">
              <StarLogo />
            </div>

            {/* Right Nav links */}
            <div className="flex items-center gap-10 w-[30%] justify-end">
              <span onClick={() => onChangeView('about')} className={linkClass('about')}>About</span>
              <span onClick={() => onChangeView('connect')} className={linkClass('connect')}>Connect</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

