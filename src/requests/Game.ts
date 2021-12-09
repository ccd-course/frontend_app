import axios from "axios";

const baseURL = "https://backend.chess.valentinriess.com/";

export const createNewGameRequest = async (players: string[]) => {
  const gameID = await axios.post(baseURL + "/createNewGame", {
    players,
  });
  return gameID;
};
