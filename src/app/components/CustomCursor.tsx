import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animate = () => {
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.12;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    const handleHover = () => cursorRef.current?.classList.add('scale-150', 'opacity-50');
    const handleLeave = () => cursorRef.current?.classList.remove('scale-150', 'opacity-50');

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] transition-[opacity,transform] duration-150"
        style={{ willChange: 'transform', marginLeft: '-20px', marginTop: '-20px' }}
      >
        <div
          className="w-full h-full rounded-full border-2 transition-all duration-300"
          style={{ borderColor: 'var(--primary)', opacity: 0.6 }}
        />
      </div>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'var(--primary)',
          marginLeft: '-4px',
          marginTop: '-4px',
          willChange: 'transform',
        }}
      />
    </>
  );
}
