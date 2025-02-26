import useStore from "@/store/store";
import { useLoop } from "@/hooks/useLoop";
import { usePixelRenderer } from "@/hooks/usePixelRenderer";
import { usePixelColors, usePixelCoordinates } from "@/hooks/usePixelColors";
import { useCanvasHandlers } from "@/hooks/useCanvasHandlers";

import { SelectedPixel } from "./utils/util_selectedPixel";
import { Tool_Pen_Eraser } from "./tools/tool_pen";
import "@/styles/canvas.css";
import { Tool_square } from "./tools/tool_square";
import { memo, useEffect, useMemo } from "react";

export const Canvas = memo(() => {
  /** Extract store state */
  const methods = useStore((e) => e.methods);
  const canvas = useStore((e) => e.canvas);
  const client = useStore((e) => e.client);
  const current = useStore((e) => e.current);
  const mouseEvents = useStore((e) => e.mouseEvents);
  const history = useStore((e) => e.history);

  /** Setup pixel data */
  const canvasSize = useMemo(() => canvas.size ** 2, [canvas.size]);

  const pixelColors = usePixelColors(canvasSize);
  const pixelCoordinates = usePixelCoordinates(canvasSize);
  // console.log(pixelColors.colors);

  /** Mouse event handlers */
  const { handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave } =
    useCanvasHandlers(methods, client, pixelColors, pixelCoordinates);

  /** Canvas rendering logic */
  const { canvasRef } = useLoop((ctx, _frameCount) => {
    // Update bounding rect for precise mouse positioning
    methods.setBoundingClientRect(ctx.canvas.getBoundingClientRect());

    // Render pixel colors on the canvas
    usePixelRenderer(ctx, pixelColors.colors, pixelCoordinates.coordinates);

    // Skip rendering if the mouse is not inside the canvas
    if (!mouseEvents.isMouseEnter) return;

    // Extract position values for clarity
    const { x, y } = client.position;
    const { last_x, last_y } = client.lastPosition;

    // Highlight the selected pixel
    SelectedPixel({ ctx, current, x, y });

    // Apply the drawing tool if the mouse is being held

    if (current.tool === "pen" || current.tool === "eraser") {
      Tool_Pen_Eraser({
        methods,
        isHolding: mouseEvents.isHolding,
        canvasSize: canvas.size,
        pixelColors,
        pixelCoordinates,
        current,
        last_x,
        last_y,
        x,
        y,
      });
    }

    if (current.tool === "square") {
      Tool_square({
        methods,
        isHolding: mouseEvents.isHolding,
        canvasSize: canvas.size,
        pixelColors,
        pixelCoordinates,
        current,
        last_x,
        last_y,
        x,
        y,
      });
    }
  });
  //
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        console.log("Undo (Ctrl+Z) detected");

        methods.setHistory([]);
      }
      if (e.ctrlKey && e.key === "y") {
        console.log("Redo (Ctrl+Y) detected");
        // Call your redo function here
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const setHistoryIndex = history.historyStack[history.index];

    if (setHistoryIndex) {
      const historyColors = setHistoryIndex[0];

      // pixelCoordinates.setCoordinatesFromHistory(firstItem[1]);
    }
  }, [history.historyStack]); // Re-run when history changes
  /** Render the canvas */
  return (
    <canvas
      className="canvas"
      style={{ transform: `scale(1)` }}
      ref={canvasRef}
      width={canvas.size}
      height={canvas.size}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
});
