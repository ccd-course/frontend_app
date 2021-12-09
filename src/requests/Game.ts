import axios from "axios";

const baseURL = "https://backend.chess.valentinriess.com/";

export const createNewGameRequest = async (players: string[]) => {
  return await axios.post(baseURL + "/createNewGame", {
    players,
  });
};

export const getChessboard = async (gameID: string) => {
  return await axios.get(baseURL + "/getChessboard?gameID=" + gameID);
};
