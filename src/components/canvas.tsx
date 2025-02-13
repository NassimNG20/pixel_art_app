//
//
//
//
//
//
//
//
import { useEffect } from "react";

import { DisplayPixels } from "@/components/utils/util_displayPixels";
import { SelectedPixel } from "@/components/utils/util_selectedPixel";

import { useLoop } from "@/hooks/useLoop";
import { SwitchTools } from "@/hooks/useTools";

import useStore from "@/zustand/store";

//
export const Canvas = () => {
  const client = useStore((e) => e.client);
  const sp = useStore((e) => e.selectedPixel);

  const methods = useStore((e) => e.methods);
  const current = useStore((e) => e.current);

  const canvas = useStore((e) => e.canvas);
  const pixels = useStore((e) => e.pixels);

  const canvasRef = useLoop((ctx, _frameCount) => {
    // get bounding of canvas ( position in the space )
    methods.setBoundingClientRect(ctx.canvas.getBoundingClientRect());

    SelectedPixel(ctx, sp);
    DisplayPixels(ctx, pixels);

    SwitchTools({
      isHolding: client.isHolding,
      methods,
      sp,
      currentTool: current.action,
    });
  });

  const move = ({ clientX, clientY }: MoveProps) => {
    const canvasStartWidth = clientX - canvas.boundingClientRect.left;
    const canvasStartHeight = clientY - canvas.boundingClientRect.top;

    const pixel_x =
      canvasStartWidth / (canvas.boundingClientRect.width / canvas.width);
    const pixel_y =
      canvasStartHeight / (canvas.boundingClientRect.height / canvas.height);

    methods.setSelectedPixel({
      x: Math.floor(pixel_x),
      y: Math.floor(pixel_y),
    });
  };

  useEffect(() => {
    const handleMouseUp = () => methods.setIsHolding(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [methods]);

  return (
    <canvas
      className="canvas"
      ref={canvasRef}
      onMouseMove={move}
      width={canvas.width}
      height={canvas.height}
      onMouseDown={() => methods.setIsHolding(true)}
    />
  );
};
type MoveProps = React.MouseEvent<HTMLCanvasElement, MouseEvent>;
