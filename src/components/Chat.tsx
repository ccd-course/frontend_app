import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button, TextField } from "@mui/material";
import { COLOR } from "../styles/Colors";
import { PrimaryButtonStyle } from "../styles/ButtonStyles";
import { doc, onSnapshot, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../events/db";

interface ChatProps {
  width: number;
  isOpen: boolean;
  gameID: string;
  email: string;
  toggleOpen: (open: boolean) => void;
}

export const Chat = (props: ChatProps) => {
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    onSnapshot(doc(db, "games", props.gameID), (changes: any) => {
      const newData = changes.data();
      console.log(newData);
      setMessages(newData.messages);
    });
  }, []);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      props.toggleOpen(open);
    };
  const list = () => (
    <Box
      sx={{ width: props.width, height: "90%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Close"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {messages.map((text: any, index) => (
          <ListItem>
            <ListItemText primary={text ? text.email : ""} />
            <ListItemText primary={text ? text.message : ""} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <SwipeableDrawer
          anchor={"right"}
          open={props.isOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
          <div style={{ width: props.width, backgroundColor: "red" }}>
            <TextField
              label={"message"}
              style={{
                margin: "10px",
                backgroundColor: "#444",
                display: "inline",
                color: COLOR.FONT_SECONDARY,
                width: 400,
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
                setMessage(event.target.value);
              }}
            />
            <Button
              variant="contained"
              style={{ ...PrimaryButtonStyle, height: 50 }}
              onClick={() => {
                const newMessages = [
                  ...messages,
                  { email: props.email, message: message },
                ];
                updateDoc(doc(db, "games", props.gameID), {
                  messages: newMessages,
                });
              }}
            >
              Send
            </Button>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
