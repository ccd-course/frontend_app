import React, { useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import { COLOR } from "../styles/Colors";
import { PageStyle } from "../styles/DefaultPagesStyle";
import { Game } from "../components/Game";
import { Chat } from "../components/Chat";
import { Button, Divider, Stack, styled } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { getChessboard } from "../Dummy/mockServer";
import { BoardTable } from "../types";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const GamePage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [chatWidth, setChatWidth] = React.useState(window.innerWidth / 2);
  const [chatArea, toggleChatArea] = React.useState(false);
  const [players, setPlayers] = React.useState([]);
  const [boardTable, setBoardTable] = React.useState<BoardTable>([]);

  const gameContainerRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const location = useLocation();

  // SEND REQUEST TO GET THE BOARD DATA
  useEffect(() => {
    const gameID = location.pathname.split("/")[2];
    const gameData = getChessboard(Number(gameID));
    setPlayers(gameData.players);
    setBoardTable(gameData.boardTable);
    setIsLoading(false);
  }, []);

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
              <Game
                boardTable={boardTable}
                containerRef={gameContainerRef}
              ></Game>
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
                    disabled
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
            isOpen={chatArea}
            toggleOpen={toggleChatArea}
          ></Chat>
        </Card>
      );
    }
  };

  return <div style={PageStyle}>{customRendering()}</div>;
};
