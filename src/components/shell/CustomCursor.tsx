import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    if (touchDevice || reducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

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
      // Lerp 0.18 per File 05 §4
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled) return null;

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
