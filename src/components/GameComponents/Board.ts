import p5Types from "p5";
import { BoardTable, Coordinate } from "../../types";
import { getSquareIdOfMouseClick } from "./Helpers";
import { SELECTION_TYPE, Square } from "./Square";
import { Piece } from "./Piece";
import { executeMove, getPossibleMoves } from "../../requests/Game";
import { MouseEvent } from "../../storage/game_data";
import {
  calculateBoardCirclesRadious,
  generateSquareCoordinates,
} from "./Generators";

/**
 * Represent the chess-board
 * handles the layout logic of the game
 *
 */
export class Board {
  private boardCirclesRadious: number[]; // Needed to generate the squares (Rows)
  private readonly numRows: number; // Number of rows on the baord
  private readonly numCols: number; // Number of cols on the board
  private sourceSquare: Square | undefined;
  private destinationSquare: Square | undefined;
  private possibleMovments: Square[] = [];
  private squares: { [key: string]: Square } = {}; // Reference to the board squares

  constructor(
    private readonly p5Reference: p5Types,
    private boardTable: BoardTable,
    private gameID: string,
    private currentPlayer: string,
    private players: string[]
  ) {
    // Init the number of rows and cols
    this.numRows = this.boardTable[0].length;
    this.numCols = this.boardTable.length;

    // Calculate the radiouses of the circles on the board
    this.boardCirclesRadious = calculateBoardCirclesRadious(
      p5Reference,
      this.numRows
    );
    // Generate the squares and calculate their coordinates
    this.squares = generateSquareCoordinates(
      this.p5Reference,
      this.boardCirclesRadious,
      this.numCols
    );
    // Add the pieces to the board
    this.initBoardPieces();

    // Subscribe to the MouseEvent
    MouseEvent.subscribe(this.handleMouseEvent);
  }

  /**
   * Handle the mouse click events
   * @param coordinate Coordinate of the mouse click
   */
  public handleMouseEvent = async (coordinate: Coordinate): Promise<void> => {
    const squareID = getSquareIdOfMouseClick(
      this.p5Reference,
      coordinate.x,
      coordinate.y,
      this.numCols,
      this.boardCirclesRadious
    );
    // If the user click inside the board
    if (squareID) {
      const { x, y } = squareID;
      const squareIndex = `{${x},${y}}`;

      // First click
      if (!this.sourceSquare && !this.destinationSquare) {
        const source = this.squares[squareIndex];
        // Check if the square has a piece
        // Check if the piece belongs to the right player

        if (
          !source.getPiece() ||
          source.getPlayerID().toString() !== this.currentPlayer.toString()
        ) {
          return;
        } else {
          this.sourceSquare = source;
          // Sign the square
          this.sourceSquare.signSquare(SELECTION_TYPE.SQUARE_WITH_PIECE);

          // Send a request and get back all possible movments
          this.possibleMovments = (
            await getPossibleMoves(this.gameID, this.sourceSquare.getIndex())
          ).map(
            (possible: any) =>
              this.squares[`{${possible[0] + 1},${possible[1] + 1}}`]
          );

          // Sign the incpming possible movments
          this.possibleMovments.forEach((square) => {
            square.signSquare(SELECTION_TYPE.POSSIBLE_MOVE);
          });
        }
      }
      // Handle the second click
      else if (this.sourceSquare) {
        const dest = this.squares[squareIndex];

        // Check if the dest is one of possible movments
        if (
          !this.possibleMovments
            .map((square) => {
              return square.getIndex().toString();
            })
            .includes(dest.getIndex().toString())
        ) {
          // Set source and dest to default values
          // remove all possible movments
          this.sourceSquare.neglectSquare();
          this.sourceSquare = undefined;
          this.destinationSquare = undefined;
          this.possibleMovments.forEach((square) => {
            square.neglectSquare();
          });
          return;
        } else {
          const nextPlayer = await executeMove(
            this.gameID,
            this.sourceSquare.getIndex(),
            dest.getIndex()
          );

          this.currentPlayer = this.players.indexOf(nextPlayer).toString();
          dest.setPiece(<Piece>this.sourceSquare.getPiece());

          // After moving the piece
          // Set source to undefined
          this.sourceSquare.empty();
          this.sourceSquare = undefined;
          this.possibleMovments.forEach((square) => {
            square.neglectSquare();
          });
        }
      }
    }
  };

  /**
   * Render the board
   */
  public drawBoard() {
    this.drawSquares();
  }

  /**
   * Read the given board, init the pieces and store them in the right square
   */
  private initBoardPieces() {
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

  /**
   * Render the sqaures on the screen
   */
  private drawSquares() {
    Object.keys(this.squares).forEach((key) => {
      this.squares[key].drawSquare();
    });
  }
}
