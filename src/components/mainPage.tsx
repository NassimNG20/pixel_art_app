//
//
//
//
//
//
import useStore from "@/store/store";
import { Canvas } from "@/components/canvas";
//
import "@/styles/mainPage.css";
//
import { Layout_tools } from "@/components/layouts/layout_tools";
import { ColorsBar } from "@/components/layouts/layout_colorsBar";
import { Grid } from "@/components/layouts/layout_grid";
//
import { mainPageEvents } from "@/components/utils/util_events";

//
//
//
//
export const MainPage = () => {
  const methods = useStore((e) => e.methods);
  const canvas = useStore((e) => e.canvas);

  let lastUpdate = 0;
  const move = (e: React.MouseEvent) => {
    if (performance.now() - lastUpdate < 16) return;
    lastUpdate = performance.now();

    const canvasStartWidth = e.clientX - canvas.rect.left;
    const canvasStartHeight = e.clientY - canvas.rect.top;

    const pixel_x = Math.floor(
      canvasStartWidth / (canvas.rect.width / canvas.size)
    );
    const pixel_y = Math.floor(
      canvasStartHeight / (canvas.rect.height / canvas.size)
    );

    methods.setClient("position", { x: pixel_x, y: pixel_y });
  };
  mainPageEvents({ methods });
  return (
    <div
      className="app"
      onMouseMove={move}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="canvas_container">
        <Grid canvas={canvas} />
        <Canvas />
      </div>
      <Layout_tools />
      <ColorsBar />
    </div>
  );
};
