import axios from "axios";

const baseURL = "https://backend.chess.valentinriess.com/";

export const createNewGameRequest = async (players: string[]) => {
  try {
    return await axios.post(baseURL + "/createNewGame", {
      players,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getChessboard = async (gameID: string) => {
  try {
    return await axios.get(baseURL + "/getChessboard?gameID=" + gameID);
  } catch (e) {
    console.log(e);
  }
};
