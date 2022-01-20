import {
  Radio,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { COLOR } from "../../../styles/Colors";

export const OnlineGame = () => {
  return (
    <>
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
          </FormControl>
        </div>
      </DialogContent>
    </>
  );
};
