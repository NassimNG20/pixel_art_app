//
//
//
//
//
//
import { HexColorPicker } from "react-colorful";
//
//
import "@/styles/colorPickerLayout.css";
import { useState } from "react";
//
//
export const ColorPicker = () => {
  const [color, setColor] = useState("#aabbcc");
  return (
    <div className="colorPicker">
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
};
