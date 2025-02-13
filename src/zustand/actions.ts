//
//
//
//
//
//
//

import { ActionsBarTypes, BoundingClientRectTypes, PixelTypes } from "./data";
import { SetType } from "./types";

//

//
export const actions = (set: SetType): ActionsTypes => {
  return {
    methods: {
      setBoundingClientRect: (boundingClientRect) => {
        set((e) => ({ ...e, canvas: { ...e.canvas, boundingClientRect } }));
      },
      setSelectedPixel: ({ x, y }) => {
        set((e) => ({ ...e, selectedPixel: { ...e.selectedPixel, x, y } }));
      },
      setCurrentActions: (action) => {
        set((e) => ({ ...e, current: { ...e.current, action } }));
      },
      setIsHolding: (isHolding) => {
        set((e) => ({ ...e, client: { ...e.client, isHolding } }));
      },
      setPenAddPixel: (newPixel) => {
        set((e) => {
          const exists = e.pixels.some(
            (p) => p.id === newPixel.id && p.color === newPixel.color
          );
          return exists ? {} : { pixels: [...e.pixels, newPixel] };
        });
      },
    },
  };
};

export interface ActionsTypes {
  methods: {
    setBoundingClientRect: (e: BoundingClientRectTypes) => void;
    setSelectedPixel: (e: { x: number; y: number }) => void;
    setCurrentActions: (e: ActionsBarTypes) => void;
    setIsHolding: (e: boolean) => void;
    setPenAddPixel: (e: PixelTypes) => void;
  };
}
