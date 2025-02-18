//
//
//
//
//
//

import { SelectedPixelTypes } from "@/zustand/data";

//
export const SelectedPixel = (props: SelectedPixelPropsTypes) => {
  const { ctx, selectedPixel } = props;

  ctx.fillStyle = selectedPixel.color;
  ctx.fillRect(
    selectedPixel.x,
    selectedPixel.y,
    selectedPixel.width,
    selectedPixel.height
  );
};
//
//
//
//
type SelectedPixelPropsTypes = {
  ctx: CanvasRenderingContext2D;
  selectedPixel: SelectedPixelTypes;
};
