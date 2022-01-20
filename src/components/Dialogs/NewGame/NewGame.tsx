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
import { PrimaryButtonStyle } from "../../../styles/ButtonStyles";
import { COLOR } from "../../../styles/Colors";
import { useNavigate } from "react-router-dom";
import { createNewGameRequest } from "../../../requests/Game";
import { NewGameDialogProps } from "../../../types";

export const NewGameDialog = ({ open, setOpen }: NewGameDialogProps) => {
  const navigate = useNavigate();
  const [tabValue, setValue] = React.useState(0);
  const [numberOfPlayer, setNumberOfPlayer] = useState(0);
  const [playersName, setPlayersName] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(true);

  const initNewGame = async () => {
    try {
      const newGameId = await createNewGameRequest(playersName);
      navigate(`/Game/${newGameId}`);
    } catch (e) {
      console.log("ERROR WHILE CREATING A NEW GAME");
    }
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
    if (tabValue === 0) {
      return (
        <DialogContent
          style={{ marginLeft: "22px", color: COLOR.FONT_SECONDARY }}
        >
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
                <FormControlLabel
                  value="4"
                  control={<Radio style={{ color: COLOR.FONT_SECONDARY }} />}
                  label="4 Players"
                />
              </RadioGroup>
              <div style={{ width: "100%" }}>{renderRequiredInput(false)}</div>
            </FormControl>
          </div>
        </DialogContent>
      );
    } else {
      return (
        <DialogContent
          style={{ marginLeft: "22px", color: COLOR.FONT_SECONDARY }}
        >
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
                <FormControlLabel
                  value="4"
                  control={<Radio style={{ color: COLOR.FONT_SECONDARY }} />}
                  label="4 Players"
                />
              </RadioGroup>
              <div style={{ width: "100%" }}>{renderRequiredInput(true)}</div>
            </FormControl>
          </div>
        </DialogContent>
      );
    }
  };

  const renderRequiredInput = (networkGame: boolean) => {
    const isDisabled = (i: number) => {
      if (networkGame && i !== 0) return true;
      return false;
    };
    const inputs = [];
    for (let i = 0; i < numberOfPlayer; i++) {
      const playerNameLabel = `Player ${i + 1}`;
      inputs.push(
        <TextField
          key={i}
          required
          id="outlined-required"
          label={playerNameLabel}
          disabled={isDisabled(i)}
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
      <div>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { backgroundColor: COLOR.FONT_SECONDARY },
          }}
        >
          <Tab label="Play locally" style={{ color: COLOR.FONT_SECONDARY }} />
          <Tab label="Play online" style={{ color: COLOR.FONT_SECONDARY }} />
        </Tabs>
      </div>
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
