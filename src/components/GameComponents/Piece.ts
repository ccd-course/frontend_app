import p5Types from "p5";

export class Piece {
  private pieceImage: Promise<p5Types.Image>; // Promise containing the image
  private coordinate: Coordinate | undefined; // Postion of the piece on the canvas

  private size: number | undefined; // Size of the piece
}
