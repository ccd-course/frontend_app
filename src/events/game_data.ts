import {Subject} from "rxjs";
import {Coordinate} from "../types";

/**
 * Different components can subscribe to this object and get the new data from it
 */
export const MouseEvent = new Subject<Coordinate>();

export interface IMoveHistory {
  playerID: string;
  move: {
    src: [];
    dest: [];
    fixed?: boolean;
  };
}

export const MoveHistoryEvent = new Subject<{ history: IMoveHistory[] }>();
