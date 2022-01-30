import p5Types from "p5";
import {Coordinate} from "../../types";

/**
 * Representation of the piece
 */
export class Piece {
  private pieceImage: Promise<p5Types.Image>; // Promise containing the image
  private coordinate: Coordinate | undefined; // Postion of the piece on the canvas

  private size: number | undefined; // Size of the piece

  constructor(
    private p5Reference: p5Types,
    private readonly pieceId: string,
    private playerID: string
  ) {
    this.pieceImage = this.loadImagePromise();
  }

  /**
   * Draw the piece on the canvas
   */
  public async drawPiece() {
    if (this.coordinate && this.size) {
      const image = await this.pieceImage;
      this.p5Reference.imageMode(this.p5Reference.CENTER);
      this.p5Reference.image(
        image,
        this.coordinate.x,
        this.coordinate.y,
        this.size,
        this.size
      );
    }
  }

  /**
   * Set the coordinate of the piece
   *  */
  public setPosition(coordinate: Coordinate) {
    this.coordinate = coordinate;
  }

  /**
   * Set the image size
   * @param size
   */
  public setDimenstion(size: number) {
    this.size = size;
  }

  /**
   *
   * @returns the playerID, to which the piece belongs
   */
  public getPlayerID() {
    return this.playerID;
  }

  public getPieceID() {
    return this.pieceId;
  }

  public setPlayerID(id: string) {
    this.playerID = id;
  }

  /**
   * @returns Load the image, given the playerID and pieceID
   */
  private loadImagePromise = (): Promise<p5Types.Image> => {
    let img: any;
    if (this.pieceId === "Cannon") {
      img = require("../../images/" + this.pieceId + ".svg").default;
    } else {
      img = require("../../images/player" +
        this.playerID +
        "/" +
        this.pieceId +
        this.playerID +
        ".svg").default;
    }

    // Encapsulte the call back inside a Promise
    return new Promise((resolve, reject) => {
      this.p5Reference.loadImage(img, (imgData) => {
        return resolve(imgData);
      });
    });
  };
}
