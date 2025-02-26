//
//
//
//
//
//
//
import { CSSProperties, HTMLAttributes, memo, ReactNode } from "react";
//
import useStore from "@/store/store";
import { IoIosAdd } from "react-icons/io";
//
import "@/styles/layout_colorsBar.css";
//
export const ColorsBar = memo(() => {
  const methods = useStore((e) => e.methods);
  const layoutEvents = useStore((e) => e.layoutEvents);

  const showCondition = layoutEvents.showColorsBar ? 5 : -100;
  const colors = [
    "#3498db",
    "#9b59b6",
    "#1abc9c",
    "#e74c3c",
    "#f1c40f",
    "#2ecc71",
  ];

  return (
    <div className="colorsBar" style={{ left: `${showCondition}px` }}>
      {colors.map((e, i) => {
        return (
          <ColorSquare
            key={i}
            color={e}
            onClick={() => methods.setCurrent("color", e)}
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
});
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
