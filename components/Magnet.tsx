'use client';

import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number; // default: 150
  strength?: number; // default: 3
  activeTransition?: string; // default: "transform 0.3s ease-out"
  inactiveTransition?: string; // default: "transform 0.6s ease-in-out"
  className?: string;
  id?: string;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
  id,
}: MagnetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = mouseX - elX;
      const deltaY = mouseY - elY;
      const dist = Math.hypot(deltaX, deltaY);

      // Check if coordinate is within bounding box plus padding
      const isWithinPadding =
        mouseX >= rect.left - padding &&
        mouseX <= rect.right + padding &&
        mouseY >= rect.top - padding &&
        mouseY <= rect.bottom + padding;

      if (isWithinPadding) {
        setIsHovered(true);
        // Translate divided by the strength factor
        setTransform({
          x: deltaX / strength,
          y: deltaY / strength,
        });
      } else {
        setIsHovered(false);
        setTransform({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength]);

  const style: React.CSSProperties = {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0px)`,
    transition: isHovered ? activeTransition : inactiveTransition,
    willChange: 'transform',
    display: 'inline-block',
  };

  return (
    <div ref={containerRef} style={style} className={className} id={id}>
      {children}
    </div>
  );
}
