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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewGame, GameType } from "../../../requests/Game";
import { PrimaryButtonStyle } from "../../../styles/ButtonStyles";
import { COLOR } from "../../../styles/Colors";

export const LocalGame = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const navigate = useNavigate();

  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [playersName, setPlayersName] = useState<string[]>([]);
  const [canStart, setCanStart] = useState(false);

  const initNewGame = async () => {
    try {
      const newGameId = await createNewGame(
        GameType.LOCAL,
        numberOfPlayers,
        playersName.map((player) => {
          return { playerName: player };
        })
      ).then((res) => res.data);
      navigate(`/Game/${newGameId}`);
    } catch (e) {
      console.log("ERROR WHILE CREATING A NEW GAME");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderRequiredInput = () => {
    const inputs = [];
    for (let i = 0; i < numberOfPlayers; i++) {
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
                playersName.length < numberOfPlayers ||
                !player ||
                player === ""
              ) {
                allGiven = false;
              } else {
                allGiven = true;
              }
            });
            setCanStart(!allGiven);
          }}
        />
      );
    }
    return inputs;
  };

  const handleNumberOfPlayerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfPlayers(Number((event.target as HTMLInputElement).value));
  };

  return (
    <>
      <DialogContent
        style={{
          marginLeft: "22px",
          color: COLOR.FONT_SECONDARY,
        }}
      >
        <div style={{ marginTop: "40px" }}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ color: COLOR.FONT_SECONDARY }}
            >
              Number of Players
            </FormLabel>
            <RadioGroup row onChange={handleNumberOfPlayerChange}>
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
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%" }}>{renderRequiredInput()}</div>
            </div>
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
        <Button
          variant="contained"
          style={{
            ...PrimaryButtonStyle,
            backgroundColor: canStart ? "#333" : PrimaryButtonStyle.background,
          }}
          onClick={initNewGame}
          disabled={canStart}
        >
          Start
        </Button>
      </DialogActions>
    </>
  );
};
