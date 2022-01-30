import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { COLOR } from "../../styles/Colors";
import {
  DialogActions,
  DialogContent,
  LinearProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { EventDialogMessage, IDialogMessage } from "../../events/EventDialog";
import List from "@mui/material/List";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PrimaryButtonStyle } from "../../styles/ButtonStyles";
import { useNavigate } from "react-router-dom";

export const EventDialog = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<IDialogMessage | null>(null);

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

  const renderPlayers = () => {
    return (
      <>
        {message?.players.map((player) => {
          return (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <StarIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={player} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </>
    );
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
      <DialogContent
        style={{
          color: COLOR.FONT_SECONDARY,
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <div>
          <h1>Game ID : {message?.gameID}</h1>
        </div>
        <div>
          <h4>Status: {message?.status}</h4>
        </div>
        <div
          style={{
            color: "#fff",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "#333" }}
            aria-label="contacts"
          >
            {renderPlayers()}
          </List>
        </div>
        <Box sx={{ width: "100%", marginTop: "50px" }}>
          <LinearProgress />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{
            ...PrimaryButtonStyle,
            backgroundColor: PrimaryButtonStyle.background,
          }}
          onClick={() => {
            navigate(`/`);
          }}
        >
          Exit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
