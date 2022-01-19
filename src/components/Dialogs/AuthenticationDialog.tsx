import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { PrimaryButtonStyle } from "../../styles/ButtonStyles";
import { COLOR } from "../../styles/Colors";
import { DialogContentText, InputAdornment, TextField } from "@mui/material";
import Lock from "@mui/icons-material/Lock";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { configAuth } from "../../configs/authentication.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const AuthenticationDialog = ({ open, setOpen, type }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          style={{ color: "#fff", textAlign: "center" }}
        >
          <TextField
            id="email"
            label="Email"
            style={{
              margin: "10px",
              width: "400px",
              backgroundColor: "#444",
              color: COLOR.FONT_SECONDARY,
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            InputLabelProps={{
              style: {
                color: COLOR.FONT_SECONDARY,
                paddingLeft: 10,
              },
            }}
            InputProps={{
              style: {
                color: COLOR.FONT_SECONDARY,
                paddingLeft: 10,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle style={{ color: "#fff" }} />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            id="password"
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{
              margin: "10px",
              width: "400px",
              backgroundColor: "#444",
              color: COLOR.FONT_SECONDARY,
            }}
            InputLabelProps={{
              style: {
                color: COLOR.FONT_SECONDARY,
                paddingLeft: 10,
              },
            }}
            InputProps={{
              style: {
                color: COLOR.FONT_SECONDARY,
                paddingLeft: 10,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ color: "#fff" }} />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
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
        <Button
          variant="contained"
          style={PrimaryButtonStyle}
          onClick={() => {
            const authentication = getAuth(configAuth);
            if (type === "Signup") {
              createUserWithEmailAndPassword(
                authentication,
                email,
                password
              ).then((res) => {
                console.log(res);
              });
            } else {
              signInWithEmailAndPassword(authentication, email, password).then(
                (res) => {
                  console.log(res);
                }
              );
            }
          }}
        >
          {type}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
