import p5Types from "p5";
import { Subject } from "rxjs";
import { Coordinate } from "../../types";

export const MouseEvent = new Subject<Coordinate>();

export class MouseEvents {
  constructor(private canvas: p5Types.Element) {}

  // Register the events
  listen() {
    this.onMouseClick();
  }
  // Listen to the mouse clicks on the canvas
  // Send the values to the MouseEvents subject
  private onMouseClick() {
    this.canvas.mouseClicked((event: PointerEvent) => {
      MouseEvent.next({
        x: event.offsetX,
        y: event.offsetY,
      });
    });
  }
}
