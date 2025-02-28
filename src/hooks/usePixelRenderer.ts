export const usePixelRenderer = (
  ctx: CanvasRenderingContext2D,
  colors: Uint32Array,
  coordinates: Uint16Array
) => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data; // Pixel array (RGBA format)

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    if (color === 0) continue; // Skip empty pixels

    const x = coordinates[i * 2];
    const y = coordinates[i * 2 + 1];

    const index = (y * ctx.canvas.width + x) * 4; // Convert (x, y) to imageData index

    // Extract RGBA from Uint32
    data[index] = (color >> 24) & 0xff; // R
    data[index + 1] = (color >> 16) & 0xff; // G
    data[index + 2] = (color >> 8) & 0xff; // B
    data[index + 3] = color & 0xff; // A (alpha)
  }

  ctx.putImageData(imageData, 0, 0);
};
