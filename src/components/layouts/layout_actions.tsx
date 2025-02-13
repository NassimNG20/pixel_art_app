//
//
//
//
//
//
//
//
//
//
//
//
import { HTMLAttributes } from "react";

import { FaRegSquare } from "react-icons/fa";
import { BiSolidColor } from "react-icons/bi";
import { FaPen } from "react-icons/fa";

import useStore from "@/zustand/store";

import "@/styles/actions.css";

export const Actions = () => {
  const actions = useStore((e) => e.actions);
  const { action } = useStore((e) => e.current);
  const methods = useStore((e) => e.methods);
  const themeColor = useStore((e) => e.themeColor);

  return (
    <div className="actions">
      {actions.map((e, i) => {
        const icons: any = {
          pen: <FaPen size={13} />,
          square: <FaRegSquare />,
          colors: <BiSolidColor />,
        };
        return (
          <Button
            key={i}
            style={{
              backgroundColor: e === action ? themeColor : "",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
            }}
            onClick={() => {
              methods.setCurrentActions(e);
            }}
          >
            {icons[e]}
          </Button>
        );
      })}
    </div>
  );
};
//
//
interface ButtonTypes extends HTMLAttributes<HTMLButtonElement> {}
//
//
const Button = (props: ButtonTypes) => {
  return (
    <button className="actions_button" {...props}>
      {props.children}
    </button>
  );
};
