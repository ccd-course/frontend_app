import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {PrimaryButtonStyle} from "../styles/ButtonStyles";
import {COLOR} from "../styles/Colors";
import {AUTH_DIALOG_TYPES} from "./Dialogs/AuthenticationDialog";

export const Header = ({email, setAuthDialog, setEmail}: {
    email: string | null, setAuthDialog: (input: { open: boolean, type: AUTH_DIALOG_TYPES }) => void, setEmail: (email: string | null) => void
}) => {
    return (
        <div>
            <AppBar
                position="static"
                style={{
                    backgroundColor: COLOR.BACKGROUND_SECONDARY,
                    color: COLOR.FONT_SECONDARY,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <div style={{display: "inline"}}>JChess</div>
                    </Typography>
                    <Stack spacing={2} direction="row">
                        {email ? (
                            <div>
                                {email}
                                <Button
                                    variant="contained"
                                    style={{...PrimaryButtonStyle, marginLeft: 10}}
                                    onClick={() => {
                                        localStorage.clear();
                                        setEmail(null)
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Stack spacing={2} direction="row">
                                <Button
                                    variant="contained"
                                    style={PrimaryButtonStyle}
                                    onClick={() => {
                                        setAuthDialog({open: true, type: AUTH_DIALOG_TYPES.SIGNUP})
                                    }}
                                >
                                    Signup
                                </Button>
                                <Button
                                    variant="contained"
                                    style={PrimaryButtonStyle}
                                    onClick={() => {
                                        setAuthDialog({open: true, type: AUTH_DIALOG_TYPES.LOGIN})
                                    }}
                                >
                                    Login
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
};
