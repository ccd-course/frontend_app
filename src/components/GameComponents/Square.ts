import p5Types from "p5";
import { SquareCoordinates } from "../../types";
import { Piece } from "./Piece";

export class Square {
  private sqaureColor: p5Types.Color; // The color of the square is generated automatically.
  private piece: Piece | undefined; // Reference to the piece if it exists in this square

  constructor(
    private p5: p5Types, // Reference to the p5 library
    private coordinates: SquareCoordinates, // Coordinates of the points of the square
    private squareIndex: [number, number] // Represent the index of the square on the board [Row, Column]
  ) {
    // Generate the color of the square
    this.sqaureColor = this.generateSquareColor();
  }

  // Calculate the coordinate point of the center of the square
  public get center(): Coordinate {
    return intersectionPointOfTwoLines(
      [this.coordinates.p1.x, this.coordinates.p1.y],
      [this.coordinates.p3.x, this.coordinates.p3.y],
      [this.coordinates.p2.x, this.coordinates.p2.y],
      [this.coordinates.p4.x, this.coordinates.p4.y]
    );
  }

  // Given the coordinates of the verteses
  // Draw the square and fill it with the generated color
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

  // Generate the square color
  // An odd square has a different color than an even square.
  private generateSquareColor() {
    if ((this.squareIndex[0] + this.squareIndex[1]) % 2 != 0)
      return this.p5.color(240, 227, 202);
    else return this.p5.color(163, 87, 9);
  }
}