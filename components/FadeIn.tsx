'use client';

import React from 'react';
import { motion } from 'motion/react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: 'div' | 'nav';
  className?: string;
  id?: string;
}

const MotionDiv = motion.div;
const MotionNav = motion.nav;

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
  id,
}: FadeInProps) {
  if (as === 'nav') {
    return (
      <MotionNav
        id={id}
        className={className}
        initial={{ opacity: 0, x, y }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '50px', amount: 0 }}
        transition={{
          delay,
          duration,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </MotionNav>
    );
  }

  return (
    <MotionDiv
      id={id}
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </MotionDiv>
  );
}
