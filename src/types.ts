import { AUTH_DIALOG_TYPES } from "./components/Dialogs/AuthenticationDialog";
import { Square } from "./components/GameComponents/Square";

export enum GAME_TYPE {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  UNDEFINED = "UNDEFINED",
}

export enum EVENTS {
  GAME_STARTED = "GAME_STARTED",
  NEW_PLAYER_JOIN = "NEW_PLAYER_JOIN",
  PLAYER_CHANGE = "PLAYER_CHANGE",
  NEW_MOVE = "NEW_MOVE",
}

export type setAuthDialogFunc = (input: {
  open: boolean;
  type: AUTH_DIALOG_TYPES;
}) => void;

export interface IAuthDialog {
  open: boolean;
  type: AUTH_DIALOG_TYPES;
}

export interface NewGameDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export interface NewGameDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  auth: AuthenticationState;
}

export interface BoardPiece {
  playerId: string;
  pieceID: string;
}

export type BoardTable = (BoardPiece | null)[][];

export type Coordinate = { x: number; y: number };

export interface SquareCoordinates {
  p1: Coordinate;
  p2: Coordinate;
  p3: Coordinate;
  p4: Coordinate;
}

export interface IBoard {
  numRows: number;
  numCos: number;
  sourceSquare: Square | undefined;
  destinationSquare: Square | undefined;
}

export type ResponseChessboard = { pieceID: string; playerName: string }[][];
export type PossibleMoves = [number, number][];

export interface AuthenticationState {
  open: boolean;
  type: string;
  email: any;
}
