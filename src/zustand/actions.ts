//
//
//
//
//
//
//

import {
  ActionsBarTypes,
  BoundingClientRectTypes,
  PixelTypes,
  StatesKeysTypes,
} from "./data";
import { SetType } from "./types";

//

//
export const actions = (set: SetType): ActionsTypes => {
  return {
    methods: {
      setBoundingClientRect: (rect) => {
        set((e) => ({ canvas: { ...e.canvas, rect } }));
      },
      setSelectedPixel: ({ x, y }) => {
        set((e) => ({ selectedPixel: { ...e.selectedPixel, x, y } }));
      },
      setCurrentActions: (tool) => {
        set((e) => ({ current: { ...e.current, tool } }));
      },
      setCurrentColor: (color) => {
        set((e) => ({
          current: { ...e.current, color },
          selectedPixel: { ...e.selectedPixel, color },
        }));
      },
      setIsHolding: (isHolding) => {
        set((e) => ({ client: { ...e.client, isHolding } }));
      },
      setPenAddPixel: (newPixel) => {
        set((e) => {
          const index = e.pixels.findIndex((p) => p.id === newPixel.id);

          if (index === -1) return { pixels: [...e.pixels, newPixel] }; // Add new pixel

          if (e.pixels[index].color !== newPixel.color) {
            e.pixels[index] = { ...e.pixels[index], color: newPixel.color }; // Modify the color
            return { pixels: e.pixels };
          }

          return e; // No changes needed
        });
      },
      setUpdateState: (showColorsBar, value) => {
        set((e) => ({ state: { ...e.state, [showColorsBar]: value } }));
      },
      setIsHovering: (isHovering) => {
        set((e) => ({ client: { ...e.client, isHovering } }));
      },
      setClientPosition: ({ x, y }) => {
        set((e) => ({ client: { ...e.client, x, y } }));
      },
    },
  };
};

export interface ActionsTypes {
  methods: {
    setPenAddPixel: (e: PixelTypes) => void;

    setBoundingClientRect: (e: BoundingClientRectTypes) => void;
    setSelectedPixel: (e: { x: number; y: number }) => void;

    setClientPosition: (e: { x: number; y: number }) => void;

    setCurrentActions: (e: ActionsBarTypes) => void;
    setCurrentColor: (e: string) => void;

    setIsHolding: (e: boolean) => void;
    setIsHovering: (e: boolean) => void;

    setUpdateState: (e: StatesKeysTypes, a: boolean) => void;
  };
}
