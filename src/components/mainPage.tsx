//
//
import { Grid } from "@/components/layouts/layout_grid";
import { Canvas } from "@/components/canvas";
import { Actions } from "@/components/layouts/layout_actions";
import { ColorPicker } from "@/components/layouts/layout_colorPicker";

import "@/styles/mainPage.css";

const MainPage = () => {
  return (
    <div className="view">
      <Actions />
      <div className="canvas_container">
        <Grid />
        <Canvas />
      </div>
      <ColorPicker />
    </div>
  );
};

export default MainPage;
