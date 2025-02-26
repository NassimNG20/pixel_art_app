export const data = {
  canvas: {
    size: 128,
    scale: 128,
    rect: {
      x: 0,
      y: 0,
      height: 0,
      width: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    grid: {
      isVisible: true,
      color: "white",
      opacity: 0.1,
    },
  },
  history: {
    index: 0,
    stacks: 5,
    historyStack: [],
  },
  tools: [
    { name: "pen", size: 1 },
    { name: "square", size: 1 },
    { name: "eraser", size: 1 },
  ],
  current: {
    tool: "pen",
    toolSize: 1,
    color: "#ffffff",
  },
  client: {
    position: { x: -100, y: -100 },
    lastPosition: { last_x: -100, last_y: -100 },
    click: { x: -100, y: -100 },
  },
  mouseEvents: {
    isHolding: false,
    isMouseEnter: false,
  },
  layoutEvents: {
    showColorsBar: true,
  },
} as const satisfies CanvasDataTypes;

export type PixelTypes = {
  x: number;
  y: number;
  color: string;
  size: number;
};

export type ToolType = {
  name: "pen" | "square" | "eraser";
  size: number;
};
export type HistoryDataTypes = Uint16Array | Uint32Array;

export interface CanvasDataTypes {
  canvas: {
    size: number;
    scale: number;
    rect: {
      x: number;
      y: number;
      height: number;
      width: number;
      top: number;
      left: number;
      right: number;
      bottom: number;
    };
    grid: {
      isVisible: boolean;
      color: string;
      opacity: number;
    };
  };
  history: {
    index: number;
    stacks: number;
    historyStack: readonly HistoryDataTypes[][];
  };
  tools: ToolType[];
  current: {
    tool: string;
    toolSize: number;
    color: string;
  };
  client: {
    position: { x: number; y: number };
    lastPosition: { last_x: number; last_y: number };
    click: { x: number; y: number };
  };
  mouseEvents: {
    isHolding: boolean;
    isMouseEnter: boolean;
  };
  layoutEvents: {
    showColorsBar: boolean;
  };
}
