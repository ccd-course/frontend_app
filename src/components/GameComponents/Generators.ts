import p5Types from "p5";
import { generateSquaresCoordinatesForOneCircle } from "./Helpers";
import { Square } from "./Square";

/**
 * Calculate the coordinates of the squares and init them
 * @param p5
 * @param boardCirclesRadious
 * @returns
 */
export const generateSquareCoordinates = (
  p5: p5Types,
  boardCirclesRadious: number[],
  numCols: number
) => {
  const squares: { [key: string]: Square } = {}; // Store all the squares

  const boardSquaresCoordinates = boardCirclesRadious.map(
    (circleRadious: number) => {
      return generateSquaresCoordinatesForOneCircle(p5, circleRadious, numCols);
    }
  );

  for (let i = 0; i < boardSquaresCoordinates.length - 1; i++) {
    for (let j = 0; j < boardSquaresCoordinates[i].length - 1; j++) {
      const square = new Square(
        p5,
        {
          p1: {
            x: boardSquaresCoordinates[i][j].x,
            y: boardSquaresCoordinates[i][j].y,
          },
          p2: {
            x: boardSquaresCoordinates[i][j + 1].x,
            y: boardSquaresCoordinates[i][j + 1].y,
          },
          p3: {
            x: boardSquaresCoordinates[i + 1][j + 1].x,
            y: boardSquaresCoordinates[i + 1][j + 1].y,
          },
          p4: {
            x: boardSquaresCoordinates[i + 1][j].x,
            y: boardSquaresCoordinates[i + 1][j].y,
          },
        },
        [i + 1, boardSquaresCoordinates[i].length - (j + 1) + 1]
      );
      squares[`{${i + 1},${boardSquaresCoordinates[i].length - (j + 1) + 1}}`] =
        square;
    }
  }
  for (let i = 0; i < boardSquaresCoordinates.length - 1; i++) {
    const square = new Square(
      p5,
      {
        p1: {
          x: boardSquaresCoordinates[i][boardSquaresCoordinates[i].length - 1]
            .x,
          y: boardSquaresCoordinates[i][boardSquaresCoordinates[i].length - 1]
            .y,
        },
        p2: {
          x: boardSquaresCoordinates[i][0].x,
          y: boardSquaresCoordinates[i][0].y,
        },
        p3: {
          x: boardSquaresCoordinates[i + 1][0].x,
          y: boardSquaresCoordinates[i + 1][0].y,
        },
        p4: {
          x: boardSquaresCoordinates[i + 1][
            boardSquaresCoordinates[i].length - 1
          ].x,
          y: boardSquaresCoordinates[i + 1][
            boardSquaresCoordinates[i].length - 1
          ].y,
        },
      },
      [i + 1, 1]
    );
    squares[`{${i + 1},1}`] = square;
  }
  return squares;
};

/**
 * Given the table rows, the function calculate the radious of each circle
 * @param p5
 * @param numRows
 * @returns
 */
export const calculateBoardCirclesRadious = (p5: p5Types, numRows: number) => {
  let maxRadious = p5.width / 2 - 10;
  const circlesRadiousList = [];
  const distance = maxRadious / (numRows + 1);
  for (let i = numRows; i >= 0; i--) {
    circlesRadiousList.push(maxRadious);
    maxRadious -= distance;
  }
  return circlesRadiousList.reverse();
};
