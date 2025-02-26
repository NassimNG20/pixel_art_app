import { CanvasDataTypes } from "@/store/data";
import { hexToUint32 } from "../utils/util_colorConvertor";
import { ActionsTypes } from "@/store/actions";

export const Tool_Pen_Eraser = (props: Tool_Pen_Types) => {
  const {
    pixelColors,
    pixelCoordinates,
    current,
    canvasSize,
    x,
    y,
    last_x,
    last_y,
    methods,
    isHolding,
  } = props;
  const colorUint32 = hexToUint32(current.color);
  if (!isHolding) return;

  const isWithinBounds = (x: number, y: number) =>
    x >= 0 && x < canvasSize && y >= 0 && y < canvasSize;

  const getAffectedIndices = (x: number, y: number, toolSize: number) => {
    const baseIndices = [{ x, y }];
    if (toolSize >= 2)
      baseIndices.push(
        { x: x + 1, y },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 }
      );
    if (toolSize >= 3)
      baseIndices.push(
        { x: x - 1, y },
        { x, y: y - 1 },
        { x: x - 1, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x - 1, y: y + 1 }
      );

    return baseIndices
      .filter(({ x, y }) => isWithinBounds(x, y))
      .map(({ x, y }) => ({ index: y * canvasSize + x, x, y }));
  };

  const applyTool = (x: number, y: number) => {
    getAffectedIndices(x, y, current.toolSize).forEach(({ index, x, y }) => {
      if (current.tool === "pen") {
        pixelColors.setColor(index, colorUint32);
        pixelCoordinates.setCoordinate(index, x, y);
      } else {
        console.log(`Deleting pixel at ${x},${y} (index ${index})`);
        pixelColors.removeColor(index);
        pixelCoordinates.removeCoordinate(index);
      }
    });
  };

  if (last_x == undefined || last_y == undefined) {
    applyTool(x, y);
    return;
  }

  // Bresenham's Line Algorithm
  let [x0, y0] = [last_x, last_y];
  const [dx, dy] = [Math.abs(x - x0), Math.abs(y - y0)];
  const [sx, sy] = [x0 < x ? 1 : -1, y0 < y ? 1 : -1];
  let err = dx - dy;

  while (x0 !== x || y0 !== y) {
    applyTool(x0, y0);
    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }

  methods.setClient("lastPosition", { last_x: x0, last_y: y0 });
  applyTool(x, y);
};

type Tool_Pen_Types = {
  isHolding: boolean;
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
  x: number;
  y: number;
  last_x: number;
  last_y: number;
  current: CanvasDataTypes["current"];
  canvasSize: number;
};
