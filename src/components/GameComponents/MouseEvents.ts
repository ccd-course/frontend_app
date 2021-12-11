import p5Types from "p5";
import { MouseEvent } from "../../storage/game_data";

/**
 * @class MouseEvnts
 * @remarks
 * The class is responsible for capturing all mouse events on the canvas
 * Only one instance of this class can be created
 */
export class MouseEvents {
  private static instance: MouseEvents;

  /**
   *
   * @param canvas Reference to the canvas
   * @param width Width of the canvas
   * @param height Height of the canvas
   */
  constructor(
    private canvas: p5Types.Element,
    private width: number,
    private height: number
  ) {}

  /**
   * @remarks
   * The function returns an instance of the class.
   * Only one instance of this class should be created.
   *
   * @param canvas Reference to the canvas
   * @param width Width of the canvas
   * @param height Height of the canvas
   *
   */
  public static getInstance(
    canvas: p5Types.Element,
    width: number,
    height: number
  ): MouseEvents {
    if (!MouseEvents.instance) {
      MouseEvents.instance = new MouseEvents(canvas, width, height);
    }

    return MouseEvents.instance;
  }

  /**
   * @remarks
   * Register all the events, which should be captured
   */
  listen() {
    this.onMouseClick();
  }

  /**
   * @remarks
   * Listen to the mouse clicks on the canvas
   * Publish the coordinates of the clicks to the MouseEvent(global object)
   */

  private onMouseClick() {
    this.canvas.mouseClicked((event: PointerEvent) => {
      MouseEvent.next({
        x: this.transformCoordianteForX(event.offsetX),
        y: this.transformCoordianteForY(event.offsetY),
      });
    });
  }

  /**
   *
   * @param x the x-coordinate of the mouse click(original top-left)
   * @returns x-coordinate, where the axes are centerd in the middle of the canvas
   */
  private transformCoordianteForX = (x: number): number => {
    if (x >= this.width / 2) return x - this.width / 2;
    if (x < this.width / 2) return -(this.width / 2 - x);
    throw Error("Mouse click error");
  };

  /**
   * @param y the y-coordinate of the mouse click(original top-left)
   * @returns y-coordinate, where the axes are centerd in the middle of the canvas
   */
  private transformCoordianteForY = (y: number) => {
    if (y <= this.height / 2) return this.height / 2 - y;
    if (y > this.height / 2) return -(y - this.height / 2);
    throw Error("Mouse click error");
  };
}
