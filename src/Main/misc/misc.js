const rowDir = { N: -1, S: 1, E: 0, W: 0 };
const colDir = { N: 0, S: 0, E: 1, W: -1 };

const changeClassName = async (node, name="", fakeIsWall=false) => {
  const element = document.getElementById(`${node.row}-${node.col}`);
  element.className = `node ${
    node.isStart
      ? "bg-emerald-400"
      : node.isEnd
      ? "bg-pink-400"
      : fakeIsWall
      ? name
      : node.isWall
      ? "bg-gray-400"
      : name
  } border border-gray-200 m-0 p-0`;
};

const buildBoundaries = async (grid, duration) => {
  const maxRow = grid.length;
  const maxCol = grid[0].length;
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
};

const refresh = (visitedNodes, shortestPath) => {
  const n = visitedNodes.length;
  for (let i = 0; i < n; ++i) {
    const node = visitedNodes[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(node, "bg-cyan-300");
    }
  }
  const m = shortestPath.length;
  for (let i = 0; i < m; ++i) {
    const node = shortestPath[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(node, "bg-yellow-300");
    }
  }
};

const rand = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

const reverseGrid = (grid, maxRow, maxCol) => {
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
  return (maxRow - 1) * (maxCol - 1);
};

const isHorizontalCut = (width, height) => {
  if (width < height) return true;
  else if (width > height) return false;
  return Math.floor(Math.random() * 2) === 1;
};

const delay = (t)=>{
  return new Promise((resolve, reject) => {
    setTimeout(resolve,t);
  });
}

export {
  changeClassName,
  buildBoundaries,
  refresh,
  rand,
  reverseGrid,
  rowDir,
  colDir,
  isHorizontalCut,
  delay,
};
