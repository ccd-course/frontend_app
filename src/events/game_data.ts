import {Subject} from "rxjs";
import {Coordinate} from "../types";

/**
 * Different components can subscribe to this object and get the new data from it
 */
export const MouseEvent = new Subject<Coordinate>();

export const ActivePlayersEvent = new Subject<
  { player: string; turn: boolean; color: string }[]
>();

export const PLAYER_COLORS = ["white", "black", "blue"];

export interface IMoveHistory {
  playerID: string;
  move: {
    src: [];
    dest: [];
  };
}

export const MoveHistoryEvent = new Subject<IMoveHistory[]>();
