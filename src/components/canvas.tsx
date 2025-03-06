import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";

import "@/styles/canvas.css";

import { useLoopWrapper } from "@/components/canvas/canvasLoop";
import { useCanvasEvents } from "@/hooks/useCanvasEvents";
import { useEffect } from "react";

export const Canvas = () => {
  const {
    methods,
    canvas,
    pixelsMethods,
    client,
    current,
    mouseEvents,
    pixels,
    history,
  } = useStore(
    useShallow((e) => ({
      canvas: e.canvas,
      client: e.client,
      pixels: e.pixels,
      methods: e.methods,
      current: e.current,
      history: e.history,
      mouseEvents: e.mouseEvents,
      pixelsMethods: e.pixelsMethods,
    }))
  );

  const { canvasRef } = useLoopWrapper({
    canvas,
    client,
    pixels,
    current,
    methods,
    history,
    mouseEvents,
    pixelsMethods,
  });

  const canvasEvents = useCanvasEvents({
    client,
    canvas,
    pixels,
    methods,
    current,
    pixelsMethods,
  });

  useEffect(() => {
    methods.setPixels(history.index);
  }, [history.index]);

  return (
    <canvas
      className="canvas"
      ref={canvasRef}
      width={canvas.size}
      height={canvas.size}
      onMouseUp={canvasEvents.handleOnMouseUp}
      onMouseDown={canvasEvents.handleOnMouseDown}
      onMouseEnter={canvasEvents.handleOnMouseEnter}
      onMouseLeave={canvasEvents.handleOnMouseLeave}
    />
  );
};
