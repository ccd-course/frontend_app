import p5Types from "p5"; //Import this for typechecking and intellisense

// Given the number of cols needed and the radious of the circle
// The function returns a list of coordinates, which determine where the squares should be drawn
// It returns also the angle of of each coordinate relative to the center
export const generateSquaresCoordinatesForOneCircle = (
  p5: p5Types,
  radious: number,
  numCols: number
) => {
  const coordinates = [];
  const step = 360 / numCols;
  let angle = 0;
  for (let i = 0; i < numCols; i++) {
    let x = radious * p5.cos(angle);
    let y = radious * p5.sin(angle);
    coordinates.push({ x: x, y: y, angle: angle });
    angle += step;
  }
  return coordinates;
};

// Find the intersection coordinate of two lines
export const intersectionPointOfTwoLines = (
  point1: [number, number],
  point2: [number, number],
  point3: [number, number],
  point4: [number, number]
): { x: number; y: number } => {
  const ua =
    ((point4[0] - point3[0]) * (point1[1] - point3[1]) -
      (point4[1] - point3[1]) * (point1[0] - point3[0])) /
    ((point4[1] - point3[1]) * (point2[0] - point1[0]) -
      (point4[0] - point3[0]) * (point2[1] - point1[1]));

  const x = point1[0] + ua * (point2[0] - point1[0]);
  const y = point1[1] + ua * (point2[1] - point1[1]);

  return { x, y };
};
