import p5Types from "p5"; //Import this for typechecking and intellisense
import { BoardTable, Coordinate } from "../../types";
import {
  generateSquaresCoordinatesForOneCircle,
  getSquareIdOfMouseClick,
} from "./Helpers";
import { SELECTION_TYPE, Square } from "./Square";
import { Piece } from "./Piece";
import { Subscription } from "rxjs";
import { executeMove, getPossibleMoves } from "../../requests/Game";
import { currentPlayer, MouseEvent, players } from "../../storage/game_data";

export class Board {
  private boardCirclesRadious: number[]; // Needed to generate the squares (Rows)
  private readonly numRows: number; // Number of rows on the baord
  private readonly numCols: number; // Number of cols on the board
  private sourceSquare: Square | undefined;
  private destinationSquare: Square | undefined;
  private possibleMovments: Square[] = [];
  private squares: { [key: string]: Square } = {}; // Reference to the board squares
  private MouseEvent: Subscription;
  private currentPlayer: number;
  private players: string[];
  constructor(
    private readonly p5Reference: p5Types,
    private boardTable: BoardTable,
    private gameID: string
  ) {
    // Init the number of rows and cols
    this.numRows = this.boardTable[0].length;
    this.numCols = this.boardTable.length;

    // Calculate the radiouses of the circles on the board
    this.boardCirclesRadious = this.calculateBoardCirclesRadious();
    // Generate the squares and calculate their coordinates
    this.generateSquares();
    // Add the pieces to the board
    this.addBoardPieces();
    // Subscribe to the MouseEvent
    this.MouseEvent = MouseEvent.subscribe(this.handleMouseEvent);

    this.currentPlayer = currentPlayer.getValue();
    this.players = players.getValue();

    console.log(this.currentPlayer);
    console.log(this.players);
  }

  // Update the layout
  // The movment, which should be sent to the backend will be implmented in the Move class
  public handleMouseEvent = async (coordinate: Coordinate) => {
    const squareID = getSquareIdOfMouseClick(
      this.p5Reference,
      coordinate.x,
      coordinate.y,
      this.numCols,
      this.boardCirclesRadious
    );
    if (squareID) {
      const { x, y } = squareID;
      const squareIndex = `{${x},${y}}`;

      // Handle the first click
      if (!this.sourceSquare && !this.destinationSquare) {
        // Handle the first click
        // If the square has a piece
        // otherwise do nothing

        if (this.squares[squareIndex].getPiece()) {
          if (
            this.squares[squareIndex].getPlayerID().toString() !==
            this.currentPlayer.toString()
          ) {
            return;
          }
          this.sourceSquare = this.squares[squareIndex];
          this.sourceSquare.signSquare(SELECTION_TYPE.SQUARE_WITH_PIECE);
          this.possibleMovments = (
            await getPossibleMoves(this.gameID, this.sourceSquare.getIndex())
          ).map(
            (possible: any) =>
              this.squares[`{${possible[0] + 1},${possible[1] + 1}}`]
          );

          this.possibleMovments.forEach((square) => {
            square.signSquare(SELECTION_TYPE.POSSIBLE_MOVE);
          });
        }

        // Handle the second click
      } else if (this.sourceSquare && !this.destinationSquare) {
        this.destinationSquare = this.squares[squareIndex];
        // If the destination square has a piece, you can move
        if (
          !this.possibleMovments
            .map((square) => {
              return square.getIndex().toString();
            })
            .includes(this.destinationSquare.getIndex().toString())
        ) {
          this.sourceSquare.neglectSquare();
          this.sourceSquare = undefined;
          this.destinationSquare = undefined;
          this.possibleMovments.forEach((square) => {
            square.neglectSquare();
          });
          return;
        }
        if (
          this.sourceSquare?.getIndex()[0] ==
            this.destinationSquare?.getIndex()[0] &&
          this.sourceSquare?.getIndex()[1] ==
            this.destinationSquare?.getIndex()[1]
        ) {
          // If the destination square has a piece, you can move
          this.sourceSquare?.neglectSquare();
          this.destinationSquare?.neglectSquare();

          this.sourceSquare = undefined;
          this.destinationSquare = undefined;

          this.possibleMovments.forEach((square) => {
            square.neglectSquare();
          });
          return;
        }
        if (
          this.possibleMovments
            .map((square) => {
              return square.getIndex().toString();
            })
            .includes(this.squares[squareIndex].getIndex().toString())
        ) {
          const _currentPlyer = await executeMove(
            this.gameID,
            this.sourceSquare.getIndex(),
            this.destinationSquare.getIndex()
          );

          this.currentPlayer = this.players.indexOf(_currentPlyer);
          console.log(this.currentPlayer);

          this.destinationSquare = this.squares[squareIndex];
          this.destinationSquare.setPiece(<Piece>this.sourceSquare.getPiece());
          this.sourceSquare.empty();
          this.sourceSquare = undefined;
          this.destinationSquare = undefined;
          this.possibleMovments.forEach((square) => {
            square.neglectSquare();
          });
        }
      }
    }
  };
  // Render the board
  public drawBoard() {
    this.drawSquares();
    return this;
  }

  // Read the board table and generate the pieces in the right square
  private addBoardPieces() {
    this.boardTable.forEach((col, colIndex) => {
      col.forEach((row, rowIndex) => {
        if (row) {
          this.squares[`{${rowIndex + 1},${colIndex + 1}}`].setPiece(
            new Piece(this.p5Reference, row.pieceID, row.playerName)
          );
        }
      });
    });
  }

  // Render all the squares
  private drawSquares() {
    Object.keys(this.squares).forEach((key) => {
      this.squares[key].drawSquare();
    });
  }

  // Given the table rows, the function calculate the radious of each circle
  private calculateBoardCirclesRadious = () => {
    let maxRadious = this.p5Reference.width / 2 - 10;
    const circlesRadiousList = [];
    const distance = maxRadious / (this.numRows + 1);
    for (let i = this.numRows; i >= 0; i--) {
      circlesRadiousList.push(maxRadious);
      maxRadious -= distance;
    }
    return circlesRadiousList.reverse();
  };

  // Calculate the square coorindates
  private generateSquares = () => {
    const boardSquaresCoordinates = this.boardCirclesRadious.map(
      (circleRadious: number) => {
        return generateSquaresCoordinatesForOneCircle(
          this.p5Reference,
          circleRadious,
          this.numCols
        );
      }
    );

    for (let i = 0; i < boardSquaresCoordinates.length - 1; i++) {
      for (let j = 0; j < boardSquaresCoordinates[i].length - 1; j++) {
        const square = new Square(
          this.p5Reference,
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
        this.squares[
          `{${i + 1},${boardSquaresCoordinates[i].length - (j + 1) + 1}}`
        ] = square;
      }
    }
    for (let i = 0; i < boardSquaresCoordinates.length - 1; i++) {
      const square = new Square(
        this.p5Reference,
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
      this.squares[`{${i + 1},1}`] = square;
    }
  };
}
