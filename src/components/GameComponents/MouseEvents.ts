import p5Types from "p5";
import { Subject } from "rxjs";
import { Coordinate } from "../../types";

export const MouseEvent = new Subject<Coordinate>();

export class MouseEvents {
  constructor(
    private canvas: p5Types.Element,
    private width: number,
    private height: number
  ) {}

  // Register the events
  listen() {
    this.onMouseClick();
  }
  // Listen to the mouse clicks on the canvas
  // Send the values to the MouseEvents subject
  private onMouseClick() {
    this.canvas.mouseClicked((event: PointerEvent) => {
      MouseEvent.next({
        x: this.transformCoordianteForX(event.offsetX),
        y: this.transformCoordianteForY(event.offsetY),
      });
    });
  }

  // Coordinate transformation of any point on x-axis of the canvas
  // From top-left to center
  private transformCoordianteForX = (x: number): number => {
    if (x >= this.width / 2) return x - this.width / 2;
    if (x < this.width / 2) return -(this.width / 2 - x);
    throw Error("Mouse click error");
  };

  // Coordinate transformation of any point on y-axis of the canvas
  // From top-left to center
  private transformCoordianteForY = (y: number) => {
    if (y <= this.height / 2) return this.height / 2 - y;
    if (y > this.height / 2) return -(y - this.height / 2);
    throw Error("Mouse click error");
  };
}
