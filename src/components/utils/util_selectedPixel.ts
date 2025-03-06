//
//
//
//
//
//
//
//
//
//
//

import { CanvasDataTypes } from "@/store/data";

//
export const SelectedPixel = (props: SelectedPixelTypes) => {
  const { ctx, x, y, current } = props;

  ctx.fillStyle = current.color;
  ctx.fillRect(x, y, current.toolSize, current.toolSize);
};
//
//
type SelectedPixelTypes = {
  ctx: CanvasRenderingContext2D;
  current: CanvasDataTypes["current"];
  x: number;
  y: number;
};
