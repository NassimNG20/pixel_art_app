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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const loop = () => {
      render(ctx);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [render]);

  return { canvasRef, frameCount };
};
