import { useEffect, useMemo, useCallback } from "react";

import { DisplayPixels } from "@/components/utils/util_displayPixels";
import { SelectedPixel } from "@/components/utils/util_selectedPixel";

import { useLoop } from "@/hooks/useLoop";
import { SwitchTools } from "@/hooks/useTools";

import useStore from "@/zustand/store";

export const Canvas = () => {
  const client = useStore((e) => e.client);
  const selectedPixel = useStore((e) => e.selectedPixel);

  const methods = useStore((e) => e.methods);
  const current = useStore((e) => e.current);

  const canvas = useStore((e) => e.canvas);
  const pixels = useStore((e) => e.pixels);

  const memoizedPixels = useMemo(() => pixels, [pixels]);

  const canvasRef = useLoop((ctx, _frameCount) => {
    methods.setBoundingClientRect(ctx.canvas.getBoundingClientRect());
    DisplayPixels({ ctx, pixels: memoizedPixels });

    if (client.isHovering) {
      SelectedPixel({ ctx, selectedPixel });
      SwitchTools({
        isHolding: client.isHolding,
        methods: methods,
        selectedPixel: selectedPixel,
        currentTool: current.tool,
      });
    }
  });

  const handleMouseUp = useCallback(
    () => methods.setIsHolding(false),
    [methods]
  );

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  return (
    <canvas
      style={{ transform: `scale(4)` }}
      className="canvas"
      ref={canvasRef}
      width={canvas.width}
      height={canvas.height}
      onMouseDown={(e) => {
        if (e.button === 0) methods.setIsHolding(true);
      }}
      onMouseEnter={() => methods.setIsHovering(true)}
      onMouseLeave={(e) => e.button === 0 && methods.setIsHovering(false)}
    />
  );
};
