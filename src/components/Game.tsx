import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

export const Game = () => {
  let canvas: p5Types.Element;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const width = 600;
    const heigth = 600;
    canvas = p5.createCanvas(width, heigth).parent(canvasParentRef);
    p5.background(255);
  };

  const onWindowResize = () => {
    console.log("WINDOW RESIZE");
  };

  return <Sketch setup={setup} windowResized={onWindowResize} />;
};
