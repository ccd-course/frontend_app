import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { COLOR } from "../styles/Colors";
import { PageStyle } from "../styles/DefaultPagesStyle";
import { Game } from "../components/Game";
import { Chat } from "../components/Chat";
import { Button, Divider, Stack, styled } from "@mui/material";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const GamePage = () => {
  const gameContainerRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isLoading, setIsLoading] = React.useState(true);
  const [chatWidth, setChatWidth] = React.useState(window.innerWidth / 2);
  const [openChatArea, toggleChatArea] = React.useState(false);

  // SEND REQUEST TO GET THE BOARD DATA
  setTimeout(() => {
    setIsLoading(false);
  }, 0);

  const handleResize = () => {
    setChatWidth(window.innerWidth / 2);
  };

  window.addEventListener("resize", handleResize);

  const customRendering = () => {
    if (isLoading) {
      return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <CircularProgress
            style={{
              height: "30%",
              width: "30%",
              color: COLOR.FONT_PRIMARY,
            }}
          />
        </div>
      );
    } else {
      return (
        <Card
          sx={{
            height: "90%",
            width: "90%",
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%,-50%)",
            backgroundColor: COLOR.BACKGROUND_SECONDARY,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: 3,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              ref={gameContainerRef}
            >
              <Game containerRef={gameContainerRef}></Game>
            </div>
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Stack
                direction="column"
                justifyContent="ceter"
                alignContent="center"
                divider={
                  <Divider
                    orientation="horizontal"
                    flexItem
                    style={{ backgroundColor: "white" }}
                  />
                }
                spacing={2}
                style={{
                  height: "100%",
                  width: "90%",
                  margin: 10,
                }}
              >
                <Item style={{ height: "10%" }}>Player's turn</Item>
                <Item style={{ height: "70%" }}>Moves</Item>
                <Item style={{ height: "10%", padding: 0 }}>
                  <Button
                    variant="contained"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    onClick={() => {
                      toggleChatArea(true);
                    }}
                  >
                    Chat
                  </Button>
                </Item>
              </Stack>
            </div>
          </div>
          <Chat
            width={chatWidth}
            isOpen={openChatArea}
            toggleOpen={toggleChatArea}
          ></Chat>
        </Card>
      );
    }
  };

  return <div style={PageStyle}>{customRendering()}</div>;
};
