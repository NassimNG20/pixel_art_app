// Constants
const WIDTH = 16; // or your dynamic width
const HEIGHT = 16; // or your dynamic height

// Initializing
const pixelsColors = new Uint32Array(WIDTH * HEIGHT); // Store colors
const pixelsPositions = new Uint16Array(WIDTH * HEIGHT * 2); // Store x, y pairs

// Initializing history (if needed)
const history: any = {
  index: 0,
  historyStack: [],
};

// Example of how to update a pixel
function setPixel(x: number, y: number, color: string) {
  const index = y * WIDTH + x;

  // Update color
  pixelsColors[index] = hexToUint32(color); // Convert color to a uint32 value

  // Update position (not really necessary, but for demonstration purposes)
  pixelsPositions[index * 2] = x;
  pixelsPositions[index * 2 + 1] = y;

  // Save to history (only storing the color and position data for each state)
  history.historyStack.push({
    color: pixelsColors.slice(),
    positions: pixelsPositions.slice(),
  });

  history.index++;
}

// Convert hex color to Uint32
function hexToUint32(hex: string): number {
  return parseInt(hex.replace("#", ""), 16);
}

// Undo operation (if needed)
function undo() {
  if (history.index > 0) {
    history.index--;
    const lastState = history.historyStack[history.index];

    pixelsColors.set(lastState.color);
    pixelsPositions.set(lastState.positions);
  }
}
