import p5Types from "p5";
import { BoardTable, Coordinate } from "../../types";
import { SELECTION_TYPE, Square } from "./Square";
import { Piece } from "./Piece";
import { executeMove, getPossibleMoves } from "../../requests/Game";
import { MouseEvent } from "../../storage/game_data";
import { map } from "rxjs";

/**
 * Abstract class
 * Includes all the logic needed to create and handle a chessgame
 * Two methods should be implmented in order a board
 *  - generateSquares
 *  - mapMouseCoordinateToSquareID
 */
export abstract class Board {
  public readonly p5: p5Types; // Number of rows on the baord
  private readonly gameID: string; // The gameID stored in Backend
  private readonly players: string[]; // CurrentPlayer, who is allowed to move the pieces
  public readonly boardTable: BoardTable;

  private squares: { [key: string]: Square } = {}; // Reference to the board squares
  private currentPlayer: string; // CurrentPlayer, who is allowed to move the pieces
  private sourceSquare: Square | undefined;
  private destinationSquare: Square | undefined;
  private possibleMovments: Square[] = [];

  constructor(
    p5: p5Types,
    boardTable: BoardTable,
    gameID: string,
    players: string[],
    currentPlayer: string
  ) {
    this.p5 = p5;
    this.boardTable = boardTable;
    this.gameID = gameID;
    this.players = players;
    this.currentPlayer = currentPlayer;
  }

  abstract generateSquares(): { [key: string]: Square };
  abstract mapMouseCoordinateToSquareID(
    coordinate: Coordinate
  ): Coordinate | null;

  /**
   * Init the squares, pieces and subscribe to the mouse events
   * @returns this
   */
  public init() {
    // Generate the square
    this.squares = this.generateSquares();
    // Add the pieces to the board
    this.setBoardPieces();
    // Subscribe to the MouseEvent
    MouseEvent.pipe(
      map((coordiante: Coordinate) =>
        this.mapMouseCoordinateToSquareID(coordiante)
      )
    ).subscribe(this.handleMouseEvent);
    return this;
  }

  /**
   * Handle the mouse click events
   * @param coordinate Coordinate of the mouse click
   */
  public handleMouseEvent = async (
    squareID: {
      x: number;
      y: number;
    } | null
  ): Promise<void> => {
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
   * Render the sqaures on the screen
   */
  private drawSquares() {
    Object.keys(this.squares).forEach((key) => {
      this.squares[key].drawSquare();
    });
  }

  /**
   * Read the given board, init the pieces and store them in the right square
   */
  private setBoardPieces() {
    this.boardTable.forEach((col, colIndex) => {
      col.forEach((row, rowIndex) => {
        if (row) {
          this.squares[`{${rowIndex + 1},${colIndex + 1}}`].setPiece(
            new Piece(this.p5, row.pieceID, row.playerName)
          );
        }
      });
    });
  }
}
