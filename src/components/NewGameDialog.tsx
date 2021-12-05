import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { PrimaryButtonStyle } from "../styles/ButtonStyles";
import { NewGameDialogProps } from "../types";
import { COLOR } from "../styles/Colors";
import { Button } from "@mui/material";

export const NewGameDialog = ({ open, setOpen }: NewGameDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        style: {
          backgroundColor: COLOR.BACKGROUND_SECONDARY,
          padding: "22px",
          height: "60%",
        },
      }}
    >
      <DialogTitle style={{ color: COLOR.FONT_SECONDARY }}>
        Start a new game
      </DialogTitle>

      <DialogActions>
        <Button
          variant="contained"
          style={PrimaryButtonStyle}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{
            ...PrimaryButtonStyle,
          }}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
};
