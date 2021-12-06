export interface NewGameDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export interface BoardPiece {
  playerID: number;
  pieceID: number;
}

export type BoardTable = (BoardPiece | null)[][];

export type Coordinate = { x: number; y: number };

export interface SquareCoordinates {
  p1: Coordinate;
  p2: Coordinate;
  p3: Coordinate;
  p4: Coordinate;
}
