import React, { useEffect, useState } from "react";
import { IMoveHistory, MoveHistoryEvent } from "../../events/game_data";
import { Divider, ListItem, ListItemText } from "@mui/material";

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
        <>
          <ListItem disablePadding key={index} style={{ display: "flex" }}>
            <ListItemText
              primary={move.playerID}
              style={{ color: "#000", flex: 4 }}
            />
            <ListItemText
              primary={`${move.move.src} => ${move.move.dest}`}
              style={{ color: "#000", flex: 2 }}
            />
          </ListItem>
          <Divider />
        </>
      );
    });
  };
  return <>{renderHistory()}</>;
};

export {};
