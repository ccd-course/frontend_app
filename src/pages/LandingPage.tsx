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
          top: "40%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "50%",
          height: "40%",
          textAlign: "center",
        }}
      >
        <h1 style={{ display: "inline", fontSize: 80, color: "#fff" }}>
          Circular
        </h1>
        <img
          src={"/favicon.png"}
          style={{
            display: "inline",
            height: 95,
            marginRight: "20px",
            marginLeft: "20px",
          }}
        />
        <h1 style={{ display: "inline", fontSize: 80, color: "#fff" }}>
          Chess
        </h1>
      </div>
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
