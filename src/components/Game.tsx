import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { CircleBoard } from "./GameComponents/CircleBoard";
import { MouseEvents } from "./GameComponents/MouseEvents";
import { BoardTable, GAME_TYPE } from "../types";

interface GameProps {
  boardTable: BoardTable;
  gameID: string;
  containerRef: any;
  email: string | null;
  gameType: GAME_TYPE;
}

export const Game = (props: GameProps) => {
  let canvas: p5Types.Element;

  const getCanvasSize = () => {
    const width = props.containerRef.current.clientWidth;
    const height = props.containerRef.current.clientHeight;

    if (width >= height) {
      return { width: height, height: height };
    } else {
      return { width: width, height: width };
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(255);
    p5.angleMode(p5.DEGREES);
    p5.background(p5.color(57, 62, 70));
    p5.translate(p5.width / 2, p5.height / 2);
    new CircleBoard(
      p5,
      props.boardTable,
      props.gameID,
      props.email,
      props.gameType
    )
      .init()
      .drawBoard();
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const { width, height } = getCanvasSize();
    canvas = p5.createCanvas(width, height).parent(canvasParentRef);
    new MouseEvents(canvas, width, height).listen();
    draw(p5);
  };

  const onWindowResize = (p5: p5Types) => {
    const { width, height } = getCanvasSize();
    p5.resizeCanvas(width, height);
    draw(p5);
  };

  return <Sketch setup={setup} windowResized={onWindowResize} />;
};
