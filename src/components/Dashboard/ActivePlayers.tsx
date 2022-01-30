import React, { useEffect, useState } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { ActivePlayersEvent, PLAYER_COLORS } from "../../events/game_data";

export const ActivePlayers = () => {
  const [players, setPlayers] =
    useState<{ player: string; turn: boolean; color: string }[]>();

  useEffect(() => {
    ActivePlayersEvent.subscribe((newData) => {
      setPlayers(newData);
    });
  }, []);
  const renderPlayers = () => {
    return players?.map((player, index) => {
      return (
        <ListItem disablePadding>
          <ListItemIcon>
            <StarIcon style={{ color: PLAYER_COLORS[index] }} />
          </ListItemIcon>
          <ListItemText
            primary={player.player}
            style={{ color: PLAYER_COLORS[index] }}
          />
        </ListItem>
      );
    });
  };
  return <>{renderPlayers()}</>;
};
export {};
