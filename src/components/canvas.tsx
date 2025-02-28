import useStore from "@/store/store";
import { useShallow } from "zustand/react/shallow";

import "@/styles/canvas.css";

import { useLoopWrapper } from "./canvas/canvasLoop";
import { useCanvasEvents } from "@/hooks/useCanvasEvents";

export const Canvas = () => {
  /** Extract store state */
  const {
    methods,
    canvas,
    pixelsMethods,
    client,
    current,
    mouseEvents,
    pixels,
  } = useStore(
    useShallow((state) => ({
      methods: state.methods,
      canvas: state.canvas,
      pixelsMethods: state.pixelsMethods,
      events: state.events,
      client: state.client,
      current: state.current,
      mouseEvents: state.mouseEvents,
      pixels: state.pixels,
    }))
  );

  const { canvasRef } = useLoopWrapper({
    canvas,
    client,
    current,
    methods,
    mouseEvents,
    pixelsMethods,
    pixels,
  });

  const canvasEvents = useCanvasEvents({
    methods,
    client,
    pixelsMethods,
    canvas,
    current,
  });

  return (
    <canvas
      className="canvas"
      ref={canvasRef}
      width={canvas.size}
      height={canvas.size}
      onMouseDown={canvasEvents.handleOnMouseDown}
      onMouseUp={canvasEvents.handleOnMouseUp}
      onMouseEnter={canvasEvents.handleOnMouseEnter}
      onMouseLeave={canvasEvents.handleOnMouseLeave}
    />
  );
};
