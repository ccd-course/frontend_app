import p5Types from "p5";
import { BoardTable, Coordinate } from "../../types";
import { Square } from "./Square";
import { Board } from "./Board";
import { getAngleHelper } from "./Helpers";

/**
 * Represent the chess-board
 * handles the layout logic of the game
 *
 */
export class CircleBoard extends Board {
  private boardCirclesRadious: number[]; // Needed to generate the squares (Rows)
  private readonly numRows: number; // Number of rows on the baord
  private readonly numCols: number; // Number of cols on the board
  constructor(
    p5: p5Types,
    boardTable: BoardTable,
    gameID: string,
    players: string[],
    currentPlayer: string
  ) {
    super(p5, boardTable, gameID, players, currentPlayer);
    // Init the number of rows and cols
    this.numRows = this.boardTable[0].length;
    this.numCols = this.boardTable.length;
    this.boardCirclesRadious = this.calculateBoardCirclesRadious();
  }

  mapMouseCoordinateToSquareID(coordinate: Coordinate): Coordinate | null {
    const angle = this.p5.atan(coordinate.y / coordinate.x);
    const d = this.p5.sqrt(
      this.p5.pow(coordinate.x, 2) + this.p5.pow(coordinate.y, 2)
    ); // Calcualte the distance from the center(0,0) to the mouse click

    let x = 0;
    let y = 0;

    // Generate the coordinate-points and the angles, which divide a circle drawn from the center and intersecting the mouse click
    const squaresCoordinateList =
      this.generateSquaresCoordinatesForOneCircle(d);

    // Starting from the second circle, becuase the first one dose not have any squares
    // If the distance to the mouse click is smaller than the readious of the circle, then the mouse click belongs to this row
    for (let i = 1; i < this.boardCirclesRadious.length; i++) {
      if (d < this.boardCirclesRadious[i]) {
        x = i;
        break;
      }
    }
    if (x === 0) {
      return null;
    }

    // Get the real angle of the mouse click position
    const _angle = getAngleHelper(this.p5, angle, coordinate.x, coordinate.y);

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
  }

  generateSquares(): { [key: string]: Square } {
    const squares: { [key: string]: Square } = {};

    const boardSquaresCoordinates = this.boardCirclesRadious.map(
      (circleRadious: number) => {
        return this.generateSquaresCoordinatesForOneCircle(circleRadious);
      }
    );

    for (let i = 0; i < boardSquaresCoordinates.length - 1; i++) {
      for (let j = 0; j < boardSquaresCoordinates[i].length - 1; j++) {
        const square = new Square(
          this.p5,
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
        squares[
          `{${i + 1},${boardSquaresCoordinates[i].length - (j + 1) + 1}}`
        ] = square;
      }
    }
    for (let i = 0; i < boardSquaresCoordinates.length - 1; i++) {
      const square = new Square(
        this.p5,
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
  }

  private calculateBoardCirclesRadious = () => {
    let maxRadious = this.p5.width / 2 - 10;
    const circlesRadiousList = [];
    const distance = maxRadious / (this.numRows + 1);
    for (let i = this.numRows; i >= 0; i--) {
      circlesRadiousList.push(maxRadious);
      maxRadious -= distance;
    }
    return circlesRadiousList.reverse();
  };

  private generateSquaresCoordinatesForOneCircle = (radious: number) => {
    const coordinates = [];
    const step = 360 / this.numCols;
    let angle = 0;
    for (let i = 0; i < this.numCols; i++) {
      let x = radious * this.p5.cos(angle);
      let y = radious * this.p5.sin(angle);
      coordinates.push({ x: x, y: y, angle: angle });
      angle += step;
    }
    return coordinates;
  };
}
