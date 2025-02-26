import { uint32ToHex } from "@/components/utils/util_colorConvertor";

export const usePixelRenderer = (
  ctx: CanvasRenderingContext2D,
  colors: Uint32Array,
  coordinates: Uint16Array
) => {
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    if (color === 0) continue; // Skip empty pixels

    const x = coordinates[i * 2];
    const y = coordinates[i * 2 + 1];

    ctx.fillStyle = uint32ToHex(color);
    ctx.fillRect(x, y, 1, 1);
  }
};
