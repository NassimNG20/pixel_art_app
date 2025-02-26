import { useCallback } from "react";
import { ActionsTypes } from "@/store/actions";
import { CanvasDataTypes } from "@/store/data";
import {
  UsePixelColorsTypes,
  UsePixelCoordinatesTypes,
} from "./usePixelColors";

export const useCanvasHandlers = (
  methods: ActionsTypes["methods"],
  client: CanvasDataTypes["client"],
  pixelColors: UsePixelColorsTypes,
  pixelCoordinates: UsePixelCoordinatesTypes
) => {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.button !== 0) return;
      methods.setClient("lastPosition", {
        last_x: client.position.x,
        last_y: client.position.y,
      });
      methods.setMouseEvents("isHolding", true);
    },
    [methods, client.position]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.button === 0) {
        methods.setMouseEvents("isHolding", false);
        methods.setHistory([pixelColors.colors, pixelCoordinates.coordinates]);
      }
    },
    [methods]
  );

  const handleMouseEnter = useCallback(() => {
    methods.setMouseEvents("isMouseEnter", true);
  }, [methods]);

  const handleMouseLeave = useCallback(() => {
    methods.setMouseEvents("isHolding", false);
    methods.setMouseEvents("isMouseEnter", false);
  }, [methods]);

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
  };
};
//
//
//
//
