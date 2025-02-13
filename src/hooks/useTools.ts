//
//
//
//
//
//
//
//
//

import { Pen_addPixel } from "@/components/tools/tool_pen";
import { ActionsTypes } from "@/zustand/actions";
import { ActionsBarTypes, SelectedPixelTypes } from "@/zustand/data";

//
export const SwitchTools = ({
  isHolding,
  methods,
  currentTool,
  sp,
}: SwitchToolsTypes) => {
  if (!isHolding) return;
  switch (currentTool) {
    case "pen":
      Pen_addPixel(methods, {
        x: sp.x,
        y: sp.y,
        width: sp.width,
        height: sp.height,
        color: sp.color,
      });
      break;
    case "square":
      break;
    default:
      return;
  }
};
//
//
//
//
interface SwitchToolsTypes {
  isHolding: boolean;
  methods: ActionsTypes["methods"];
  currentTool: ActionsBarTypes;
  sp: SelectedPixelTypes;
}
