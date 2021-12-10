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

export const getPossibleMoves = (
  gameID: string,
  piecePosition: [number, number]
) => {
  try {
    return axios
      .post(baseURL + "/moveRequest", {
        gameID,
        piecePosition,
      })
      .then((data) => {
        return data.data;
      });
  } catch (e) {
    console.log(e);
  }
};
