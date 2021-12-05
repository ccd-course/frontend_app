import React from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { COLOR } from "../styles/Colors";
import { PageStyle } from "../styles/DefaultPagesStyle";

export const GamePage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  // SEND REQUEST TO GET THE BOARD DATA
  setTimeout(() => {
    setIsLoading(false);
  }, 0);

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
            }}
          >
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
              }}
            ></div>
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              NEW GAME
            </div>
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
              }}
            ></div>
          </div>
        </Card>
      );
    }
  };

  return <div style={PageStyle}>{customRendering()}</div>;
};
