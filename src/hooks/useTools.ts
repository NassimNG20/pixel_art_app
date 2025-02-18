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
export const SwitchTools = (props: SwitchToolsTypes) => {
  const { isHolding, methods, currentTool, selectedPixel } = props;

  if (!isHolding) return;
  switch (currentTool) {
    case "pen":
      Pen_addPixel(methods, {
        x: selectedPixel.x,
        y: selectedPixel.y,
        color: selectedPixel.color,
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
  selectedPixel: SelectedPixelTypes;
}
