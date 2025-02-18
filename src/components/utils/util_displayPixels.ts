//
//
//
//
//
//
//
//
//
import { PixelTypes } from "@/zustand/data";

//
export const DisplayPixels = ({ ctx, pixels }: DisplayPixelsTypes) => {
  ctx.beginPath(); // Start batching draw calls
  let lastColor: string | null = null;

  for (const { x, y, width, height, color } of pixels) {
    if (color !== lastColor) {
      ctx.fill(); // Apply previous batch
      ctx.fillStyle = color;
      lastColor = color;
    }
    ctx.fillRect(x, y, width, height);
  }

  ctx.fill(); // Ensure the last batch is drawn
};
//
//
//
//
type DisplayPixelsTypes = {
  ctx: CanvasRenderingContext2D;
  pixels: PixelTypes[];
};
