import { CanvasDataTypes } from "@/store/data";
import { hexToUint32 } from "../utils/util_colorConvertor";
import { ActionsTypes } from "@/store/actions/actions";
import { PixelStoreTypes } from "@/store/actions/unitArray";

export const Tool_Pen_Eraser = (props: Tool_Pen_Types) => {
  const { pixelsMethods, current, client, canvasSize, methods } = props;
  const {
    clickDown,
    position: { x, y },
  } = client;
  const colorUint32 = hexToUint32(current.color);

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
        pixelsMethods.setColor(index, colorUint32);
        pixelsMethods.setCoordinate(index, x, y);
      } else {
        pixelsMethods.removeColor(index);
        pixelsMethods.removeCoordinate(index);
      }
    });
  };

  if (clickDown.x == undefined || clickDown.y == undefined) {
    applyTool(x, y);
    return;
  }

  // Bresenham's Line Algorithm
  let [x0, y0] = [clickDown.x, clickDown.y];
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

  methods.setClient("clickDown", { x: x0, y: y0 });
  applyTool(x, y);
};

type Tool_Pen_Types = {
  pixelsMethods: PixelStoreTypes["pixelsMethods"];
  methods: ActionsTypes["methods"];
  current: CanvasDataTypes["current"];
  canvasSize: number;
  client: CanvasDataTypes["client"];
};
