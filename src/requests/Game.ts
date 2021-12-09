import axios from "axios";

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
        const players = [];
        data.data.chessboard.forEach((cols: any) => {
          cols.forEach((row: any) => {
            if (row && row.playerName) {
              players.push(row.playerName);
              row.playerID = 1;
            }
          });
        });
        return data.data.chessboard;
      });
  } catch (e) {
    console.log(e);
  }
};
