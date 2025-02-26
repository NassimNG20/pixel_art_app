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

  let newX = current.toolSize == 3 ? x - 1 : x;
  let newY = current.toolSize == 3 ? y - 1 : y;
  ctx.fillStyle = current.color;
  ctx.fillRect(newX, newY, current.toolSize, current.toolSize);
};
//
//
type SelectedPixelTypes = {
  ctx: CanvasRenderingContext2D;
  current: CanvasDataTypes["current"];
  x: number;
  y: number;
};
