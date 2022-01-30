import React, { useEffect, useState } from "react";
import { IMoveHistory, MoveHistoryEvent } from "../../events/game_data";
import { ListItem, ListItemText } from "@mui/material";

export const MoveHistory = () => {
  const [moveHistory, setMoveHistory] = useState<IMoveHistory[]>([]);

  useEffect(() => {
    MoveHistoryEvent.subscribe((newEvent) => {
      setMoveHistory(newEvent);
    });
  }, []);

  const renderHistory = () => {
    return moveHistory.map((move, index) => {
      return (
        <ListItem disablePadding key={index}>
          <ListItemText primary={move.playerID} style={{ color: "#000" }} />
          <ListItemText
            primary={`${move.move.src} => ${move.move.dest}`}
            style={{ color: "#000" }}
          />
        </ListItem>
      );
    });
  };
  console.log("RERENDERING");
  return <>{renderHistory()}</>;
};

export {};
