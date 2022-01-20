import React from "react";
import Dialog from "@mui/material/Dialog";
import Tab from "@mui/material/Tab";
import { COLOR } from "../../../styles/Colors";
import { useNavigate } from "react-router-dom";
import { LocalGame } from "./LocalGame";
import { OnlineGame } from "./OnlineGame";
import { DialogTitle, Tabs } from "@mui/material";
import { NewGameDialogProps } from "../../../types";

export const NewGameDialog = ({ open, setOpen }: NewGameDialogProps) => {
  const [tabValue, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderConfiguration = () => {
    if (tabValue === 0) {
      return <LocalGame setOpen={setOpen}></LocalGame>;
    } else {
      return <OnlineGame></OnlineGame>;
    }
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
      {renderConfiguration()}
    </Dialog>
  );
};
