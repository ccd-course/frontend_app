import p5Types from "p5";
import { Subject } from "rxjs";

export const MouseEvent = new Subject<Coordinate>();

export class MouseEvents {
  constructor(private canvas: p5Types.Element) {}
}
