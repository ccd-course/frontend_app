import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { PrimaryButtonStyle } from "../../styles/ButtonStyles";
import { COLOR } from "../../styles/Colors";
import { useNavigate } from "react-router-dom";
import { closeGame } from "../../requests/Game";
import { DialogContentText } from "@mui/material";

export const AuthenticationDialog = ({ open, setOpen, type }: any) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          backgroundColor: COLOR.BACKGROUND_SECONDARY,
          width: "40%",
          height: "40%",
        },
      }}
    >
      <DialogTitle style={{ color: COLOR.FONT_SECONDARY }}>{type}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ color: "#fff" }}
        >
          Are you sure you want to leave the game?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={PrimaryButtonStyle}
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
