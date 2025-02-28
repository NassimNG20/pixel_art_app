import { useCallback } from "react";
import { CanvasDataTypes } from "@/store/data"; // Adjust import if needed
import { ActionsTypes } from "@/store/actions/actions";
import { PixelStoreTypes } from "@/store/actions/unitArray";
import { hexToUint32 } from "@/components/utils/util_colorConvertor";

export const useCanvasEvents = (props: UseCanvasEventsTypes) => {
  const { methods, pixelsMethods, canvas, client, current } = props;
  const { position, clickDown } = client;

  const handleOnMouseDown = useCallback(() => {
    methods.setClient("clickDown", { x: position.x, y: position.y });
    methods.setMouseEvents("isHolding", true);
  }, [methods, client.position]);

  const handleOnMouseUp = useCallback(() => {
    methods.setMouseEvents("isHolding", false);
    if (current.tool !== "square") return;

    let startX = Math.min(clickDown.x, position.x);
    let startY = Math.min(clickDown.y, position.y);
    let width = Math.abs(clickDown.x - position.x);
    let height = Math.abs(clickDown.y - position.y);

    if (startX + width >= canvas.size) width = canvas.size - startX - 1;
    if (startY + height >= canvas.size) height = canvas.size - startY - 1;

    const color = hexToUint32(current.color);

    // Draw top and bottom borders
    for (let x = startX; x <= startX + width; x++) {
      const topIndex = startY * canvas.size + x;
      const bottomIndex = (startY + height) * canvas.size + x;

      pixelsMethods.setColor(topIndex, color);
      pixelsMethods.setCoordinate(topIndex, x, startY);

      pixelsMethods.setColor(bottomIndex, color);
      pixelsMethods.setCoordinate(bottomIndex, x, startY + height);
    }

    // Draw left and right borders
    for (let y = startY; y <= startY + height; y++) {
      const leftIndex = y * canvas.size + startX;
      const rightIndex = y * canvas.size + (startX + width);

      pixelsMethods.setColor(leftIndex, color);
      pixelsMethods.setCoordinate(leftIndex, startX, y);

      pixelsMethods.setColor(rightIndex, color);
      pixelsMethods.setCoordinate(rightIndex, startX + width, y);
    }
  }, [methods, pixelsMethods, current, canvas, clickDown, position]);

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
//
//
//
//
interface UseCanvasEventsTypes {
  methods: ActionsTypes["methods"];
  client: CanvasDataTypes["client"];
  pixelsMethods: PixelStoreTypes["pixelsMethods"];
  canvas: CanvasDataTypes["canvas"];
  current: CanvasDataTypes["current"];
}
