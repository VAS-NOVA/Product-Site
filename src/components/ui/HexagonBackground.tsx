"use client";

import React, { useRef, useEffect, useState } from 'react';

interface Hexagon {
  x: number;
  y: number;
  radius: number;
  glowProgress: number;
  targetGlow: number;
}

export const HexagonBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let hexagons: Hexagon[] = [];
    
    // Hexagon parameters
    const hexRadius = 25; // Slightly smaller hexagons to match image
    const hexHeight = hexRadius * 2;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexVerticalSpacing = hexHeight * 0.75;
    const hexHorizontalSpacing = hexWidth;
    
    const resizeCanvas = () => {
      // Setup high DPI canvas
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      initHexagons(window.innerWidth, window.innerHeight);
    };

    const initHexagons = (width: number, height: number) => {
      hexagons = [];
      const cols = Math.ceil(width / hexHorizontalSpacing) + 1;
      const rows = Math.ceil(height / hexVerticalSpacing) + 1;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * hexHorizontalSpacing + (row % 2 === 0 ? 0 : hexHorizontalSpacing / 2);
          const y = row * hexVerticalSpacing;
          
          hexagons.push({
            x,
            y,
            radius: hexRadius - 2, // Slight gap between hexes
            glowProgress: 0,
            targetGlow: 0,
          });
        }
      }
    };

    const drawHexagon = (x: number, y: number, radius: number, glow: number) => {
      if (glow <= 0.01) return; 

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle_deg = 60 * i - 30;
        const angle_rad = Math.PI / 180 * angle_deg;
        const px = x + radius * Math.cos(angle_rad);
        const py = y + radius * Math.sin(angle_rad);
        
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      
      // Changed to lighter green for the base pattern
      ctx.strokeStyle = `rgba(74, 222, 128, ${Math.min(0.5, glow)})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // On interaction (glow > base pattern), fill with accent color
      if (glow > 1.0) {
        const fillAlpha = (glow - 1.0) * 2; // Map 1.0-1.5 to 0.0-1.0
        ctx.fillStyle = `rgba(0, 204, 51, ${fillAlpha})`;
        ctx.fill();
        
        // Add a subtle drop shadow instead of a neon glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 204, 51, 0.4)';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw hexagons
      hexagons.forEach(hex => {
        let baseGlow = 0.6; // Uniform, highly visible base grid
        
        // Add some slow subtle breathing animation
        baseGlow += Math.sin(Date.now() / 1000 + hex.x * 0.01 + hex.y * 0.01) * 0.15;
        baseGlow = Math.max(0, baseGlow);

        // Calculate distance to mouse for interactive glow
        const dx = mousePosRef.current.x - hex.x;
        const dy = mousePosRef.current.y - hex.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        let interactiveGlow = 0;
        
        // Glow radius around mouse (multiple hexagons wide)
        const mouseGlowRadius = hex.radius * 6; 
        if (distToMouse < mouseGlowRadius) {
          // Intense at center, fades out to edge of radius
          interactiveGlow = 2.0 * (1 - (distToMouse / mouseGlowRadius)); 
        }

        // Target glow is the maximum of the static pattern and the interactive hover
        hex.targetGlow = Math.max(baseGlow, interactiveGlow);

        // Smoothly interpolate current glow to target glow
        hex.glowProgress += (hex.targetGlow - hex.glowProgress) * 0.1;
        
        // Clamp
        hex.glowProgress = Math.max(0, Math.min(1.5, hex.glowProgress));

        drawHexagon(hex.x, hex.y, hex.radius, hex.glowProgress);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array so it only runs once

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000 };
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 pointer-events-auto"
      style={{ background: 'transparent' }}
    />
  );
};
