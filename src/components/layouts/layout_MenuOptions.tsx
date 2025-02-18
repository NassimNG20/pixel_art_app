//
//
//
//
//
import "@/styles/layout_menuOptions.css";
import useStore from "@/zustand/store";
//
//
export const AppBar = () => {
  const state = useStore((e) => e.state);
  const client = useStore((e) => e.client);
  if (!state.showContextMenu) return null;

  const appBarOptions = ["New", "View", "About"];

  const width = 200;
  const height = 300;

  const condition_x = client.x + width > window.innerWidth;
  const condition_y = client.y + height > window.innerHeight;
  const fix_x_overlay = condition_x ? client.x - width : client.x;
  const fix_y_overlay = condition_y ? window.innerHeight - height : client.y;

  return (
    <div
      className="contextMenu"
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        height,
        width,
        transform: `translate(${fix_x_overlay}px,${fix_y_overlay}px)`,
        zIndex: 99999,
      }}
    >
      {appBarOptions.map((e, i) => {
        return (
          <button key={i} className="contextMenu_buttons">
            {e}
          </button>
        );
      })}
    </div>
  );
};
