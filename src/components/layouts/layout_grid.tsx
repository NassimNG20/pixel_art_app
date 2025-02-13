//
//
//
//
import useStore from "@/zustand/store";
//
//
//
//
//
//
//
export const Grid = () => {
  const canvas = useStore((e) => e.canvas);
  const grid = useStore((e) => e.grid);

  const isVisible = grid.isVisible ? "visible" : "hidden";
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: canvas.boundingClientRect.width,
        height: canvas.boundingClientRect.height,
        visibility: isVisible,
        opacity: grid.opacity,
        zIndex: 5,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${canvas.height} ${canvas.width}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ outline: `${0.05}px solid ${grid.color}` }}
      >
        <defs>
          <pattern id="grid" width="1" height="1" patternUnits="userSpaceOnUse">
            <path
              d="M 0 0 L 1 0 M 0 0 L 0 1"
              fill="none"
              stroke={grid.color}
              strokeWidth={0.05}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
