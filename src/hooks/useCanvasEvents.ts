import { useCallback } from "react";
import { CanvasDataTypes } from "@/store/data"; // Adjust import if needed
import { ActionsTypes } from "@/store/actions/actions";
import { PixelStoreTypes } from "@/store/actions/unitArray";
import { tool_square } from "@/components/tools/tool_square/tool_square";
import { MouseEvent } from "react";

export const useCanvasEvents = (props: UseCanvasEventsTypes) => {
  const { methods, pixelsMethods, canvas, client, current, pixels } = props;
  const { position, clickDown } = client;

  const handleOnMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button !== 0) return;
      methods.setClient("clickDown", { x: position.x, y: position.y });
      methods.setMouseEvents("isHolding", true);
    },
    [methods, client.position]
  );

  const handleOnMouseUp = useCallback(
    (e: MouseEvent) => {
      if (e.button !== 0) return;
      methods.setMouseEvents("isHolding", false);

      if (current.tool == "square") {
        tool_square({
          canvas,
          client,
          current,
          pixelsMethods,
        });
      }
      methods.setHistory({
        hs_color: pixels.colors,
        hs_coordinates: pixels.coordinates,
      });
    },
    [methods, pixelsMethods, current, canvas, clickDown, position]
  );

  const handleOnMouseEnter = useCallback(() => {
    methods.setMouseEvents("isMouseEnter", true);
  }, [methods]);

  const handleOnMouseLeave = useCallback(() => {
    methods.setMouseEvents("isHolding", false);
    methods.setMouseEvents("isMouseEnter", false);
  }, [methods]);

  return {
    handleOnMouseDown,
    handleOnMouseUp,
    handleOnMouseEnter,
    handleOnMouseLeave,
  };
};

interface UseCanvasEventsTypes {
  methods: ActionsTypes["methods"];
  client: CanvasDataTypes["client"];
  pixelsMethods: PixelStoreTypes["pixelsMethods"];
  canvas: CanvasDataTypes["canvas"];
  current: CanvasDataTypes["current"];
  pixels: CanvasDataTypes["pixels"];
}
