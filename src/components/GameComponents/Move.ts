// Update the layout
// The movment, which should be sent to the backend will be implmented in the Move class
export const handleMouseEvent = (coordinate: Coordinate) => {
  const squareID = getSquareIdOfMouseClick(
    this.p5Reference,
    coordinate.x,
    coordinate.y,
    this.numCols,
    this.boardCirclesRadious
  );
  if (squareID) {
    const { x, y } = squareID;
    const squareIndex = `{${x},${y}}`;

    // Handle the first click
    if (!this.sourceSquare && !this.destinationSquare) {
      // Handle the first click
      // If the square has a piece
      // otherwise do nothing
      if (this.squares[squareIndex].getPiece()) {
        this.sourceSquare = this.squares[squareIndex];
        this.sourceSquare.signSquare();
        this.possibleMovments = generateRandomMovment(
          this.numCols,
          this.numRows
        ).map((square) => {
          return `{${square.x},${square.y}}`;
        });

        this.possibleMovments.forEach((square) => {
          this.squares[square].signSquare();
        });
      }
      // Handle the second click
    } else if (this.sourceSquare && !this.destinationSquare) {
      // If the destination square has a piece, you can move
      if (
        !this.squares[squareIndex].getPiece() &&
        this.possibleMovments.includes(squareIndex)
      ) {
        this.destinationSquare = this.squares[squareIndex];
        this.destinationSquare.setPiece(<Piece>this.sourceSquare.getPiece());
        this.sourceSquare.empty();
        this.sourceSquare = undefined;
        this.destinationSquare = undefined;
      }
    }
  }
};
