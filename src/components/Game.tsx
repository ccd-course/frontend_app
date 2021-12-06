import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

export const Game = (containerRef: any) => {
  let canvas: p5Types.Element;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const width = 600;
    const heigth = 600;
    canvas = p5.createCanvas(width, heigth).parent(canvasParentRef);
    p5.background(255);
  };

  const draw = (p5: p5Types) => {
    p5.background(255);
  };

  const onWindowResize = (p5: p5Types) => {
    const width = containerRef.containerRef.current.clientWidth;
    const height = containerRef.containerRef.current.clientHeight;

    if (width >= height) {
      p5.resizeCanvas(height, height);
    } else {
      p5.resizeCanvas(width, width);
    }
    draw(p5);
  };

  return <Sketch setup={setup} windowResized={onWindowResize} />;
};
