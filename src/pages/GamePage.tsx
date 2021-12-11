import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import { COLOR } from "../styles/Colors";
import { PageStyle } from "../styles/DefaultPagesStyle";
import { Game } from "../components/Game";
import { Chat } from "../components/Chat";
import { Button, Divider, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Item } from "../components/Item";
import { BoardTable, ResponseChessboard } from "../types";
import { getChessboard } from "../requests/Game";
import { currentPlayer, players } from "../storage/game_data";

const extractPlayerNames = (boardTable: ResponseChessboard) => {
  const playerNames: string[] = [];

  boardTable.forEach((col) => {
    col.forEach((row) => {
      if (row && !playerNames.includes(row.playerName)) {
        playerNames.push(row.playerName);
        row.playerName = playerNames.length.toString();
      } else if (row && playerNames.includes(row.playerName)) {
        row.playerName = (playerNames.indexOf(row.playerName) + 1).toString();
      }
    });
  });
  return playerNames;
};

export const GamePage = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [chatWidth, setChatWidth] = React.useState(window.innerWidth / 2);
  const [chatArea, toggleChatArea] = React.useState(false);
  const [boardTable, setBoardTable] = React.useState<BoardTable>([]);
  const [gameID, setGameID] = React.useState<string>();
  const [_canvas, setCanvas] = React.useState(false);
  const [myRef, setMyRef] = React.useState<any>(null);

  const _ref = useRef<any>();

  useLayoutEffect(() => {
    const { current } = _ref;
    if (current) {
      setCanvas(true);
      setMyRef(_ref);
    }
  });

  useEffect(() => {
    const gameID = location.pathname.split("/")[2];
    setGameID(gameID);
    getChessboard(gameID).then((board) => {
      const _players = extractPlayerNames(board);
      players.next(_players);
      currentPlayer.next(0);
      setBoardTable(board);
      setIsLoading(false);
    });
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
              ref={_ref}
            >
              {boardTable && gameID && _ref.current ? (
                <Game
                  boardTable={boardTable}
                  gameID={gameID}
                  containerRef={myRef}
                ></Game>
              ) : (
                ""
              )}
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
            isOpen={chatArea}
            toggleOpen={toggleChatArea}
          ></Chat>
        </Card>
      );
    }
  };

  return <div style={PageStyle}>{customRendering()}</div>;
};
