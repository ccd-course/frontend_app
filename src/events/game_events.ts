import { Subject } from "rxjs";

export const ActivePlayersEvent = new Subject<
  { player: string; turn: boolean; colorIndex: number }[]
>();
