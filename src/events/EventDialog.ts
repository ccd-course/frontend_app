import { Subject } from "rxjs";

export interface IDialogMessage {
  gameID: string;
  status: string;
  players: string[];
  result?: string;
  winner?: string;
}

export const EventDialogMessage = new Subject<IDialogMessage | null>();
