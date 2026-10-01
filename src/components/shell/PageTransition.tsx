import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 120 : 450;

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      // Focus moved to h1 on arrival per File 05 §4
      const h1 = document.querySelector('h1');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative min-h-full overflow-x-hidden w-full max-w-full">
      {/* Radial Amber Light Wipe Overlay */}
      {isTransitioning && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[80] pointer-events-none transition-opacity duration-300 flex items-center justify-center overflow-hidden max-w-full"
        >
          <div className="w-[100vw] h-[100vw] max-w-none rounded-full bg-radial from-[var(--accent)] via-[var(--surface-2)] to-transparent opacity-30 animate-ping" />
        </div>
      )}

      {/* Page Content View */}
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-90' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};
