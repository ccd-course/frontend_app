import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { COLOR } from "../../styles/Colors";
import { DialogContent } from "@mui/material";
import { EventDialogMessage } from "../../events/EventDialog";

export const EventDialog = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    EventDialogMessage.subscribe((newValue) => {
      if (newValue) {
        setOpen(true);
        setMessage(newValue);
      } else {
        setOpen(false);
      }
    });
  }, []);
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
      <DialogContent
        style={{
          color: COLOR.FONT_SECONDARY,
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        {message}
      </DialogContent>
      <div></div>
    </Dialog>
  );
};
