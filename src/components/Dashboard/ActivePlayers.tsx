import React, { useEffect, useState } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { ActivePlayersEvent } from "../../events/game_events";
import { PLAYER_COLORS } from "../../styles/player.style";

export const ActivePlayers = () => {
  const [players, setPlayers] =
    useState<{ player: string; turn: boolean; colorIndex: number }[]>();

  useEffect(() => {
    ActivePlayersEvent.subscribe((newData) => {
      console.log(newData);
      setPlayers(newData);
    });
  }, []);

  const renderPlayers = () => {
    return players?.map((player, index) => {
      return (
        <ListItem disablePadding>
          {player.turn ? (
            <ListItemIcon>
              <StarIcon style={{ color: PLAYER_COLORS[player.colorIndex] }} />
            </ListItemIcon>
          ) : (
            ""
          )}
          <ListItemText
            primary={player.player}
            style={{ color: PLAYER_COLORS[player.colorIndex] }}
          />
        </ListItem>
      );
    });
  };
  return <>{renderPlayers()}</>;
};
export {};
