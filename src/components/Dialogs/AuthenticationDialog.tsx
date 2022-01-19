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
import { firebaseConfigApp } from "../../configs/firebase.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const AuthenticationDialog = ({ open, setOpen, type, setAuth }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
              setError("");
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
              setError("");
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
          <div style={{ marginTop: 30, color: "red" }}>{error}</div>
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
            const authentication = getAuth(firebaseConfigApp);
            if (type === "Signup") {
              createUserWithEmailAndPassword(authentication, email, password)
                .then((res: any) => {
                  sessionStorage.setItem(
                    "Auth Token",
                    res._tokenResponse.refreshToken
                  );
                  setOpen({
                    open: false,
                    type: "",
                    email: res._tokenResponse.email,
                  });
                })
                .catch((e) => {
                  if (
                    e.message === "Firebase: Error (auth/email-already-in-use)."
                  ) {
                    setError("Email is already used.");
                  } else {
                    setError("Try again later.");
                  }
                });
            } else {
              signInWithEmailAndPassword(authentication, email, password)
                .then((res: any) => {
                  sessionStorage.setItem(
                    "Auth Token",
                    res._tokenResponse.refreshToken
                  );
                  setOpen({
                    open: false,
                    type: "",
                    email: res._tokenResponse.email,
                  });
                })
                .catch((e) => {
                  if (e.message === "Firebase: Error (auth/user-not-found).") {
                    setError("Email dose not user.");
                  } else {
                    setError("Incorrect password");
                  }
                });
            }
          }}
        >
          {type}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
