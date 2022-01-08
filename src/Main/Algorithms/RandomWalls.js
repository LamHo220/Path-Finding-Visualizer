import { changeClassName, rand, rowDir, colDir, delay } from "../misc/misc";

const deltaTime = 60;

const getWallDir = (grid, node, maxRow, maxCol) => {
  let result = [];
  let nodeA;
  let nodeB;

  let row = node.row;
  let col = node.col;

  // North
  if (row - 2 >= 0) {
    nodeA = col - 1 >= 0 ? grid[row - 2][col - 1] : true;
    nodeB = col + 1 < maxCol ? grid[row - 2][col + 1] : true;
    if (!nodeA.isWall && !nodeB.isWall) {
      result.push("N");
    }
  }

  // South
  if (row + 2 < maxRow) {
    nodeA = col - 1 >= 0 ? grid[row + 2][col - 1] : true;
    nodeB = col + 1 < maxCol ? grid[row + 2][col + 1] : true;
    if (!nodeA.isWall && !nodeB.isWall) {
      result.push("S");
    }
  }

  // East
  if (col + 2 < maxCol) {
    nodeA = row - 1 >= 0 ? grid[row - 1][col + 2] : true;
    nodeB = row + 1 < maxRow ? grid[row + 1][col + 2] : true;
    if (!nodeA.isWall && !nodeB.isWall) {
      result.push("E");
    }
  }

  // West
  if (col - 2 >= 0) {
    nodeA = row - 1 >= 0 ? grid[row - 1][col - 2] : true;
    nodeB = row + 1 < maxRow ? grid[row + 1][col - 2] : true;
    if (!nodeA.isWall && !nodeB.isWall) {
      result.push("W");
    }
  }
  return result;
};

const RandomWalls = async (grid, maxRow, maxCol) => {
  let unvisitedNode = [];
  for (let i = 1; i < maxRow - 1; i += 2) {
    for (let j = 1; j < maxCol - 1; j += 2) {
      if (grid[i][j].isStart || grid[i][j].isEnd) {
        continue;
      }
        grid[i][j].isWall = true;
        changeClassName(grid[i][j]);
        await delay(deltaTime);
      unvisitedNode.push(grid[i][j]);
    }
  }
  let i = 1;
  while (!!unvisitedNode.length) {
    let current = unvisitedNode[rand(0, unvisitedNode.length - 1)];
    unvisitedNode = unvisitedNode.filter((e) => e !== current);
    let dir = getWallDir(grid, current, maxRow, maxCol);
    let dirId = rand(0, dir.length - 1);
    if (!!dir.length) {
      let nextRow = current.row + rowDir[dir[dirId]];
      let nextCol = current.col + colDir[dir[dirId]];
      if (grid[nextRow][nextCol].isStart || grid[nextRow][nextCol].isEnd) {
        continue;
      }
        grid[nextRow][nextCol].isWall = true;
        changeClassName(grid[nextRow][nextCol]);
        await delay(deltaTime);
    }
  }
};

export default RandomWalls;
