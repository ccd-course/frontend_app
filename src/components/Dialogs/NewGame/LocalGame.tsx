import { useState } from "react";

export const OnlineGame = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [playersName, setPlayersName] = useState<string[]>([]);
  const [canStart, setCanStart] = useState(false);

  return <div></div>;
};
