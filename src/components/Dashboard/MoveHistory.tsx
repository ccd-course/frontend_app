import React, { useEffect, useState } from "react";
import { IMoveHistory, MoveHistoryEvent } from "../../events/game_data";
import { ListItem, ListItemText } from "@mui/material";

export const MoveHistory = () => {
  const [moveHistory, setMoveHistory] = useState<IMoveHistory[]>([]);

  useEffect(() => {
    MoveHistoryEvent.subscribe((newEvent) => {
      const newHistoryList = [...moveHistory, newEvent];
      setMoveHistory(newHistoryList);
    });
  }, []);

  const renderHistory = () => {
    return moveHistory.map((move) => {
      return (
        <ListItem disablePadding>
          <ListItemText primary={move.playerID} style={{ color: "#000" }} />
          <ListItemText
            primary={`${move.move.src} => ${move.move.dest}`}
            style={{ color: "#000" }}
          />
        </ListItem>
      );
    });
  };

  return <>{renderHistory()}</>;
};
