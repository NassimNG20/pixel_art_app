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

export const displaySquare = (props: DisplaySquareTypes) => {
  const { ctx, current, clickDown, x, y } = props;

  // Calculate square boundaries
  const startX = Math.min(clickDown.x, x);
  const startY = Math.min(clickDown.y, y);
  const width = Math.abs(clickDown.x - x);
  const height = Math.abs(clickDown.y - y);
  ctx.fillStyle = current.color;
  // Draw top and bottom borders
  for (let i = startX; i <= startX + width; i++) {
    ctx.fillRect(i, startY, current.toolSize, current.toolSize);
    ctx.fillRect(i, startY + height, current.toolSize, current.toolSize);
  }
  for (let j = startY; j <= startY + height; j++) {
    ctx.fillRect(startX, j, current.toolSize, current.toolSize);
    ctx.fillRect(startX + width, j, current.toolSize, current.toolSize);
  }
  // Draw left and right borders
};

//
//
export type DisplaySquareTypes = {
  ctx: CanvasRenderingContext2D;
  current: CanvasDataTypes["current"];
  clickDown: CanvasDataTypes["client"]["clickDown"];
  x: number;
  y: number;
};
