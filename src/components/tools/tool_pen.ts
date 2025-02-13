//
//
//
//
//
//
//
//

import { ActionsTypes } from "@/zustand/actions";

export const Pen_addPixel = (
  methods: ActionsTypes["methods"],
  props: Pen_addPixelProps
) => {
  const { x, y, color, width, height } = props;
  const newID = `ID:${x}-${y}`;
  methods.setPenAddPixel({ x, y, width, height, color, id: newID });
};
//
//
//
//
interface Pen_addPixelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}
