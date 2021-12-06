import p5Types from "p5";
import { Coordinate } from "../../types";

export class Piece {
  private pieceImage: Promise<p5Types.Image>; // Promise containing the image
  private coordinate: Coordinate | undefined; // Postion of the piece on the canvas

  private size: number | undefined; // Size of the piece

  constructor(
    private p5Reference: p5Types,
    private readonly pieceId: number,
    private readonly playerID: number
  ) {
    this.pieceImage = this.loadImagePromise();
  }

  // Load the image, given the playerID and pieceID
  private loadImagePromise = (): Promise<p5Types.Image> => {
    const img = require("../../images/player" +
      this.playerID +
      "/" +
      this.pieceId +
      ".svg").default;
    // Encapsulte the call back inside a Promise
    return new Promise((resolve, reject) => {
      this.p5Reference.loadImage(img, (imgData) => {
        return resolve(imgData);
      });
    });
  };
}
