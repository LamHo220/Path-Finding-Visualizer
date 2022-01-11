import RecursiveBacktrackingMaze from "./RecursiveBacktracking";
import NoWalls from "./NoWalls";
import RecursiveDivisionMaze from "./RecursiveDivision";
import SimpleRandomWalls from "./SimpleRandomWalls";
import PrimMaze from "./Prim";
import { delay, changeClassName } from "../misc/misc";

const Reverse = async (grid, maxRow, maxCol) => {
  for (let row = 0; row < maxRow; ++row) {
    for (let col = 0; col < maxCol; ++col) {
      setTimeout(() => {
        let node = grid[row][col];
        if (!(node.isStart || node.isEnd)) {
          node.isWall = !node.isWall;
          changeClassName(node);
        }
      }, 30 * (row + col));
    }
  }
  await delay(30 * (maxRow + maxCol));
};

const Boundary = async (grid, maxRow, maxCol, duration) => {
  for (let i = 0; i < maxRow; ++i) {
    setTimeout(() => {
      let node = grid[i][0];
      if (!(node.isStart || node.isEnd)) {
        node.isWall = true;
        changeClassName(node);
      }
      node = grid[i][maxCol - 1];
      if (!(node.isStart || node.isEnd)) {
        node.isWall = true;
        changeClassName(node);
      }
    }, duration * i);
  }
  for (let j = 0; j < maxCol; ++j) {
    setTimeout(() => {
      let node = grid[0][j];
      if (!(node.isStart || node.isEnd)) {
        node.isWall = true;
        changeClassName(node);
      }
      node = grid[maxRow - 1][j];
      if (!(node.isStart || node.isEnd)) {
        node.isWall = true;
        changeClassName(node);
      }
    }, duration * j);
  }
  await delay(duration * Math.max(maxRow, maxCol));
};

export default {
  RecursiveBacktrackingMaze: async (...args) => {
    await Reverse(...args);
    RecursiveBacktrackingMaze(...args);
  },
  RecursiveDivisionMaze: async (...args) => {
    await NoWalls(...args);
    Boundary(...args);
    RecursiveDivisionMaze(...args);
  },
  PrimMaze: async (...args) => {
    await NoWalls(...args);
    await Reverse(...args);
    PrimMaze(...args);
  },
  SimpleRandomWalls: async (...args) => {
    await NoWalls(...args);
    SimpleRandomWalls(...args);
  },
  NoWalls: NoWalls,
};
