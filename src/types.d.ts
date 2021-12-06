export interface NewGameDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export interface BoardPiece {
  playerID: number;
  pieceID: number;
}

export type BoardTable = (BoardPiece | null)[][];
