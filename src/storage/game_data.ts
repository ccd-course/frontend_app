import { BehaviorSubject, Subject } from "rxjs";
import { Coordinate } from "../types";

/**
 * Different components can subscribe to this object and get the new data from it
 */
export const MouseEvent = new Subject<Coordinate>();

export const players = new BehaviorSubject<string[]>([]);

export const currentPlayer = new Subject<string>();
