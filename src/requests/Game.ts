import axios from "axios";
import { ResponseChessboard } from "../types";

const baseURL = "https://backend.chess.valentinriess.com"; //process.env.REACT_APP_API_BASE_URL;

/**
 * Send a request to create a new game
 * @param players
 * @returns gameID
 */
export const createNewGameRequest = async (players: string[]) => {
  try {
    return await axios
      .post(baseURL + "/createNewGame", {
        players: players.map((player) => {
          return { playerName: player };
        }),
      })
      .then((data) => {
        console.log(data.data);
        return data.data;
      });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Send a request to get the chessboard
 * @param gameID
 * @returns
 *
 */
export const getChessboard = async (
  gameID: string
): Promise<ResponseChessboard> => {
  return axios.get(baseURL + "/getChessboard?gameID=" + gameID).then((data) => {
    return data.data.chessboard;
  });
};

/**
 * Send a request to close the game
 * @param gameID
 * @returns
 */
export const closeGame = async (
  gameID: string
): Promise<ResponseChessboard> => {
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
