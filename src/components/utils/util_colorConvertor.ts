//
//
//
//
//
//
//
//
//

export function hexToUint32(hex: string) {
  // Remove the hash if present
  hex = hex.replace(/^#/, "");

  // Parse the color
  let num = parseInt(hex, 16);

  // If it's a short hex (3 or 4 chars), expand it
  if (hex.length === 3) {
    num =
      ((num & 0xf00) << 8) |
      ((num & 0xf00) << 12) |
      ((num & 0x0f0) << 4) |
      ((num & 0x0f0) << 8) |
      ((num & 0x00f) << 0) |
      ((num & 0x00f) << 4) |
      0xff000000;
  } else if (hex.length === 4) {
    num =
      ((num & 0xf000) << 12) |
      ((num & 0xf000) << 16) |
      ((num & 0x0f00) << 8) |
      ((num & 0x0f00) << 12) |
      ((num & 0x00f0) << 4) |
      ((num & 0x00f0) << 8) |
      ((num & 0x000f) << 0) |
      ((num & 0x000f) << 4) |
      0xff000000;
  } else if (hex.length === 6) {
    num = (num << 8) | 0xff; // Add full alpha (0xFF)
  } else if (hex.length === 8) {
    // Ensure ARGB format (swap RGBA to ARGB)
    num = ((num & 0xffffff) << 8) | ((num >> 24) & 0xff);
  }

  return num >>> 0; // Ensure unsigned 32-bit
}

export const uint32ToHex = (color: number): string => {
  return `#${color.toString(16).padStart(8, "0").toUpperCase()}`;
};
