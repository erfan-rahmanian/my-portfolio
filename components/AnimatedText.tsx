'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  id?: string;
}

export default function AnimatedText({ text, className = '', id }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Set up the scroll listener targeting this specific element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(/\s+/);
  const totalWords = words.length;

  return (
    <p
      ref={containerRef}
      id={id}
      className={`text-center font-medium leading-relaxed text-[#D7E2EA] max-w-[560px] select-none ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <Word
            word={word}
            index={index}
            total={totalWords}
            progress={scrollYProgress}
          />
          {index < totalWords - 1 && ' '}
        </React.Fragment>
      ))}
    </p>
  );
}

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function Word({ word, index, total, progress }: WordProps) {
  const start = index / total;
  const end = Math.min(1, start + 2.5 / total);
  
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block mx-0.5" style={{ whiteSpace: 'nowrap' }}>
      <span className="opacity-0">{word}</span>
      <motion.span
        style={{ opacity }}
        className="absolute top-0 left-0 right-0 text-center hover:text-white transition-colors duration-200"
      >
        {word}
      </motion.span>
    </span>
  );
}
