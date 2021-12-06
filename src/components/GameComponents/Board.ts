import p5Types from "p5"; //Import this for typechecking and intellisense
import { BoardTable } from "../../types";

export class Board {
  private readonly numRows: number; // Number of rows on the baord
  private readonly numCols: number; // Number of cols on the board

  constructor(
    private readonly p5Reference: p5Types,
    private boardTable: BoardTable
  ) {
    // Init the number of rows and cols
    this.numRows = this.boardTable[0].length;
    this.numCols = this.boardTable.length;
  }
}
