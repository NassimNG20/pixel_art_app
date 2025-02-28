//
//
//
//
import { CanvasDataTypes } from "@/store/data";
//
//
import "@/styles/layout_grid.css";
import { memo } from "react";
//
//
//
//
type GridTypes = { canvas: CanvasDataTypes["canvas"] };
//
export const Grid = memo((props: GridTypes) => {
  const { canvas } = props;

  return (
    <div
      className="grid"
      style={{
        width: canvas.rect.width,
        height: canvas.rect.height,
        visibility: canvas.grid.isVisible ? "visible" : "hidden",
        opacity: canvas.grid.opacity,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${canvas.size} ${canvas.size}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ outline: `${0.05}px solid ${canvas.grid.color}` }}
      >
        <defs>
          <pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
            <path
              d="M 0 0 L 1 0 M 0 0 L 0 1"
              fill="none"
              stroke={canvas.grid.color}
              strokeWidth={0.05}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
});
