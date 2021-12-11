import p5Types from "p5";
import { Coordinate, SquareCoordinates } from "../../types";
import { intersectionPointOfTwoLines } from "./Helpers";
import { Piece } from "./Piece";

export enum SELECTION_TYPE {
  SQUARE_WITH_PIECE,
  POSSIBLE_MOVE,
}

/**
 * Representation of the individual squares on the board
 *
 */
export class Square {
  private sqaureColor: p5Types.Color; //  Color of the square. Will be automatically generated.
  private piece: Piece | undefined; // Reference to the piece if it exists inside the square.

  constructor(
    private p5: p5Types, // Reference to the p5 library
    private coordinates: SquareCoordinates, // Coordinates of the points of the square
    private squareIndex: [number, number] // Represent the index of the square on the board [Col,Row]
  ) {
    // Generate the color of the square
    this.sqaureColor = this.generateSquareColor();
  }

  /**
   * @param type type of selection
   * @returns Return the color
   */
  private getSelectionColor(type: SELECTION_TYPE) {
    if (type === SELECTION_TYPE.POSSIBLE_MOVE) return this.p5.color(0, 87, 63);
    return this.p5.color(51, 102, 153);
  }

  /**
   *  Calculate and retrun the coordinates of the center of the square
   *  */
  public get center(): Coordinate {
    return intersectionPointOfTwoLines(
      [this.coordinates.p1.x, this.coordinates.p1.y],
      [this.coordinates.p3.x, this.coordinates.p3.y],
      [this.coordinates.p2.x, this.coordinates.p2.y],
      [this.coordinates.p4.x, this.coordinates.p4.y]
    );
  }

  /**
   * Place a piece inside the square
   * @param piece set a piece inside the square
   */
  public setPiece = (piece: Piece) => {
    this.piece = piece;
    this.piece.setPosition(this.center);
    this.piece.setDimenstion(this.contentDimension);
    this.drawPiece();
  };

  /**
   *  Draw the piece in the square if it exists
   * */
  public drawPiece() {
    if (this.piece) this.piece.drawPiece();
  }

  /**
   * Returning a reference to the piece inside the square
   */
  public getPiece = () => {
    return this.piece;
  };

  /**
   * Remove the content of the sqaure
   */
  public empty = () => {
    this.piece = undefined;
    this.drawSquare();
  };

  /**
   * @returns The playerID of the piece
   */
  public getPlayerID = () => {
    return this.piece?.getPlayerID();
  };

  /**
   * Calculate the size of the square content
   * The shortest side of the square minus a margin
   *  */
  private get contentDimension() {
    return (
      this.p5.dist(
        this.coordinates.p3.x,
        this.coordinates.p3.y,
        this.coordinates.p4.x,
        this.coordinates.p4.y
      ) -
      16 * this.squareIndex[0]
    );
  }

  /**
   * Draw the square given the coordinates and fill it with the generated color
   *  */
  public drawSquare() {
    this.p5.fill(this.sqaureColor);
    this.p5.beginShape();
    this.p5.vertex(this.coordinates.p1.x, this.coordinates.p1.y);
    this.p5.vertex(this.coordinates.p2.x, this.coordinates.p2.y);
    this.p5.vertex(this.coordinates.p3.x, this.coordinates.p3.y);
    this.p5.vertex(this.coordinates.p4.x, this.coordinates.p4.y);
    this.p5.vertex(this.coordinates.p1.x, this.coordinates.p1.y);
    this.p5.endShape();
  }

  /**
   * Generate the square color
   * even squares have different color than odd ones.
   * */
  private generateSquareColor() {
    if ((this.squareIndex[0] + this.squareIndex[1]) % 2 != 0)
      return this.p5.color(240, 227, 202);
    else return this.p5.color(163, 87, 9);
  }

  /**
   * Draw a circle inside the square with the corresponding type-color
   *
   * @param type different type of signs
   *  */
  public signSquare = (type: SELECTION_TYPE) => {
    this.drawSquare(); // Draw the square
    this.p5.fill(this.getSelectionColor(type));
    this.p5.circle(this.center.x, this.center.y, this.contentDimension); // Draw a circle inside the square
    this.drawPiece(); // Draw the piece
  };

  /**
   * Remove the sign drawn inside the square
   */
  public neglectSquare = () => {
    this.drawSquare(); // Redraw the square
    this.drawPiece(); // Redraw the piece inside the square
  };

  /**
   * @returns The square index
   */
  public getIndex() {
    return this.squareIndex;
  }
}
