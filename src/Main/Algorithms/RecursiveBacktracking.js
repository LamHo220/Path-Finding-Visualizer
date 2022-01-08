import { rand, changeClassName, rowDir, colDir, delay } from "../misc/misc";

const deltaTime = 60;

const RecursiveBacktracker = async (
  grid,
  maxRow,
  maxCol,
  startNode,
  endNode
) => {
  startNode.isWall = true;
  endNode.isWall = true;

  let randCol = Math.floor(rand(0, maxCol - 1) / 2) * 2 + 1;
  let randRow = Math.floor(rand(0, maxRow - 1) / 2) * 2 + 1;
  let node = grid[randRow][randCol];

  doRecursiveBacktracker(grid, node, maxRow, maxCol);
  startNode.isWall = false;
  endNode.isWall = false;
};

const getDirection = () => {
  return ["N", "E", "S", "W"];
};

const doRecursiveBacktracker = async (
  grid,
  node,
  maxRow,
  maxCol,
  prev = []
) => {
  let row = node.row;
  let col = node.col;

  let dir = getDirection();
  while (!!dir.length) {
    let dirId = rand(0, dir.length - 1);
    let direction = dir[dirId];
    dir = dir.filter((e) => e !== direction);
    let nextRow = row + rowDir[direction];
    let nextCol = col + colDir[direction];

    let nextNode = grid[nextRow][nextCol];

    let pretendRow = nextRow + rowDir[direction];
    let pretendCol = nextCol + colDir[direction];
    if (
      pretendRow < 0 ||
      pretendRow >= maxRow ||
      pretendCol < 0 ||
      pretendCol >= maxCol
    ) {
      continue;
    }
    if (!grid[pretendRow][pretendCol].isWall) {
      continue;
    }
    if (!(nextNode.isStart || nextNode.isEnd)) {
      nextNode.isWall = false;
      changeClassName(nextNode, "");
      prev.push(nextNode);
    }
    nextNode = grid[pretendRow][pretendCol];
    if (!(nextNode.isStart || nextNode.isEnd)) {
      nextNode.isWall = false;
      changeClassName(nextNode, "");
      prev.push(nextNode);
    }
    await delay(deltaTime);
    await doRecursiveBacktracker(grid, nextNode, maxRow, maxCol, prev);
  }
};

export default RecursiveBacktracker;
