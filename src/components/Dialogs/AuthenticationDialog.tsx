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
import { auth, firebaseConfigApp } from "../../configs/firebase.config";
import GoogleIcon from "@mui/icons-material/Google";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { IAuthDialog, setAuthDialogFunc } from "../../types";

export enum AUTH_DIALOG_TYPES {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
  UNDEFINED = "UNDEFINED",
}

export const AuthenticationDialog = ({
  authDialog,
  setAuthDialog,
  setEmail,
}: {
  authDialog: IAuthDialog;
  setAuthDialog: setAuthDialogFunc;
  setEmail: (email: string | null) => void;
}) => {
  const [email, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  return (
    <Dialog
      open={authDialog.open}
      PaperProps={{
        style: {
          backgroundColor: COLOR.BACKGROUND_SECONDARY,
          width: "80%",
          height: "50%",
        },
      }}
    >
      <DialogTitle style={{ color: COLOR.FONT_SECONDARY }}>
        {authDialog.type}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ color: "#fff", textAlign: "center" }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
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
                setInputEmail(e.target.value);
                setError("");
              }}
              InputLabelProps={{
                style: {
                  color: COLOR.FONT_SECONDARY,
                  paddingLeft: 10,
                },
              }}
              InputProps={{
                autoComplete: "off",

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
          </form>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextField
              id="password"
              label="Password"
              type={"password"}
              autoComplete={"new-password"}
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
                autoComplete: "new-password",
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
          </form>
          <div>
            <Button
              className="button"
              onClick={async () => {
                const res: any = await signInWithGoogle();
                localStorage.setItem(
                  "jwt_token",
                  res._tokenResponse.refreshToken
                );
                localStorage.setItem("email", res.user.email);
                setEmail(res.user.email);
                setAuthDialog({
                  open: false,
                  type: AUTH_DIALOG_TYPES.UNDEFINED,
                });
              }}
            >
              <GoogleIcon />
              <span style={{ marginLeft: "10px" }}>Log in with Google</span>
            </Button>
          </div>

          <div style={{ marginTop: 30, color: "red" }}>{error}</div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={PrimaryButtonStyle}
          onClick={() => {
            setAuthDialog({ open: false, type: AUTH_DIALOG_TYPES.LOGIN });
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          style={PrimaryButtonStyle}
          onClick={() => {
            const authentication = getAuth(firebaseConfigApp);
            if (authDialog.type === AUTH_DIALOG_TYPES.SIGNUP) {
              createUserWithEmailAndPassword(authentication, email, password)
                .then((res: any) => {
                  localStorage.setItem(
                    "jwt_token",
                    res._tokenResponse.refreshToken
                  );
                  localStorage.setItem("email", email);
                  setEmail(email);
                  setAuthDialog({
                    open: false,
                    type: AUTH_DIALOG_TYPES.UNDEFINED,
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
                  localStorage.setItem(
                    "jwt_token",
                    res._tokenResponse.refreshToken
                  );
                  localStorage.setItem("email", res.user.email);
                  setEmail(email);
                  setAuthDialog({
                    open: false,
                    type: AUTH_DIALOG_TYPES.UNDEFINED,
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
          {authDialog.type}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
