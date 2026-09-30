import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollPercent(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent pointer-events-none"
    >
      {/* Wick line progress */}
      <div
        className="h-full bg-gradient-to-r from-[var(--clay)] via-[var(--accent)] to-[var(--accent)] transition-all duration-75 ease-out shadow-[0_0_8px_var(--accent)]"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  );
};
