import { Button } from "@mui/material";
import React from "react";
import { NewGameDialog } from "../components/NewGameDialog";
import { StartGameButton } from "../styles/ButtonStyles";
import { PageStyle } from "../styles/DefaultPagesStyle";

export const LandingPage = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div style={PageStyle}>
      <div
        style={{
          position: "absolute",
          top: "80%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "20%",
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          style={StartGameButton}
        >
          New Game
        </Button>
      </div>
      <NewGameDialog open={open} setOpen={setOpen}></NewGameDialog>
    </div>
  );
};
