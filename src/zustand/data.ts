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
    width: 16,
    height: 16,
    scale: 4,
    rect: {
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
  history: {
    index: 0,
    historyStack: [],
  },
  selectedPixel: {
    color: "white",
    width: 1,
    height: 1,
    x: -1,
    y: -1,
  },
  actions: ["pen", "square"],
  current: {
    tool: "pen",
    color: "#fff",
  },
  client: {
    x: 0,
    y: 0,
    isHolding: false,
    isClicked: false,
    isHovering: false,
  },
  state: {
    showColorsBar: false,
    showContextMenu: false,
  },
  themeColor: "var(--themeColor)",
};

export type CanvasDataTypes = {
  grid: GridTypes;
  selectedPixel: SelectedPixelTypes;
  canvas: CanvasStateTypes;
  pixels: PixelTypes[];
  client: ClientTypes;
  current: CurrentTypes;
  actions: ActionsBarTypes[];
  state: StateTypes;
  history: HistoryTYpes;
  themeColor: string;
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
type CanvasStateTypes = {
  width: number;
  height: number;
  scale: number;
  rect: BoundingClientRectTypes;
};

export type PixelTypes = {
  id: string;
  x: number;
  y: number;
  color: string;
  height: number;
  width: number;
};
type HistoryTYpes = { index: number; historyStack: PixelTypes[][] };
type ClientTypes = {
  x: number;
  y: number;

  isHolding: boolean;
  isClicked: boolean;
  isHovering: boolean;
};

export type CurrentTypes = {
  tool: ActionsBarTypes;
  color: string;
};
type StateTypes = {
  showColorsBar: boolean;
  showContextMenu: boolean;
};
export type StatesKeysTypes = "showContextMenu" | "showColorsBar";

/*====================================================*/
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

export type ActionsBarTypes = "pen" | "square";
