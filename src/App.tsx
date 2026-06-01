/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import SceneHero from './components/SceneHero';
import SceneCTA from './components/SceneCTA';
import { 
  WORLD_BG, 
  PORTAL_BG, 
  CURTAIN_LEFT, 
  CURTAIN_RIGHT, 
  easeInOut, 
  lerp, 
  clamp, 
  MAG 
} from './types';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);

  // Opening State Delays
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isUiVisible, setIsUiVisible] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  // Refs to smoothen scroll and mouse values
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Open curtains after 100ms
    const curtainTimer = setTimeout(() => {
      setIsCurtainOpen(true);
    }, 100);

    // 2. Fade UI in after 600ms
    const uiTimer = setTimeout(() => {
      setIsUiVisible(true);
    }, 600);

    // 3. Disable heavy entry transitions after 2200ms to avoid mouse-tracking lag
    const transitionTimer = setTimeout(() => {
      setIsTransitionEnabled(false);
    }, 2200);

    // Track mouse cursor and normalize coordinate space to -1 and 1 relative to center
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      targetMouse.current = { x, y };
    };

    // Track vertical scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollLimit = scrollHeight - clientHeight;
      const pct = scrollLimit > 0 ? scrollTop / scrollLimit : 0;
      targetScroll.current = clamp(pct, 0, 1);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Bootstrap initial values
    handleScroll();

    let frameId: number;
    const tick = () => {
      // Linear interpolate mouse coordinate (lerp step speed: 0.07) for lag-free performance
      currentMouse.current.x = lerp(currentMouse.current.x, targetMouse.current.x, 0.07);
      currentMouse.current.y = lerp(currentMouse.current.y, targetMouse.current.y, 0.07);

      // Lerp scroll position by 0.1 for buttery smooth glide transition on all scroll inputs
      currentScroll.current = lerp(currentScroll.current, targetScroll.current, 0.1);
      if (Math.abs(currentScroll.current - targetScroll.current) < 0.0001) {
        currentScroll.current = targetScroll.current;
      }

      setScrollProgress(currentScroll.current);
      setRx(currentMouse.current.x);
      setRy(currentMouse.current.y);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(curtainTimer);
      clearTimeout(uiTimer);
      clearTimeout(transitionTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Compute animation-ready variables based on smoothed output values
  const easedProgress = easeInOut(scrollProgress);

  // 1. World Layer
  const worldScale = lerp(1, 1.18, easedProgress);
  const worldX = rx * MAG.world;
  const worldY = ry * MAG.world;

  // 2. Portal Layer
  const portalScale = lerp(1, 7.5, easedProgress);
  const portalOpacity = clamp(1 - (scrollProgress - 0.65) / 0.2, 0, 1);
  const portalX = rx * MAG.portal;
  const portalY = ry * MAG.portal;

  // 3. Curtains (Left and Right)
  const baseShift = isCurtainOpen ? 62 : 0;
  const totalShift = lerp(baseShift, 150, easedProgress);
  const curtainScrollScale = lerp(1, 1.3, easedProgress);
  const curtainMouseX = rx * MAG.curtainL;
  const curtainMouseY = ry * MAG.curtainR * 0.3;

  const transitionStyle = isTransitionEnabled 
    ? 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out' 
    : 'none';

  return (
    <div 
      id="reverie-app-container" 
      className="relative w-full" 
      style={{ height: '480vh' }}
    >
      {/* Fixed Sticky Viewer Frame */}
      <div 
        className="sticky top-0 left-0 w-full h-[100vh] overflow-hidden bg-[#0a0608] select-none"
        style={{ scrollbarGutter: 'stable' }}
      >
        {/* Navigation Layer */}
        <div 
          className="transition-opacity duration-1000 ease-out"
          style={{ opacity: isUiVisible ? 1 : 0 }}
        >
          <Navbar />
        </div>

        {/* Layer 1: WORLD_BG (Background) */}
        <img 
          src={WORLD_BG} 
          alt="World Background" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{
            zIndex: 10,
            transform: `scale(${worldScale}) translate3d(${worldX}px, ${worldY}px, 0)`,
            transition: transitionStyle
          }}
        />

        {/* Layer 2: PORTAL_BG (Foreground Gateway) */}
        <img 
          src={PORTAL_BG} 
          alt="Portal Frame" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{
            zIndex: 20,
            transformOrigin: '52% 38%',
            opacity: portalOpacity,
            transform: `scale(${portalScale}) translate3d(${portalX}px, ${portalY}px, 0)`,
            transition: transitionStyle
          }}
        />

        {/* Left Velvet Curtain */}
        <img 
          src={CURTAIN_LEFT} 
          alt="Curtain Left" 
          referrerPolicy="no-referrer"
          className="absolute top-0 bottom-0 left-0 h-full w-[60vw] max-w-[1200px] object-cover pointer-events-none select-none origin-left"
          style={{
            zIndex: 48,
            transform: `translateX(calc(-${totalShift}% + ${curtainMouseX}px)) translateY(${curtainMouseY}px) scale(${curtainScrollScale}) translateZ(0)`,
            transition: transitionStyle
          }}
        />

        {/* Right Velvet Curtain */}
        <img 
          src={CURTAIN_RIGHT} 
          alt="Curtain Right" 
          referrerPolicy="no-referrer"
          className="absolute top-0 bottom-0 right-0 h-full w-[60vw] max-w-[1200px] object-cover pointer-events-none select-none origin-right"
          style={{
            zIndex: 48,
            transform: `translateX(calc(${totalShift}% + ${curtainMouseX}px)) translateY(${curtainMouseY}px) scale(${curtainScrollScale}) translateZ(0)`,
            transition: transitionStyle
          }}
        />

        {/* Scene 1 Layout Loader */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000 ease-out z-[40]"
          style={{ 
            opacity: isUiVisible ? 1 : 0,
            pointerEvents: isUiVisible ? 'auto' : 'none'
          }}
        >
          <SceneHero scrollProgress={scrollProgress} />
        </div>

        {/* Scene 2 CTA Section */}
        <div 
          className="absolute inset-0 z-[46]"
          style={{ 
            pointerEvents: scrollProgress > 0.65 ? 'auto' : 'none'
          }}
        >
          <SceneCTA scrollProgress={scrollProgress} />
        </div>

      </div>
    </div>
  );
}
