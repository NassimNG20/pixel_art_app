import { immer } from "zustand/middleware/immer";
import { SetPixelsMethodsType } from "../types";

export const ActionsPixelStore = immer(
  (set: SetPixelsMethodsType, _getState, _store): PixelStoreTypes => ({
    pixelsMethods: {
      setColor: (index: number, color: number) => {
        set((state) => {
          state.pixels.colors[index] = color;
        });
      },
      removeColor: (index: number) => {
        set((state) => {
          state.pixels.colors[index] = 0; // Reset to transparent
        });
      },
      setCoordinate: (index: number, x: number, y: number) => {
        set((state) => {
          state.pixels.coordinates[index * 2] = x;
          state.pixels.coordinates[index * 2 + 1] = y;
        });
      },
      removeCoordinate: (index: number) => {
        set((state) => {
          state.pixels.coordinates[index * 2] = 0;
          state.pixels.coordinates[index * 2 + 1] = 0;
        });
      },
    },
  })
);

// Define the interface for the Zustand store
export interface PixelStoreTypes {
  pixelsMethods: {
    setColor: (index: number, color: number) => void;
    removeColor: (index: number) => void;
    setCoordinate: (index: number, x: number, y: number) => void;
    removeCoordinate: (index: number) => void;
  };
}
