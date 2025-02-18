//
//
//
//
//
//
// import { HexColorPicker } from "react-colorful";
//
//
import useStore from "@/zustand/store";
import { IoIosAdd } from "react-icons/io";
//
import "@/styles/layout_colorsBar.css";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";
//
export const ColorsBar = () => {
  const state = useStore((e) => e.state);
  const methods = useStore((e) => e.methods);

  const showCondition = state.showColorsBar ? -150 : 0;
  const colors = [
    "#3498db",
    "#9b59b6",
    "#1abc9c",
    "#e74c3c",
    "#f1c40f",
    "#2ecc71",
  ];
  return (
    <div
      className="colorsBar"
      style={{ transform: `translate(${showCondition}%,-50%)` }}
    >
      {colors.map((e, i) => {
        return (
          <ColorSquare
            key={i}
            color={e}
            onClick={() => methods.setCurrentColor(e)}
          />
        );
      })}
      <ColorSquare
        color="transparent"
        style={{ marginTop: -1 }}
        onClick={() => {}}
        children={
          <IoIosAdd
            style={{
              border: "1px solid var(--borderColor)",
              width: "20px",
              height: "20px",
              borderRadius: 3,
            }}
          />
        }
      />
    </div>
  );
};
//
//
//
//
const ColorSquare = (props: ColorSquareTypes) => {
  const { ...rest } = props;
  return (
    <div
      className="colorButton"
      {...rest}
      style={{
        ...props.style,
        backgroundColor: props.color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.children}
    </div>
  );
};
//
//
interface ColorSquareTypes extends HTMLAttributes<HTMLDivElement> {
  color: string;
  style?: CSSProperties;
  children?: ReactNode;
}
