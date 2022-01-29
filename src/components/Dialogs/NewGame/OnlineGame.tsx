import {
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewGame, GameType } from "../../../requests/Game";
import { PrimaryButtonStyle } from "../../../styles/ButtonStyles";
import { COLOR } from "../../../styles/Colors";
import { setAuthDialogFunc } from "../../../types";
import { AUTH_DIALOG_TYPES } from "../AuthenticationDialog";

export const OnlineGame = ({
  setOpen,
  email,
  setAuthDialog,
  setTabValue,
}: {
  setOpen: (open: boolean) => void;
  email: string | null;
  setAuthDialog: setAuthDialogFunc;
  setTabValue: (tab: number) => void;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      setTabValue(0);
      setOpen(false);
      setAuthDialog({ open: true, type: AUTH_DIALOG_TYPES.LOGIN });
    }
  }, []);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const handleNumberOfPlayerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfPlayers(Number((event.target as HTMLInputElement).value));
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateNewGame = async () => {
    try {
      if (email) {
        const newGameId = await createNewGame(
          GameType.ONLINE,
          numberOfPlayers,
          [{ playerName: email }]
        ).then((res) => res.data);

        navigate(`/Game/${newGameId}`);
      }
    } catch (e) {
      console.log("ERROR WHILE CREATING A NEW GAME");
    }
  };
  return (
    <>
      <DialogContent
        style={{ marginLeft: "22px", color: COLOR.FONT_SECONDARY }}
      >
        <div>Email: {email}</div>
        <div style={{ marginTop: "40px" }}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ color: COLOR.FONT_SECONDARY }}
            >
              Create a new Game
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              onChange={handleNumberOfPlayerChange}
            >
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
            <Button
              variant="contained"
              style={PrimaryButtonStyle}
              onClick={handleCreateNewGame}
            >
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
      <DialogActions>
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
