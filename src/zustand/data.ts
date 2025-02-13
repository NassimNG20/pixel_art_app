//
//
//
//
//
//
//

// Fixed object structure
export const data: CanvasDataTypes = {
  grid: {
    isVisible: true,
    color: "white",
    opacity: 0.1,
  },
  canvas: {
    width: 64,
    height: 64,
    scale: 4,
    boundingClientRect: {
      height: 0,
      width: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      x: 0,
      y: 0,
    },
  },
  pixels: [],
  selectedPixel: {
    color: "white",
    width: 1,
    height: 1,
    x: -1,
    y: -1,
  },
  actions: ["pen", "square", "colors"],
  current: {
    action: "pen",
  },

  client: {
    x: 0,
    y: 0,
    isHolding: false,
    isClicked: false,
    isHovering: false,
  },
  themeColor: "var(--themeColor)",
};

export type PixelTypes = {
  id: string;
  x: number;
  y: number;
  color: string;
  height: number;
  width: number;
};
export type BoundingClientRectTypes = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};
type CanvasStateTypes = {
  width: number;
  height: number;
  scale: number;
  boundingClientRect: BoundingClientRectTypes;
};

type InteractionStateTypes = {
  x: number;
  y: number;
  isHolding: boolean;
  isClicked: boolean;
  isHovering: boolean;
};
type GridTypes = {
  isVisible: boolean;
  opacity: number;
  color: string;
};
export type SelectedPixelTypes = {
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
};
export type ActionsBarTypes = "pen" | "square" | "colors";

export type CurrentTypes = {
  action: ActionsBarTypes;
};
export type CanvasDataTypes = {
  grid: GridTypes;
  selectedPixel: SelectedPixelTypes;
  canvas: CanvasStateTypes;
  pixels: PixelTypes[];
  client: InteractionStateTypes;
  current: CurrentTypes;
  actions: ActionsBarTypes[];
  themeColor: string;
};
