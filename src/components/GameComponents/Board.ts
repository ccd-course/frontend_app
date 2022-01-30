import p5Types from "p5";
import {BoardTable, Coordinate, EVENTS, GAME_TYPE} from "../../types";
import {SELECTION_TYPE, Square} from "./Square";
import {Piece} from "./Piece";
import {executeMove, getPossibleMoves} from "../../requests/Game";
import {ActivePlayersEvent, MouseEvent} from "../../events/game_data";
import {map} from "rxjs";
import {db} from "../../events/db";
import {doc, DocumentData, DocumentSnapshot, onSnapshot,} from "firebase/firestore";
import {EventDialogMessage} from "../../events/EventDialog";

/**
 * Abstract class
 * Includes all the logic needed to create and handle a chessgame
 * Two methods should be implmented in order a board
 *  - generateSquares
 *  - mapMouseCoordinateToSquareID
 */
export abstract class Board {
  public readonly p5: p5Types; // Number of rows on the baord
  public readonly boardTable: BoardTable;
  private readonly gameID: string; // The gameID stored in Backend
  private players: string[] = []; // CurrentPlayer, who is allowed to move the pieces
  private squares: { [key: string]: Square } = {}; // Reference to the board squares
  private currentPlayer = ""; // CurrentPlayer, who is allowed to move the pieces
  private sourceSquare: Square | undefined;
  private destinationSquare: Square | undefined;
  private possibleMovements: Square[] = [];
  private email: string | null;
  private gameType: GAME_TYPE;

  constructor(
    p5: p5Types,
    boardTable: BoardTable,
    gameID: string,
    email: string | null,
    gameType: GAME_TYPE
  ) {
    this.p5 = p5;
    this.boardTable = boardTable;
    this.gameID = gameID;
    this.currentPlayer = "";
    this.email = email;
    this.gameType = gameType;

    onSnapshot(doc(db, "game", gameID), this.handleOnlineChanges);
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
   * @param squareID
   */
  public handleMouseEvent = async (
    squareID: {
      x: number;
      y: number;
    } | null
  ): Promise<void> => {
    if (
      this.gameType === GAME_TYPE.ONLINE &&
      this.email &&
      this.players.indexOf(this.email).toString() != this.currentPlayer
    )
      return;
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
          source.getPlayerID().toString() !== this.currentPlayer
        ) {
          return;
        } else {
          this.sourceSquare = source;
          // Sign the square
          this.sourceSquare.signSquare(SELECTION_TYPE.SQUARE_WITH_PIECE);

          // Send a request and get back all possible movments
          this.possibleMovements = (
            await getPossibleMoves(this.gameID, this.sourceSquare.getIndex())
          ).map(
            (possible: any) =>
              this.squares[`{${possible[0] + 1},${possible[1] + 1}}`]
          );

          // Sign the incpming possible movments
          this.possibleMovements.forEach((square) => {
            square.signSquare(SELECTION_TYPE.POSSIBLE_MOVE);
          });
        }
      }
      // Handle the second click
      else if (this.sourceSquare) {
        const dest = this.squares[squareIndex];

        // Check if the dest is one of possible movments
        if (
          !this.possibleMovements
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
          this.possibleMovements.forEach((square) => {
            square.neglectSquare();
          });
          return;
        } else {
          await executeMove(
            this.gameID,
            this.sourceSquare.getIndex(),
            dest.getIndex()
          );

          this.sourceSquare = undefined;
          this.possibleMovements.forEach((square) => {
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

  private handleOnlineChanges = (changes: DocumentSnapshot<DocumentData>) => {
    const newData = <any>changes.data();
    const events = JSON.parse(newData.events);
    const chessboard = JSON.parse(newData.chessboard);
    this.setPLayers(chessboard);
    ActivePlayersEvent.next(
      this.players.map((player, index) => {
        return {
          player: player,
          turn: index.toString() !== this.currentPlayer ? false : true,
          color: "red",
        };
      })
    );
    if (events.length === 0) {
      EventDialogMessage.next({
        gameID: this.gameID,
        status: "WAITING FOR USERS",
        players: [<string>this.email],
      });
      this.currentPlayer = "";
    } else {
      const lastEvent = events[events.length - 1];
      if (lastEvent.type === EVENTS.NEW_PLAYER_JOIN) {
        EventDialogMessage.next({
          gameID: this.gameID,
          status: "WAITING FOR USERS",
          players: [...this.players],
        });
        return;
      }
      if (lastEvent.type === EVENTS.GAME_STARTED) {
        this.currentPlayer = "0";
        EventDialogMessage.next(null);
        return;
      }
      if (lastEvent.type === EVENTS.PLAYER_CHANGE) {
        this.currentPlayer = lastEvent.metadata.playerId.toString();

        return;
      }
      if (lastEvent.type === EVENTS.NEW_MOVE) {
        const sourceSquare =
          this.squares[
            `{${lastEvent.metadata.start[1] + 1},${
              lastEvent.metadata.start[0] + 1
            }}`
          ];
        const destinationSquare =
          this.squares[
            `{${lastEvent.metadata.end[1] + 1},${
              lastEvent.metadata.end[0] + 1
            }}`
          ];
        const piece = <Piece>sourceSquare.getPiece();
        destinationSquare.setPiece(piece);
        sourceSquare.empty();
      }
    }
  };

  private setPLayers = (chessboard: any[][]) => {
    const players: any[] = [];
    chessboard.forEach((col) => {
      col.forEach((row) => {
        if (row && row.playerName && !players.includes(row.playerName)) {
          players.push(row.playerName);
        }
      });
    });
    this.players = players;
  };

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
            new Piece(this.p5, row.pieceID, row.playerId)
          );
        }
      });
    });
  }
}
