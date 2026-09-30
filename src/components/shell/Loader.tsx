import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Logo } from '../brand/Logo';

export const Loader: React.FC = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip loader on emergency route
    if (location.pathname === '/emergency') {
      return;
    }

    // Check session storage
    const hasSeenLoader = sessionStorage.getItem('lanthera_loader_seen');
    if (!hasSeenLoader) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('lanthera_loader_seen', 'true');
      }, 850);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading Lanthera Health"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] transition-opacity duration-300 pointer-events-none"
    >
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="relative">
          {/* Radial ignition glow */}
          <div className="absolute -inset-6 rounded-full bg-[var(--accent)] opacity-40 blur-xl animate-pulse" />
          <Logo variant="glow" size="lg" showText={false} />
        </div>
        <p className="text-xs font-mono tracking-widest text-[var(--text-muted)] uppercase">
          The light stays on.
        </p>
      </div>
    </div>
  );
};
