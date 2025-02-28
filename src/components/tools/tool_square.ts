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

import { ActionsTypes } from "@/store/actions/actions";
import { PixelStoreTypes } from "@/store/actions/unitArray";
import { CanvasDataTypes } from "@/store/data";

export const Tool_square = (props: Tool_Square_Types) => {
  const { pixelsMethods, isHolding, clickDown, x, y } = props;
  let isDone = false;
  if (isHolding && isDone) {
    // Calculate square boundaries
    const startX = Math.min(clickDown.x, x);
    const startY = Math.min(clickDown.y, y);
    const width = Math.abs(clickDown.x - x);
    const height = Math.abs(clickDown.y - y);

    // Draw the filled square
    for (let i = startX; i <= startX + width; i++) {}
    for (let j = startY; j <= startY + height; j++) {}
  }
};

type Tool_Square_Types = {
  pixelsMethods: PixelStoreTypes["pixelsMethods"];
  methods: ActionsTypes["methods"];
  isHolding: boolean;
  x: number;
  y: number;
  clickDown: CanvasDataTypes["client"]["clickDown"];
  current: CanvasDataTypes["current"];
  canvasSize: number;
};
