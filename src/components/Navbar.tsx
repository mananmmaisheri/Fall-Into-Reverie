import { useIsMobile } from '../hooks/useIsMobile';

export default function Navbar() {
  const isMobile = useIsMobile();

  // Navigation link styling helper
  const linkClass = "uppercase text-[12px] tracking-[0.12em] text-white/95 hover:text-white transition-colors duration-300 font-sans cursor-pointer select-none";

  // Symmetric Star SVG component
  const StarLogo = () => (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 28 28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-white hover:scale-110 transition-transform duration-300 cursor-pointer"
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
      className="absolute top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        padding: isMobile ? '18px 20px' : '22px 48px'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {isMobile ? (
          // Mobile Layout: Centered Logo with side actions
          <div className="w-full flex items-center justify-between">
            <span className={linkClass}>Explore</span>
            <div className="flex justify-center items-center">
              <StarLogo />
            </div>
            <span className={linkClass}>Connect</span>
          </div>
        ) : (
          // Desktop Layout: Split Navigation
          <div className="w-full flex items-center justify-between">
            {/* Left Nav links */}
            <div className="flex items-center gap-10">
              <span className={linkClass}>Worlds</span>
              <span className={linkClass}>Atelier</span>
              <span className={linkClass}>Immersions</span>
            </div>

            {/* Central Logo */}
            <div className="flex items-center justify-center">
              <StarLogo />
            </div>

            {/* Right Nav links */}
            <div className="flex items-center gap-10">
              <span className={linkClass}>Craft</span>
              <span className={linkClass}>Codex</span>
              <span className={linkClass}>Connect</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
