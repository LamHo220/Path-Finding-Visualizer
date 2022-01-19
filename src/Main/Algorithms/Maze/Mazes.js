import { delay, changeClassName } from "../../utilities/utilities";
import NoWalls from "./NoWalls";
import SimpleRandomWalls from "./SimpleRandomWalls";
import PrimMaze from "./Prim";
import Kruskal from "./Kruskal";
import RecursiveDivisionMaze from "./RecursiveDivision";
import RecursiveBacktrackingMaze from "./RecursiveBacktracking";

const Reverse = async (dark, grid, maxRow, maxCol, duration) => {
  for (let row = 0; row < maxRow; ++row) {
    for (let col = 0; col < maxCol; ++col) {
      setTimeout(() => {
        let node = grid[row][col];
        if (!(node.isStart || node.isEnd)) {
          node.isWall = !node.isWall;
          changeClassName(dark, node);
        }
      }, Math.max(duration, 30) * (row + col));
    }
  }
  await delay(Math.max(duration, 30) * (maxRow + maxCol));
};

const Boundary = async (dark, grid, maxRow, maxCol, duration) => {
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
    }, duration * i);
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
    }, duration * j);
  }
  await delay(duration * Math.max(maxRow, maxCol));
};

export default {
  RecursiveBacktrackingMaze: async (...args) => {
    await NoWalls(...args);
    await Reverse(...args);
    await RecursiveBacktrackingMaze(...args);
  },
  RecursiveDivisionMaze: async (...args) => {
    await NoWalls(...args);
    await Boundary(...args);
    await RecursiveDivisionMaze(...args);
  },
  PrimMaze: async (...args) => {
    await NoWalls(...args);
    await Reverse(...args);
    await PrimMaze(...args);
  },
  SimpleRandomWalls: async (...args) => {
    await NoWalls(...args);
    SimpleRandomWalls(...args);
  },
  Kruskal: async (...args) => {
    await NoWalls(...args);
    await Boundary(...args);
    await Kruskal(...args);
  },
  NoWalls: NoWalls,
};
