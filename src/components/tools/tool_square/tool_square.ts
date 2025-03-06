//
//
//
//
//

import { hexToUint32 } from "@/components/utils/util_colorConvertor";
import { PixelStoreTypes } from "@/store/actions/unitArray";
import { CanvasDataTypes } from "@/store/data";

//
export const tool_square = (props: tool_squareTypes) => {
  const { canvas, client, current, pixelsMethods } = props;
  const { clickDown, position } = client;

  let startX = Math.min(clickDown.x, position.x);
  let startY = Math.min(clickDown.y, position.y);
  let width = Math.abs(clickDown.x - position.x) + current.toolSize - 1;
  let height = Math.abs(clickDown.y - position.y) + current.toolSize - 1;

  // Adjust if drawing goes outside of canvas boundaries
  if (startX + width >= canvas.size) width = canvas.size - startX - 1;
  if (startY + height >= canvas.size) height = canvas.size - startY - 1;

  const color = hexToUint32(current.color);

  // Draw top border (thickness rows)
  for (let dy = 0; dy < current.toolSize; dy++) {
    for (let x = startX; x <= startX + width; x++) {
      const index = (startY + dy) * canvas.size + x;
      pixelsMethods.setColor(index, color);
      pixelsMethods.setCoordinate(index, x, startY + dy);
    }
  }

  // Draw bottom border
  for (let dy = 0; dy < current.toolSize; dy++) {
    for (let x = startX; x <= startX + width; x++) {
      const index = (startY + height - dy) * canvas.size + x;
      pixelsMethods.setColor(index, color);
      pixelsMethods.setCoordinate(index, x, startY + height - dy);
    }
  }

  // Draw left border
  for (let dx = 0; dx < current.toolSize; dx++) {
    for (let y = startY; y <= startY + height; y++) {
      const index = y * canvas.size + (startX + dx);
      pixelsMethods.setColor(index, color);
      pixelsMethods.setCoordinate(index, startX + dx, y);
    }
  }

  // Draw right border
  for (let dx = 0; dx < current.toolSize; dx++) {
    for (let y = startY; y <= startY + height; y++) {
      const index = y * canvas.size + (startX + width - dx);
      pixelsMethods.setColor(index, color);
      pixelsMethods.setCoordinate(index, startX + width - dx, y);
    }
  }
  console.log(123);
};
//
//
//
//
interface tool_squareTypes {
  client: CanvasDataTypes["client"];
  pixelsMethods: PixelStoreTypes["pixelsMethods"];
  canvas: CanvasDataTypes["canvas"];
  current: CanvasDataTypes["current"];
}
