import { Button } from "@mui/material";
import React from "react";
import { NewGameDialog } from "../components/Dialogs/NewGame/NewGame";
import { StartGameButton } from "../styles/ButtonStyles";
import { PageStyle } from "../styles/DefaultPagesStyle";

/**
 * Landing Page
 */
export const LandingPage = ({ auth, setAuth }: any) => {
  const [open, setOpen] = React.useState(false);
  console.log(open);

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
      <NewGameDialog
        open={open}
        auth={auth}
        setAuth={setAuth}
        setOpen={setOpen}
      ></NewGameDialog>
    </div>
  );
};
