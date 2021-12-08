import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { PrimaryButtonStyle } from "../../styles/ButtonStyles";
import { COLOR } from "../../styles/Colors";
import { useNavigate } from "react-router-dom";
import { createNewGame } from "../../Dummy/mockServer";

interface NewGameDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const NewGameDialog = ({ open, setOpen }: NewGameDialogProps) => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);
  const [numberOfPlayer, setNumberOfPlayer] = useState(0);
  const [playersName, setPlayersName] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(true);

  // SEND THE REQUEST TO INIT THE GAME
  // REDIRECT THE USER TO THE GAME_ID
  const initNewGame = () => {
    // SEND REQUEST AND INIT THE GAME
    const newGameId = createNewGame(playersName);
    navigate(`/Game/${newGameId}`);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNumberOfPlayerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfPlayer(Number((event.target as HTMLInputElement).value));
  };

  const renderTabContent = () => {
    if (value === 0) {
      return (
        <DialogContent
          style={{ marginLeft: "22px", color: COLOR.FONT_SECONDARY }}
        >
          <div>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="disabled tabs example"
              TabIndicatorProps={{
                style: { backgroundColor: COLOR.FONT_SECONDARY },
              }}
            >
              <Tab
                label="Play locally"
                style={{ color: COLOR.FONT_SECONDARY }}
              />
              <Tab label="Play online" disabled style={{ color: "#555" }} />
            </Tabs>
          </div>

          <div style={{ marginTop: "40px" }}>
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                style={{ color: COLOR.FONT_SECONDARY }}
              >
                Number of Players
              </FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="num-player-radio"
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
              </RadioGroup>
              <div style={{ width: "100%" }}>{renderRequiredInput()}</div>
            </FormControl>
          </div>
        </DialogContent>
      );
    }
  };

  const renderRequiredInput = () => {
    const inputs = [];
    for (let i = 0; i < numberOfPlayer; i++) {
      const playerNameLabel = `Player ${i + 1}`;
      inputs.push(
        <TextField
          key={i}
          required
          id="outlined-required"
          label={playerNameLabel}
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
          onChange={(event) => {
            playersName[i] = event.target.value;
            setPlayersName(playersName);
            let allGiven = false;
            playersName.forEach((player) => {
              if (
                playersName.length < numberOfPlayer ||
                !player ||
                player === ""
              ) {
                allGiven = false;
              } else {
                allGiven = true;
              }
            });
            setDisabled(!allGiven);
          }}
        />
      );
    }
    return inputs;
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
      {renderTabContent()}

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
            backgroundColor: disabled ? "#333" : PrimaryButtonStyle.background,
          }}
          onClick={initNewGame}
          disabled={disabled}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
};
