import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine pointer and viewport >= 1024px
    const isFinePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    const isMobileWidth = typeof window !== 'undefined' && window.innerWidth < 1024;
    const touchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    if (!isFinePointer || isMobileWidth || touchDevice || reducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let initialized = false;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!initialized) {
        currentX = targetX;
        currentY = targetY;
        initialized = true;
        setPos({ x: targetX, y: targetY });
      }

      // Check if target element is interactive
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.closest('a, button, input, [role="button"]'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const render = () => {
      if (initialized) {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        setPos({ x: currentX, y: currentY });
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled || !pos) return null;

  const size = isHovered ? 48 : 24;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[999] pointer-events-none transition-transform duration-75"
      style={{
        transform: `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`,
      }}
    >
      <div
        className="rounded-full border border-[var(--accent)] bg-[var(--accent)] transition-all duration-200"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity: isHovered ? 0.35 : 0.2,
          boxShadow: isHovered ? '0 0 20px var(--accent)' : '0 0 10px var(--accent)',
        }}
      />
    </div>
  );
};
