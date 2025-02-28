import { useEffect, useRef, useCallback } from "react";

export const useLoop = (
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameCount = useRef(0);

  const render = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      frameCount.current += 1;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      draw(ctx, frameCount.current);
    },
    [draw]
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;

    const loop = () => {
      if (!canvasRef.current) return; // Avoid running on unmounted component
      render(ctx);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [render, canvasRef]);

  return { canvasRef, frameCount };
};
