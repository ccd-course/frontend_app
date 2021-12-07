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

// Get the real angle relative to the center
export const getAngleHelper = (
  p5Reference: p5Types,
  angle: number,
  x: number,
  y: number
) => {
  if (x > 0 && y > 0) {
    return angle;
  } else if (x < 0 && y > 0) {
    return 90 - p5Reference.abs(angle) + 90;
  } else if (x < 0 && y < 0) {
    return angle + 180;
  } else {
    return 270 + (90 - p5Reference.abs(angle));
  }
};

export const getSquareIdOfMouseClick = (
  p5: p5Types,
  mouseX: number,
  mouseY: number,
  numCols: number,
  circlesRadiousList: number[]
) => {
  const angle = p5.atan(mouseY / mouseX);
  const d = p5.sqrt(p5.pow(mouseX, 2) + p5.pow(mouseY, 2)); // Calcualte the distance from the center(0,0) to the mouse click

  let x = 0;
  let y = 0;

  // Generate the coordinate-points and the angles, which divide a circle drawn from the center and intersecting the mouse click
  const squaresCoordinateList = generateSquaresCoordinatesForOneCircle(
    p5,
    d,
    numCols
  );

  // Starting from the second circle, becuase the first one dose not have any squares
  // If the distance to the mouse click is smaller than the readious of the circle, then the mouse click belongs to this row
  for (let i = 1; i < circlesRadiousList.length; i++) {
    if (d < circlesRadiousList[i]) {
      x = i;
      break;
    }
  }
  if (x === 0) {
    return null;
  }

  // Get the real angle of the mouse click position
  const _angle = getAngleHelper(p5, angle, mouseX, mouseY);

  // Compare the angle of the mouse click with the start line of each square
  // If the angle lie between the angles of the square lines, then the click is inside the square
  for (let i = 0; i < squaresCoordinateList.length - 1; i++) {
    if (
      _angle > squaresCoordinateList[i].angle &&
      _angle < squaresCoordinateList[i + 1].angle
    ) {
      y = i + 1;
      break;
    }
  }
  // Exception for the last angle
  if (
    _angle > squaresCoordinateList[squaresCoordinateList.length - 1].angle &&
    _angle < 360
  ) {
    y = squaresCoordinateList.length;
  }

  return { x, y };
};
