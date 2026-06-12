'use client';

import { useEffect, useRef } from 'react';

type Segment = {
  x: number;
  y: number;
};

const neonColors = ['#00f3ff', '#ff0055', '#9d00ff', '#00ff66'];

class Lightning {
  segments: Segment[] = [];
  startX = 0;
  startY = 0;
  color = neonColors[0];
  opacity = 1;
  fadeSpeed = 0.03;
  lineWidth = 3;

  constructor(
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
  ) {
    this.init();
  }

  init() {
    this.startX = Math.random() * this.canvasWidth;
    this.startY = -20;
    this.color = neonColors[Math.floor(Math.random() * neonColors.length)];
    this.opacity = 1;
    this.fadeSpeed = 0.025 + Math.random() * 0.035;
    this.lineWidth = 2 + Math.random() * 3;
    this.generateSegments();
  }

  generateSegments() {
    let x = this.startX;
    let y = this.startY;
    const targetY = this.canvasHeight * (0.55 + Math.random() * 0.45);

    this.segments.push({ x, y });

    while (y < targetY) {
      x += (Math.random() - 0.5) * 60;
      y += 10 + Math.random() * 30;
      this.segments.push({ x, y });
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.opacity <= 0) return;

    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.moveTo(this.segments[0].x, this.segments[0].y);

    for (let i = 1; i < this.segments.length; i++) {
      ctx.lineTo(this.segments[i].x, this.segments[i].y);
    }

    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.lineWidth = this.lineWidth / 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.opacity -= this.fadeSpeed;
  }
}

export default function LightningBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let lightnings: Lightning[] = [];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
    };

    const resetLightnings = () => {
      lightnings = [];

      for (let i = 0; i < 2; i++) {
        lightnings.push(new Lightning(width, height));
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.18)';
      ctx.fillRect(0, 0, width, height);

      if (Math.random() < 0.012) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(0, 0, width, height);
      }

      if (Math.random() < 0.018 && lightnings.length < 3) {
        lightnings.push(new Lightning(width, height));
      }

      lightnings.forEach((lightning) => {
        lightning.update();
        lightning.draw(ctx);
      });

      lightnings = lightnings.filter((lightning) => lightning.opacity > 0);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    resetLightnings();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none select-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
