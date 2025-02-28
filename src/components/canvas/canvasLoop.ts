//
//
//
//
//
//
//
//
//

import { useLoop } from "@/hooks/useLoop";
import { ActionsTypes } from "@/store/actions/actions";
import { CanvasDataTypes } from "@/store/data";
import { Tool_Pen_Eraser } from "../tools/tool_pen";
import { SelectedPixel } from "../utils/util_selectedPixel";

import { PixelStoreTypes } from "@/store/actions/unitArray";
import { usePixelRenderer } from "@/hooks/usePixelRenderer";
import { useRef } from "react";
import { displaySquare } from "../utils/util_displaySquare";

//
export const useLoopWrapper = (props: UseLoopWrapperTypes) => {
  const {
    methods,
    mouseEvents,
    client,
    current,
    canvas,
    pixelsMethods,
    pixels,
  } = props;
  const { x, y } = client.position;
  const { clickDown } = client;

  const lastBoundingRect = useRef<DOMRect | null>(null);
  const { canvasRef } = useLoop((ctx, _frameCount) => {
    // usePixelRenderer(ctx, pixels.colors, pixels.coordinates);
    const newBoundingRect = ctx.canvas.getBoundingClientRect();
    if (
      !lastBoundingRect.current ||
      newBoundingRect.width !== lastBoundingRect.current.width ||
      newBoundingRect.height !== lastBoundingRect.current.height ||
      newBoundingRect.left !== lastBoundingRect.current.left ||
      newBoundingRect.top !== lastBoundingRect.current.top
    ) {
      lastBoundingRect.current = newBoundingRect; // Update stored value
      methods.setBoundingClientRect(newBoundingRect);
    }

    renderPixelData(ctx, pixels.colors, pixels.coordinates);
    if (!mouseEvents.isMouseEnter) return;

    const options = {
      methods,
      canvasSize: canvas.size,
      pixelsMethods,
      current,
      client,
    } as const;

    SelectedPixel({ ctx, current, x, y });

    if (!mouseEvents.isHolding) return;

    if (current.tool === "pen" || current.tool === "eraser") {
      Tool_Pen_Eraser(options);
    }

    if (current.tool === "square") {
      displaySquare({
        ctx,
        current,
        clickDown,
        x,
        y,
      });
    }
  });
  return { canvasRef };
};
//
const renderPixelData = (
  ctx: CanvasRenderingContext2D,
  colors: Uint32Array,
  coordinates: Uint16Array
) => {
  usePixelRenderer(ctx, colors, coordinates);
};
//
interface UseLoopWrapperTypes {
  methods: ActionsTypes["methods"];
  pixelsMethods: PixelStoreTypes["pixelsMethods"];

  mouseEvents: CanvasDataTypes["mouseEvents"];
  client: CanvasDataTypes["client"];
  current: CanvasDataTypes["current"];
  canvas: CanvasDataTypes["canvas"];
  pixels: CanvasDataTypes["pixels"];
}
