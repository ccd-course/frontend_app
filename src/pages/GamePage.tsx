import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import { COLOR } from "../styles/Colors";
import { PageStyle } from "../styles/DefaultPagesStyle";
import { Game } from "../components/Game";
import { Button, Divider, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Item } from "../components/Item";
import { BoardTable, GAME_TYPE } from "../types";
import { ExitGame } from "../components/Dialogs/ExitGameDialog";
import { getInitialBoard } from "../events/db";
import { EventDialog } from "../components/Dialogs/EventDialog";
import { Chat } from "../components/Chat";
import { ActivePlayers } from "../components/Dashboard/ActivePlayers";

export const GamePage = ({ email }: { email: string | null }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [chatWidth, setChatWidth] = useState(window.innerWidth / 2);
  const [chatArea, toggleChatArea] = useState(false);
  const [boardTable, setBoardTable] = useState<BoardTable>([]);
  const [gameID, setGameID] = useState<string>("");
  const [_canvas, setCanvas] = useState(false);
  const [open, setOpen] = useState(false);
  const [conatinerRef, setMyRef] = useState<any>(null);
  const [chatAvailable, setChatAvailable] = useState<boolean>(false);
  const [gameType, setGameType] = useState<GAME_TYPE>(GAME_TYPE.UNDEFINED);

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
    getInitialBoard(gameID).then((data) => {
      setBoardTable(data[0]);
      setChatAvailable(data[1] !== "ONLINE");
      setGameType(data[1]);
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
              height: "20%",
              width: "20%",
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
                  containerRef={conatinerRef}
                  email={email}
                  gameType={gameType}
                />
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
                <Item style={{ height: "10%", padding: 0 }}>
                  <Button
                    variant="contained"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Exit the game
                  </Button>
                </Item>
                <Item style={{ height: "20%", backgroundColor: "blue" }}>
                  Players
                  <ActivePlayers></ActivePlayers>
                </Item>
                <Item style={{ height: "60%" }}>Moves</Item>
                <Item style={{ height: "10%", padding: 0 }}>
                  <Button
                    variant="contained"
                    disabled={chatAvailable}
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
          {gameID && chatArea ? (
            <Chat
              width={chatWidth}
              isOpen={chatArea}
              toggleOpen={toggleChatArea}
              gameID={gameID}
              email={email}
            />
          ) : (
            ""
          )}
          <EventDialog></EventDialog>
        </Card>
      );
    }
  };

  return (
    <div style={PageStyle}>
      {customRendering()}
      <ExitGame open={open} setOpen={setOpen} gameID={gameID}></ExitGame>
    </div>
  );
};
