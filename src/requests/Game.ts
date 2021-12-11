import axios from "axios";
import { ResponseChessboard } from "../types";

const baseURL = "https://backend.chess.valentinriess.com";

export const createNewGameRequest = async (players: string[]) => {
  try {
    return await axios
      .post(baseURL + "/createNewGame", {
        players: players.map((player) => {
          return { playerName: player };
        }),
      })
      .then((data) => {
        return data.data;
      });
  } catch (e) {
    console.log(e);
  }
};

/**
 *
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

export const closeGame = async (
  gameID: string
): Promise<ResponseChessboard> => {
  console.log(gameID);
  return axios.post(baseURL + "/endGame?gameID=" + gameID, {}).then((data) => {
    return data.data.chessboard;
  });
};

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
        return data.data.possibleMoves;
      })
      .catch((e) => {
        console.log("E", e);
      });
  } catch (e) {
    console.log(e);
  }
};
