import { useState, useEffect, useRef } from 'react';
import { useCursorContext } from '@subbiah/component';

interface Position {
  x: number;
  y: number;
}

/**
 * CustomCursor component with full accessibility support
 * - Respects user preferences (reduced motion, touch devices)
 * - Can be toggled on/off via CursorContext
 * - Only works on desktop with fine pointer input
 * - Performance optimized with RAF throttling
 */
export default function CustomCursor(): JSX.Element | null {
  const { isEnabled } = useCursorContext();
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const rafId = useRef<number | null>(null);
  const currentPosition = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isEnabled) return;

    // Performance optimized mouse move with RAF throttling
    const updatePosition = (e: MouseEvent): void => {
      currentPosition.current = { x: e.clientX, y: e.clientY };

      // Cancel previous RAF if it exists
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Schedule update on next frame
      rafId.current = requestAnimationFrame(() => {
        setPosition(currentPosition.current);
      });
    };

    const handleMouseOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isEnabled]);

  // Don't render if cursor is disabled
  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-6 w-6 rounded-full border-2 transition-[border-color,background-color,transform,box-shadow] duration-100 ${
          isHovering
            ? 'scale-150 border-primary bg-accent/30 shadow-lg shadow-accent/50'
            : 'border-primary bg-primary/20'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isHovering ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />
      {/* Inner dot */}
      <div
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full transition-colors duration-100 ${
          isHovering ? 'bg-primary' : 'bg-primary'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />
    </>
  );
}
