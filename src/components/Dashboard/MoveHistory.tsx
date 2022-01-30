import React, { useEffect, useState } from "react";
import { IMoveHistory, MoveHistoryEvent } from "../../events/game_data";
import { ListItem, ListItemText } from "@mui/material";

export const MoveHistory = () => {
  const [moveHistory, setMoveHistory] = useState<{
    history: IMoveHistory[] | null;
  }>({ history: null });

  useEffect(() => {
    MoveHistoryEvent.subscribe((newEvent) => {
      setMoveHistory(newEvent);
    });
  }, [moveHistory]);

  const renderHistory = () => {
    return moveHistory?.history?.map((move, index) => {
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
