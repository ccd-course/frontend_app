import {Button} from "@mui/material";
import React from "react";
import {NewGameDialog} from "../components/Dialogs/NewGame/NewGame";
import {StartGameButton} from "../styles/ButtonStyles";
import {PageStyle} from "../styles/DefaultPagesStyle";
import {setAuthDialogFunc} from "../types";

/**
 * Landing Page
 */
export const LandingPage = ({
  email,
  setAuthDialog,
}: {
  email: string | null;
  setAuthDialog: setAuthDialogFunc;
}) => {
  const [openNewGame, setOpenNewGame] = React.useState(false);

  const handleClickOpen = () => {
    setOpenNewGame(true);
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
      <NewGameDialog
        email={email}
        setAuthDialog={setAuthDialog}
        open={openNewGame}
        setOpen={setOpenNewGame}
      />
    </div>
  );
};
