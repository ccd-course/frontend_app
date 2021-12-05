import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { COLOR } from "../styles/Colors";

export const Header = (props: any) => {
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div style={{ display: "inline" }}>JChess</div>
          </Typography>
          <Stack spacing={2} direction="row">
            <Button variant="contained">Signup</Button>
            <Button variant="contained">Login</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};
