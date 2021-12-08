export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max + 1);
};

const Games = [];
const data: any = {};

export const createNewGame = (players: string[]) => {
  const gameID = getRandomInt(100);
  Games.push(gameID);
  data[gameID] = [];
  players.forEach((player: string) => {
    data[gameID].push(player);
  });
  return gameID;
};
