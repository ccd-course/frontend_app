import { Subject } from "rxjs";

export interface IDialogMessage {
  gameID: string;
  status: string;
  players: string[];
}

export const EventDialogMessage = new Subject<IDialogMessage | null>();
