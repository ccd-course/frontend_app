import { Square } from "../components/GameComponents/Square";
import { BoardTable } from "../types";

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max + 1);
};
export const generateRandomMovment = (cols: number, rows: number) => {
  const numberOfMovments = getRandomInt(10);
  const possibleMovments = [];
  for (let i = 0; i < numberOfMovments; i++) {
    const x = getRandomInt(rows);
    const y = getRandomInt(cols);
    possibleMovments.push({ x, y });
  }
  return possibleMovments;
};
