import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export enum GameType {
  LOCAL = "OFFLINE",
  ONLINE = "ONLINE",
}

/**
 * Send a request to create a new game
 * @param players
 * @returns gameID
 */
export const createNewGame = async (
  type: GameType,
  numberOfPlayers: number,
  players: { playerName: string }[]
) => {
  return axios.post(baseURL + "/createNewGame", {
    type,
    numberOfPlayers,
    players,
  });
};

/**
 * Send a request to get the chessboard
 * @param gameID
 * @returns
 *
 */
export const getChessboard = async (gameID: string): Promise<any> => {
  return axios.get(baseURL + "/getChessboard?gameID=" + gameID).then((data) => {
    return data.data.chessboard;
  });
};

/**
 * Send a request to close the game
 * @param gameID
 * @returns
 */
export const closeGame = async (gameID: string): Promise<any> => {
  console.log(gameID);
  return axios.post(baseURL + "/endGame?gameID=" + gameID, {}).then((data) => {
    return data.data.chessboard;
  });
};

/**
 * Send a request to get all possible moves for a given piece
 * @param gameID
 * @param piecePosition
 * @returns
 */
export const getPossibleMoves = (
  gameID: string,
  piecePosition: [number, number]
) => {
  try {
    return axios
      .post(baseURL + "/moveRequest", {
        gameID: Number(gameID),
        piecePosition: [piecePosition[0] - 1, piecePosition[1] - 1],
      })
      .then((data) => {
        return data.data.possibleMoves;
      })
      .catch((e) => {
        console.log("E", e);
      });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Exectue the move
 * @param gameID
 * @param previousPiecePosition
 * @param newPiecePosition
 * @returns
 */
export const executeMove = (
  gameID: string,
  previousPiecePosition: [number, number],
  newPiecePosition: [number, number]
) => {
  try {
    return axios
      .post(baseURL + "/executedMove", {
        gameID: Number(gameID),
        previousPiecePosition: [
          previousPiecePosition[0] - 1,
          previousPiecePosition[1] - 1,
        ],
        newPiecePosition: [newPiecePosition[0] - 1, newPiecePosition[1] - 1],
      })
      .then((data) => {
        return data.data;
      })
      .catch((e) => {
        console.log("e", e);
      });
  } catch (e) {
    console.log(e);
  }
};

export const joinGame = (player: string, gameId: string) => {
  return axios.post(baseURL + "/joinOnlineNewGame", { player, gameId });
};
