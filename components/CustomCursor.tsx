'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    
    // Add hover listeners to clickable elements
    document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseOver);
      el.addEventListener('mouseleave', handleMouseOut);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseOver);
        el.removeEventListener('mouseleave', handleMouseOut);
      });
    };
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 w-5 h-5 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block`}
      animate={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent',
        borderColor: isHovering ? 'transparent' : 'rgba(255,255,255,0.5)',
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
    />
  );
}
