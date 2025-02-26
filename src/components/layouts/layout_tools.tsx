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
//
//
//
//
//
//
import { HTMLAttributes, memo } from "react";

import { FaRegSquare } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { CiEraser } from "react-icons/ci";

import useStore from "@/store/store";

import "@/styles/layout_tools.css";

export const Layout_tools = memo(() => {
  const actions = useStore((e) => e.tools);
  const current = useStore((e) => e.current);
  const methods = useStore((e) => e.methods);

  return (
    <div className="tools">
      {actions.map((e, i) => {
        const icons: any = {
          pen: <FaPen size={13} />,
          square: <FaRegSquare />,
          eraser: <CiEraser size={19} />,
        };

        return (
          <Button
            key={i}
            style={{
              backgroundColor:
                e.name === current.tool ? "var(--themeColor)" : "",
            }}
            onClick={() => methods.setCurrent("tool", e.name)}
          >
            {icons[e.name]}
          </Button>
        );
      })}
    </div>
  );
});
//
//
//
//
const Button = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="tools_button" {...props}>
      {props.children}
    </button>
  );
};
