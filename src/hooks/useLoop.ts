import { useEffect, useRef } from "react";

export const useLoop = (
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      frameCount.current += 1;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      draw(ctx, frameCount.current);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};
