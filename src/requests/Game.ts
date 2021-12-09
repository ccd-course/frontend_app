import axios from "axios";
import { BoardTable } from "../types";

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

export const getChessboard = async (gameID: string) => {
  try {
    return await axios
      .get(baseURL + "/getChessboard?gameID=" + gameID)
      .then((data) => {
        console.log(data.data.chessboard);
        return data.data.chessboard;
      });
  } catch (e) {
    console.log(e);
  }
};
