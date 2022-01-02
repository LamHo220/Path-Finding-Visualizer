import { rand, changeClassName } from "../misc/misc";

const rowDir = { N: -1, S: 1, E: 0, W: 0 };
const colDir = { N: 0, S: 0, E: 1, W: -1 };

const Prim = async (grid, maxRow, maxCol) => {
  let i = 0;
  let isStarted = false;
  let row = Math.floor(rand(maxRow / 3, maxRow - 2) / 2) * 2 + 1;
  let col = Math.floor(rand(maxCol / 2, maxCol - 2) / 2) * 2 + 1;
  let pretendNodes = [grid[row][col]];
  while (!!pretendNodes.length) {
    let current = pretendNodes[rand(0, pretendNodes.length - 1)];
    if (isStarted) {
      connectTwoNode(grid, current, maxRow, maxCol);
    }
    pretendNodes = pretendNodes.filter((e) => e !== current);
    let crow = current.row;
    let ccol = current.col;
    if (!(current.isStart || current.isEnd)) {
      changeClassName(grid[crow][ccol], "bg-red-500");
      if (!(current.isStart || current.isEnd)) current.isWall = false;
      let dir = getPrimDir(grid, current, maxRow, maxCol);
      if (dir.length !== 0) {
        for (let direction of dir) {
          let col = ccol + colDir[direction] * 2;
          let row = crow + rowDir[direction] * 2;
          pretendNodes.push(grid[row][col]);
        }
      }
    }
    isStarted = true;
  }
  finishRoads(grid);
};

const finishRoads = (grid) => {
  for (let rows of grid) {
    for (let node of rows) {
      changeClassName(node, "");
    }
  }
};

const connectTwoNode = (grid, toNode, maxRow, maxCol) => {
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
      setTimeout(() => {
        next.isWall = false;
        changeClassName(next, "");
      }, 50);
    }
    setTimeout(() => {
      toNode.isWall = false;
      changeClassName(toNode, "");
    }, 100);
  }
};

const getPrimDir = (grid, node, maxRow, maxCol) => {
  let row = node.row;
  let col = node.col;
  let result = [];
  let next;
  if (row - 2 >= 0) {
    next = grid[row - 2][col];
    if (next.isWall && !next.isStart && !next.isEnd) {
      result.push("N");
      changeClassName(grid[row - 2][col], "bg-cyan-500");
    }
  }
  if (row + 2 < maxRow) {
    next = grid[row + 2][col];
    if (next.isWall && !next.isStart && !next.isEnd) {
      result.push("S");
      changeClassName(grid[row + 2][col], "bg-cyan-500");
    }
  }
  if (col + 2 < maxCol) {
    next = grid[row][col + 2];
    if (next.isWall && !next.isStart && !next.isEnd) {
      result.push("E");
      changeClassName(grid[row][col + 2], "bg-cyan-500");
    }
  }
  if (col - 2 >= 0) {
    next = grid[row][col - 2];
    if (next.isWall && !next.isStart && !next.isEnd) {
      result.push("W");
      changeClassName(grid[row][col - 2], "bg-cyan-500");
    }
  }
  return result;
};

export default Prim;
