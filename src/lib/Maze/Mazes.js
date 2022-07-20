import { delay, changeClassName } from "../utilities/utilities";
import NoWalls from "./NoWalls";
import SimpleRandomWalls from "./SimpleRandomWalls";
import PrimMaze from "./Prim";
import Kruskal from "./Kruskal";
import RecursiveDivisionMaze from "./RecursiveDivision";
import RecursiveBacktrackingMaze from "./RecursiveBacktracking";

/**
 * A function to reverse the grid
 * @param {Object} input The input of the function.
 * @param {Array<Array<Object>>} input.grid The grid to be used.
 * @param {Boolean} input.dark Whether currently is dark mode or not.
 * @param {Object} input.maxDimension The maximum row and column of the grid.
 * @param {Object} input.maxDimension.maxRow The maximum row of the grid.
 * @param {Object} input.maxDimension.maxCol The maximum column of the grid.
 *@param {Number} input.duration The time to be waited.
 */
const Reverse = async (input) => {
  const { dark, grid, maxDimension, duration } = input;
  const { maxRow, maxCol } = maxDimension;
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

/**
 * A function to add boundary wall to the grid.
 * @param {Object} input The input of the function.
 * @param {Array<Array<Object>>} input.grid The grid to be used.
 * @param {Boolean} input.dark Whether currently is dark mode or not.
 * @param {Object} input.maxDimension The maximum row and column of the grid.
 * @param {Object} input.maxDimension.maxRow The maximum row of the grid.
 * @param {Object} input.maxDimension.maxCol The maximum column of the grid.
 *@param {Number} input.duration The time to be waited.
 */
const Boundary = async (input) => {
  const { dark, grid, maxDimension, duration } = input;
  const { maxRow, maxCol } = maxDimension;

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

/**
 * export a object that contains the maze generating algorithm
 */
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  "Recursive Backtracking": async (input) => {
    await NoWalls(input);
    await Reverse(input);
    await RecursiveBacktrackingMaze(input);
  },
  "Recursive Division": async (input) => {
    await NoWalls(input);
    await Boundary(input);
    await RecursiveDivisionMaze(input);
  },
  "Prim's Algorithm": async (input) => {
    await NoWalls(input);
    await Reverse(input);
    await PrimMaze(input);
  },
  "Simple Random Walls": async (input) => {
    await NoWalls(input);
    SimpleRandomWalls(input);
  },
  "Kruskal's Algorithm": async (input) => {
    await NoWalls(input);
    await Boundary(input);
    await Kruskal(input);
  },
  "No Walls": NoWalls,
};
