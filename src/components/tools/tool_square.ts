//
//
//
//
//
//
//
//
//
//
//

import { ActionsTypes } from "@/store/actions";
import { CanvasDataTypes } from "@/store/data";

export const Tool_square = (props: Tool_Square_Types) => {
  const { last_x, last_y, x, y, isHolding } = props;
  let isOn = false;
  if (isHolding) {
    let mySquarePixels = {
      firstPoint: { x: last_x, y: last_y },
      lastPoint: { x, y },
    };

    console.log("start drawing square");
  } else if (isOn) {
    console.log("saveing square");
  }
};
type Tool_Square_Types = {
  pixelColors: {
    colors: Uint32Array<ArrayBuffer>;
    setColor: (index: number, color: number) => void;
    removeColor: (index: number) => void;
    clearColors: () => void;
  };
  pixelCoordinates: {
    coordinates: Uint16Array<ArrayBufferLike>;
    setCoordinate: (index: number, x: number, y: number) => void;
    removeCoordinate: (index: number) => void;
    clearCoordinates: () => void;
  };
  methods: ActionsTypes["methods"];
  isHolding: boolean;
  x: number;
  y: number;
  last_x: number;
  last_y: number;
  current: CanvasDataTypes["current"];
  canvasSize: number;
};
