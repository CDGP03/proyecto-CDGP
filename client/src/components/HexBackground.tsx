import { useCallback, useEffect, useRef } from 'react';
 
const HEX_RADIUS = 52;   // más grandes
const GAP = 6;
 
function buildGrid(w: number, h: number) {
  const r = HEX_RADIUS;
  const hexW = Math.sqrt(3) * r + GAP;
  const vertSpacing = (1.5 * r) + GAP * 0.75;
 
  const cols = Math.ceil(w / hexW) + 3;
  const rows = Math.ceil(h / vertSpacing) + 3;
 
  const hexes: { x: number; y: number }[] = [];
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const offset = row % 2 === 0 ? 0 : hexW / 2;
      hexes.push({
        x: col * hexW + offset,
        y: row * vertSpacing,
      });
    }
  }
  return hexes;
}
 
function hexPath(cx: number, cy: number, r: number): Path2D {
  const path = new Path2D();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  }
  path.closePath();
  return path;
}
 
export default function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const hexesRef = useRef<{ x: number; y: number }[]>([]);
  const scalesRef = useRef<number[]>([]);
  const dimsRef = useRef({ w: 0, h: 0 });
 
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
 
    const { w, h } = dimsRef.current;
    const hexes = hexesRef.current;
    const scales = scalesRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const R = HEX_RADIUS;
 
    ctx.clearRect(0, 0, w, h);
 
    // Fondo oscuro degradado
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#080c14');
    bgGrad.addColorStop(0.6, '#0a0f1e');
    bgGrad.addColorStop(1, '#0d1530');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);
 
    // Dibujar hexágonos
    hexes.forEach((hex, i) => {
      const dist = Math.hypot(hex.x - mx, hex.y - my);
      const isHovered = dist < R * 1.4;
      const targetScale = isHovered ? 1.18 : 1;
      // Lerp suave
      scales[i] = scales[i] + (targetScale - scales[i]) * 0.18;
      const s = scales[i];
 
      ctx.save();
      ctx.translate(hex.x, hex.y);
      ctx.scale(s, s);
      ctx.translate(-hex.x, -hex.y);
 
      const path = hexPath(hex.x, hex.y, R - GAP / 2);
 
      if (isHovered || s > 1.02) {
        // Fill con gradiente azul
        const grad = ctx.createLinearGradient(
          hex.x - R, hex.y - R,
          hex.x + R, hex.y + R
        );
        grad.addColorStop(0, 'rgba(56, 130, 255, 0.45)');
        grad.addColorStop(1, 'rgba(30, 80, 200, 0.3)');
        ctx.fillStyle = grad;
        ctx.fill(path);
 
        // Borde brillante
        ctx.strokeStyle = `rgba(80, 160, 255, ${0.6 * ((s - 1) / 0.18)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke(path);
 
        // Glow suave
        ctx.shadowColor = 'rgba(60, 130, 255, 0.5)';
        ctx.shadowBlur = 12 * ((s - 1) / 0.18);
        ctx.stroke(path);
        ctx.shadowBlur = 0;
      } else {
        // Hexágono normal — solo borde tenue
        ctx.strokeStyle = 'rgba(40, 80, 160, 0.22)';
        ctx.lineWidth = 0.8;
        ctx.stroke(path);
      }
 
      ctx.restore();
    });
 
    // Gradiente de fade en parte inferior
    const fadeGrad = ctx.createLinearGradient(0, h * 0.65, 0, h);
    fadeGrad.addColorStop(0, 'rgba(8, 12, 28, 0)');
    fadeGrad.addColorStop(1, 'rgba(10, 18, 45, 0.85)');
    ctx.fillStyle = fadeGrad;
    ctx.fillRect(0, h * 0.65, w, h * 0.35);
 
    animRef.current = requestAnimationFrame(draw);
  }, []);
 
  const rebuild = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    dimsRef.current = { w, h };
    hexesRef.current = buildGrid(w, h);
    scalesRef.current = new Array(hexesRef.current.length).fill(1);
  }, []);
 
  useEffect(() => {
    rebuild();
    animRef.current = requestAnimationFrame(draw);
 
    const onResize = () => {
      rebuild();
    };
 
    // Mouse tracking — coordenadas relativas al viewport
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
 
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
 
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [rebuild, draw]);
 
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}