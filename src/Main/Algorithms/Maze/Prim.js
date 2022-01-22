import { rand, changeClassName, delay } from "../../utilities/utilities";
import { rowDir, colDir } from "../../Constants/Constants";

/**
 * The time to be waited.
 */
var deltaTime;

/**
 * A function to generate a maze by Randomized Prim's algorithm.
 * @param {Object} input The input of the algorithm.
 * @param {Array<Array<Object>>} input.grid The grid to be used.
 * @param {Number} input.maxRow The maximum row of the grid.
 * @param {Number} input.maxCol The maximum column of the grid.
 * @param {Number} input.timeRatio The thime to be waited.
 * @param {Boolean} input.dark Whether currently is dark mode or not.
 */
const PrimMaze = async (input) => {
  const { dark, grid, maxRow, maxCol, timeRatio } = input;
  deltaTime = timeRatio;

  // the algorithm looped at least one time.
  let isStarted = false;

  // get a random node.
  let row = Math.floor(rand(maxRow / 3, maxRow - 2) / 2) * 2 + 1;
  let col = Math.floor(rand(maxCol / 2, maxCol - 2) / 2) * 2 + 1;

  // initialize the queue.
  let queue = [grid[row][col]];

  // loop until the queue is empty.
  while (!!queue.length) {
    // randomly get a node from queue and remove it from queue.
    let current = queue[rand(0, queue.length - 1)];
    queue = queue.filter((e) => e !== current);

    // if the algorithm looped at least one time,
    // connect two nodes.
    if (isStarted) {
      await connectTwoNode(dark, grid, current, maxRow, maxCol);
    }

    let crow = current.row;
    let ccol = current.col;
    if (!(current.isStart || current.isEnd)) {
      if (!(current.isStart || current.isEnd)) {
        current.isWall = false;
      }
      changeClassName(dark, grid[crow][ccol]);
      await delay(deltaTime);

      // get the allowed direction of current.
      let dir = await getPrimDir(dark, grid, current, maxRow, maxCol);
      if (dir.length !== 0) {
        for (let direction of dir) {
          let col = ccol + colDir[direction] * 2;
          let row = crow + rowDir[direction] * 2;

          // add new node to queue
          queue.push(grid[row][col]);
        }
      }
    }
    // the algorithm looped at least once.
    isStarted = true;
  }
};

/**
 * A function to connect two node of the grid.
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {Array<Array<Object>>} grid The grid to be cleaned.
 * @param {Object} toNode The node to be connected.
 * @param {Number} maxRow The maximum row of the grid.
 * @param {Number} maxCol The maximum column of the grid.
 */
const connectTwoNode = async (dark, grid, toNode, maxRow, maxCol) => {
  let toRow = toNode.row;
  let toCol = toNode.col;
  let fromNode;
  let fromArr = [];
  let tempNode;
  if (toRow - 2 >= 0) {
    tempNode = grid[toRow - 2][toCol];
    if (!tempNode.isWall && !tempNode.isStart && !tempNode.isEnd)
      fromArr.push(tempNode);
  }
  if (toRow + 2 < maxRow) {
    tempNode = grid[toRow + 2][toCol];
    if (!tempNode.isWall && !tempNode.isStart && !tempNode.isEnd)
      fromArr.push(tempNode);
  }
  if (toCol + 2 < maxCol) {
    tempNode = grid[toRow][toCol + 2];
    if (!tempNode.isWall && !tempNode.isStart && !tempNode.isEnd)
      fromArr.push(tempNode);
  }
  if (toCol - 2 >= 0) {
    tempNode = grid[toRow][toCol - 2];
    if (!tempNode.isWall && !tempNode.isStart && !tempNode.isEnd)
      fromArr.push(tempNode);
  }
  fromNode = fromArr[rand(0, fromArr.length - 1)];
  let fromRow = fromNode.row;
  let fromCol = fromNode.col;
  if (!(toNode.isEnd || toNode.isStart)) {
    let next;
    if (toRow - fromRow === 2) {
      // South
      next = grid[fromRow + 1][fromCol];
    } else if (toCol - fromCol === 2) {
      // East
      next = grid[fromRow][fromCol + 1];
    } else if (toRow - fromRow === -2) {
      // North
      next = grid[fromRow - 1][fromCol];
    } else if (toCol - fromCol === -2) {
      // West
      next = grid[fromRow][fromCol - 1];
    }
    if (!(next.isStart || next.isEnd)) {
      next.isWall = false;
      changeClassName(dark, next);
    }
    await delay(deltaTime);
    if (!(toNode.isStart || toNode.isEnd)) {
      toNode.isWall = false;
      changeClassName(dark, toNode);
    }
    await delay(deltaTime);
  }
};

/**
 * A function to get the direction that the node can be connected.
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {Array<Array<Object>>} grid The grid to be cleaned.
 * @param {Object} node The node to be connected.
 * @param {Number} maxRow The maximum row of the grid.
 * @param {Number} maxCol The maximum column of the grid.
 * @returns {Array<Object>} The direction that the node can be connected.
 */
const getPrimDir = async (dark, grid, node, maxRow, maxCol) => {
  let row = node.row;
  let col = node.col;
  let result = [];
  let next;
  if (row - 2 >= 0) {
    next = grid[row - 2][col];
    if (next.isWall && !next.isStart && !next.isEnd) {
      result.push("N");
      changeClassName(dark, grid[row - 2][col], "bg-cyan-500", true);
      await delay(deltaTime);
    }
  }
  if (row + 2 < maxRow) {
    next = grid[row + 2][col];
    if (next.isWall && !next.isStart && !next.isEnd) {
      result.push("S");
      changeClassName(dark, grid[row + 2][col], "bg-cyan-500", true);
      await delay(deltaTime);
    }
  }
  if (col + 2 < maxCol) {
    next = grid[row][col + 2];
    if (next.isWall && !next.isStart && !next.isEnd) {
      result.push("E");
      changeClassName(dark, grid[row][col + 2], "bg-cyan-500", true);
      await delay(deltaTime);
    }
  }
  if (col - 2 >= 0) {
    next = grid[row][col - 2];
    if (next.isWall && !next.isStart && !next.isEnd) {
      result.push("W");
      changeClassName(dark, grid[row][col - 2], "bg-cyan-500", true);
      await delay(deltaTime);
    }
  }
  return result;
};

export default PrimMaze;
