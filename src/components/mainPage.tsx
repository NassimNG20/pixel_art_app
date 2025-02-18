//
//

import { Grid } from "@/components/layouts/layout_grid";
import { AppBar } from "@/components/layouts/layout_MenuOptions";
import { Actions } from "@/components/layouts/layout_actions";
import { ColorsBar } from "@/components/layouts/layout_colorsBar";

import { Canvas } from "@/components/canvas";

import "@/styles/mainPage.css";
import useStore from "@/zustand/store";

const MainPage = () => {
  const methods = useStore((e) => e.methods);
  const canvas = useStore((e) => e.canvas);
  const move = ({ clientX, clientY }: MoveProps) => {
    const canvasStartWidth = clientX - canvas.rect.left;
    const canvasStartHeight = clientY - canvas.rect.top;

    const pixel_x = Math.floor(
      canvasStartWidth / (canvas.rect.width / canvas.width)
    );
    const pixel_y = Math.floor(
      canvasStartHeight / (canvas.rect.height / canvas.height)
    );

    methods.setSelectedPixel({
      x: pixel_x,
      y: pixel_y,
    });
  };
  return (
    <div
      className="app"
      onMouseMove={move}
      onClick={() => {
        methods.setUpdateState("showContextMenu", false);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        methods.setUpdateState("showContextMenu", true);
        methods.setClientPosition({ x: e.clientX, y: e.clientY });
      }}
    >
      <AppBar />
      <div className="view">
        <Actions />
        <div className="canvas_container">
          <Canvas />
          <Grid />
        </div>
        <ColorsBar />
      </div>
    </div>
  );
};

export default MainPage;

type MoveProps = React.MouseEvent<HTMLDivElement, MouseEvent>;
