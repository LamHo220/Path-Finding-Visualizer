import { rand, changeClassName, rowDir, colDir, delay } from "../misc/misc";

const deltaTime = 60;

const RecursiveBacktrackingMaze = async (
  grid,
  maxRow,
  maxCol,
  startNode,
  endNode
) => {
  startNode.isWall = true;
  endNode.isWall = true;

  const randCol = Math.floor(rand(0, maxCol - 1) / 2) * 2 + 1;
  const randRow = Math.floor(rand(0, maxRow - 1) / 2) * 2 + 1;
  let node = grid[randRow][randCol];
  node.isWall=false;
  changeClassName(node);
  doRecursiveBacktracker(grid, node, maxRow, maxCol);
  startNode.isWall = false;
  endNode.isWall = false;
};

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

const doRecursiveBacktracker = async (grid, node, maxRow, maxCol) => {
  const row = node.row;
  const col = node.col;

  let dir = getDirection(grid, row, col);
  while (!!dir.length) {
    const dirId = rand(0, dir.length - 1);
    let direction = dir[dirId];
    dir = dir.filter((e) => e !== direction);
    const nextRow = row + rowDir[direction];
    const nextCol = col + colDir[direction];

    let nextNode = grid[nextRow][nextCol];

    const pretendRow = nextRow + rowDir[direction];
    const pretendCol = nextCol + colDir[direction];
    if (
      pretendRow < 0 ||
      pretendRow >= maxRow ||
      pretendCol < 0 ||
      pretendCol >= maxCol
    ) {
      continue;
    }
    if (!grid[pretendRow][pretendCol].isWall ) {
      continue;
    }
    if (!(nextNode.isStart || nextNode.isEnd)) {
      nextNode.isWall = false;
      changeClassName(nextNode, "");
      await delay(deltaTime);
    }
    nextNode = grid[pretendRow][pretendCol];
    if (!(nextNode.isStart || nextNode.isEnd)) {
      nextNode.isWall = false;
      changeClassName(nextNode, "");
      await delay(deltaTime);
    }
    await doRecursiveBacktracker(grid, nextNode, maxRow, maxCol);
  }
};

export default RecursiveBacktrackingMaze;
