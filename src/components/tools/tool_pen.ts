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
  const { x, y, color } = props;
  const newID = `ID:${x}-${y}`;
  methods.setPenAddPixel({ x, y, width: 1, height: 1, color, id: newID });
};
//
//
//
//
interface Pen_addPixelProps {
  x: number;
  y: number;
  color: string;
}
