import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const Header = (props: any) => {
  return (
    <div>
      <AppBar position="static" style={{}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div style={{ display: "inline" }}>JChess</div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
