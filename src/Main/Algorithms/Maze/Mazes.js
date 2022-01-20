import { delay, changeClassName } from "../../utilities/utilities";
import NoWalls from "./NoWalls";
import SimpleRandomWalls from "./SimpleRandomWalls";
import PrimMaze from "./Prim";
import Kruskal from "./Kruskal";
import RecursiveDivisionMaze from "./RecursiveDivision";
import RecursiveBacktrackingMaze from "./RecursiveBacktracking";

const Reverse = async (input) => {
  const {dark, grid, maxRow, maxCol, timeRatio} = input
  for (let row = 0; row < maxRow; ++row) {
    for (let col = 0; col < maxCol; ++col) {
      setTimeout(() => {
        let node = grid[row][col];
        if (!(node.isStart || node.isEnd)) {
          node.isWall = !node.isWall;
          changeClassName(dark, node);
        }
      }, Math.max(timeRatio, 30) * (row + col));
    }
  }
  await delay(Math.max(timeRatio, 30) * (maxRow + maxCol));
};

const Boundary = async (input) => {
  const {dark, grid, maxRow, maxCol, timeRatio} = input
  for (let i = 0; i < maxRow; ++i) {
    setTimeout(() => {
      let node = grid[i][0];
      if (!(node.isStart || node.isEnd)) {
        node.isWall = true;
        changeClassName(dark, node);
      }
      node = grid[i][maxCol - 1];
      if (!(node.isStart || node.isEnd)) {
        node.isWall = true;
        changeClassName(dark, node);
      }
    }, timeRatio * i);
  }
  for (let j = 0; j < maxCol; ++j) {
    setTimeout(() => {
      let node = grid[0][j];
      if (!(node.isStart || node.isEnd)) {
        node.isWall = true;
        changeClassName(dark, node);
      }
      node = grid[maxRow - 1][j];
      if (!(node.isStart || node.isEnd)) {
        node.isWall = true;
        changeClassName(dark, node);
      }
    }, timeRatio * j);
  }
  await delay(timeRatio * Math.max(maxRow, maxCol));
};

export default {
  RecursiveBacktrackingMaze: async (input) => {
    await NoWalls(input);
    await Reverse(input);
    await RecursiveBacktrackingMaze(input);
  },
  RecursiveDivisionMaze: async (input) => {
    await NoWalls(input);
    await Boundary(input);
    await RecursiveDivisionMaze(input);
  },
  PrimMaze: async (input) => {
    await NoWalls(input);
    await Reverse(input);
    await PrimMaze(input);
  },
  SimpleRandomWalls: async (input) => {
    await NoWalls(input);
    SimpleRandomWalls(input);
  },
  Kruskal: async (input) => {
    await NoWalls(input);
    await Boundary(input);
    await Kruskal(input);
  },
  NoWalls: NoWalls,
};
