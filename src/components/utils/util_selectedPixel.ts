//
//
//
//
//
//

import { SelectedPixelTypes } from "@/zustand/data";

//
export const SelectedPixel = (
  ctx: CanvasRenderingContext2D,
  selectedPixel: SelectedPixelTypes
) => {
  ctx.fillStyle = selectedPixel.color;
  ctx.fillRect(
    selectedPixel.x,
    selectedPixel.y,
    selectedPixel.width,
    selectedPixel.height
  );
};
