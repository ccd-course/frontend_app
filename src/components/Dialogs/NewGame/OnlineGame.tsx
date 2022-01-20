import {
  Radio,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Button,
  DialogActions,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { PrimaryButtonStyle } from "../../../styles/ButtonStyles";
import { COLOR } from "../../../styles/Colors";

export const OnlineGame = ({ auth, setAuth, setOpen, setValue }: any) => {
  useEffect(() => {
    if (!auth.email) {
      setValue(0);
      setOpen(false);
      setAuth({ open: true, type: "Login", email: null });
    }
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <DialogContent
        style={{ marginLeft: "22px", color: COLOR.FONT_SECONDARY }}
      >
        <div>Email: {auth.email}</div>
        <div style={{ marginTop: "40px" }}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ color: COLOR.FONT_SECONDARY }}
            >
              Create a new Game
            </FormLabel>
            <RadioGroup row aria-label="gender">
              <FormControlLabel
                value="2"
                control={<Radio style={{ color: COLOR.FONT_SECONDARY }} />}
                label="2 Players"
              />
              <FormControlLabel
                value="3"
                control={<Radio style={{ color: COLOR.FONT_SECONDARY }} />}
                label="3 Players"
              />
              <FormControlLabel
                value="4"
                control={<Radio style={{ color: COLOR.FONT_SECONDARY }} />}
                label="4 Players"
              />
            </RadioGroup>
            <Button variant="contained" style={PrimaryButtonStyle}>
              Create a network game
            </Button>
            <FormLabel
              component="legend"
              style={{ color: COLOR.FONT_SECONDARY, marginTop: 10 }}
            >
              Or join a game
            </FormLabel>
            <TextField
              required
              id="outlined-required"
              label="GAME ID"
              style={{
                margin: "10px",
                width: "300px",
                backgroundColor: "#444",
                color: COLOR.FONT_SECONDARY,
              }}
              InputLabelProps={{
                style: {
                  color: COLOR.FONT_SECONDARY,
                },
              }}
              InputProps={{
                style: {
                  color: COLOR.FONT_SECONDARY,
                },
                autoComplete: "off",
              }}
            />
            <Button
              variant="contained"
              style={{ ...PrimaryButtonStyle, marginTop: 10 }}
            >
              Join a network game
            </Button>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions style={{}}>
        <Button
          variant="contained"
          style={PrimaryButtonStyle}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};
