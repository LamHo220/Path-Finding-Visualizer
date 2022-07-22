import { rand, changeClassName, delay } from "../utilities/utilities";
import { rowDir, colDir, pause } from "../Constants/Constants";

/**
 * The time to be waited.
 */
var deltaTime;

/**
 * A maze generating algorithm by recursive backtracking.
 * @param {Object} input The input of this function.
 * @param {Array<Array<Object>>} input.grid The grid to be used.
 * @param {Object} input.startNode The start node.
 * @param {Object} input.endNode The end node.
 * @param {Object} input.maxDimension The maximum row and column of the grid.
 * @param {Object} input.maxDimension.maxRow The maximum row of the grid.
 * @param {Object} input.maxDimension.maxCol The maximum column of the grid.
 * @param {Number} input.duration The thime to be waited.
 * @param {Boolean} input.dark Whether currently is dark mode or not.
 */
const RecursiveBacktrackingMaze = async (input) => {
  const { dark, grid, maxDimension, duration, startNode, endNode } = input;
  const { maxRow, maxCol } = maxDimension;

  // set the start and end node to wall node .
  startNode.isWall = true;
  endNode.isWall = true;
  deltaTime = duration;
  
  // get a random node from the grid.
  const randCol = Math.floor(rand(0, maxCol - 1) / 2) * 2 + 1;
  const randRow = Math.floor(rand(0, maxRow - 1) / 2) * 2 + 1;
  let node = grid[randRow][randCol];
  node.isWall = false;
  changeClassName(dark, node);

  // start the backtracking
  await doRecursiveBacktracker(dark, grid, node, maxRow, maxCol);

  // set the start and end node to non wall node back.
  startNode.isWall = false;
  endNode.isWall = false;
};

/**
 * A function to get the allowed direction of the node.
 * @param {Array<Array<Object>>} grid The grid that the node belongs to.
 * @param {Number} row The node's row.
 * @param {Number} col The node's column.
 * @returns 
 */
const getDirection = (grid, row, col) => {
  let res = [];
  if (row > 2 && grid[row - 2][col].isWall) {
    res.push("N");
  }
  if (row + 2 < grid.length && grid[row + 2][col].isWall) {
    res.push("S");
  }
  if (col > 2 && grid[row][col - 2].isWall) {
    res.push("W");
  }
  if (col + 2 < grid[0].length && grid[row][col + 2].isWall) {
    res.push("E");
  }
  return res;
};

/**
 * 
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {Array<Array<Object>>} grid The grid to be used.
 * @param {Object} node The current node.
 * @param {Number} maxRow The maximum row of the grid.
 * @param {Number} maxCol The maximum column of the grid.
 */
const doRecursiveBacktracker = async (dark, grid, node, maxRow, maxCol) => {
  while (pause.getFlag()) {
    await delay(10);
  }
  const row = node.row;
  const col = node.col;

  // get the possible direction of the current node.
  let directions = getDirection(grid, row, col);

  // do the following for all direction
  while (!!directions.length) {

    // get a random direction and remove it from the array.
    let direction = directions[rand(0, directions.length - 1)];
    directions = directions.filter((e) => e !== direction);

    // get the next node.
    const nextRow = row + rowDir[direction];
    const nextCol = col + colDir[direction];
    let nextNode = grid[nextRow][nextCol];

    // get the next next node.
    const nextNextRow = nextRow + rowDir[direction];
    const nextNextCol = nextCol + colDir[direction];
    
    // contiue if the node is out of boundary.
    if (
      nextNextRow < 0 ||
      nextNextRow >= maxRow ||
      nextNextCol < 0 ||
      nextNextCol >= maxCol
    ) {
      continue;
    }
    // continue if the node is not a wall.
    if (!grid[nextNextRow][nextNextCol].isWall) {
      continue;
    }
    // set the next and next next node to non-wall node.
    if (!(nextNode.isStart || nextNode.isEnd)) {
      nextNode.isWall = false;
      changeClassName(dark, nextNode);
      await delay(deltaTime);
    }
    nextNode = grid[nextNextRow][nextNextCol];
    if (!(nextNode.isStart || nextNode.isEnd)) {
      nextNode.isWall = false;
      changeClassName(dark, nextNode);
      await delay(deltaTime);
    }
    // do track the next next node.
    await doRecursiveBacktracker(dark, grid, nextNode, maxRow, maxCol);
  }
};

export default RecursiveBacktrackingMaze;
