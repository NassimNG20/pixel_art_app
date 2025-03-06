//
//
//
//
//
//
//
//

export const brush = (props: BrushTypes) => {
  const { toolSize, x, y } = props;
  if (toolSize >= 2) {
    return [
      { x: x + 1, y },
      { x, y: y + 1 },
      { x: x + 1, y: y + 1 },
    ];
  }
  if (toolSize >= 3) {
    return [
      { x: x - 1, y },
      { x, y: y - 1 },
      { x: x - 1, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
    ];
  }
  return [];
};
interface BrushTypes {
  x: number;
  y: number;
  toolSize: number;
}
