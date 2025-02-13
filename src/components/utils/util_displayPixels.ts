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
export const DisplayPixels = (
  ctx: CanvasRenderingContext2D,
  pixels: PixelTypes[]
) => {
  pixels.forEach((e) => {
    ctx.fillStyle = e.color;
    ctx.fillRect(e.x, e.y, e.width, e.height);
  });
};
