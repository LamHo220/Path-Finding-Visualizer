import aStar from "../Algorithms/PathFinding/AStar";
import dijkstra from "../Algorithms/PathFinding/Dijkstra";
import Mazes from "../Algorithms/Maze/Mazes";

export const getAlgoResult = {
  "A*": aStar,
  Dijkstra: dijkstra,
};

export const generatePattern = {
  "Simple Random Walls": Mazes.SimpleRandomWalls,
  "Recursive Division": Mazes.RecursiveDivisionMaze,
  "Recursive Backtracking": Mazes.RecursiveBacktrackingMaze,
  "Prim's Algorithm": Mazes.PrimMaze,
  "Kruskal's Algorithm": Mazes.Kruskal,
  "No Walls": Mazes.NoWalls,
};

export const delay = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
};

export const changeClassName = (dark, node, name = "", fakeIsWall = false) => {
  const element = document.getElementById(`${node.row}-${node.col}`);
  element.className = `node ${
    node.isStart
      ? !dark
        ? "bg-blue-400"
        : "bg-blue-700"
      : node.isEnd
      ? !dark
        ? "bg-pink-400"
        : "bg-pink-700"
      : fakeIsWall
      ? name
      : node.isWall
      ? (!dark ? "bg-gray-400" : "bg-gray-600") + " fade-in"
      : name + " hover:bg-orange-300"
  } border ${
    !dark ? "border-gray-200" : "border-gray-700"
  } m-0 p-0 hover:bg-orange-300`;
};

export const clearPath = async (dark, grid) => {
  for (let row of grid) {
    for (let node of row) {
      changeClassName(dark, node);
    }
  }
};

export const refresh = async (dark, visitedNodes, shortestPath) => {
  const n = visitedNodes.length;
  for (let i = 0; i < n; ++i) {
    const node = visitedNodes[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(dark, node, !dark ? "bg-cyan-300" : "bg-cyan-700");
    }
  }
  const m = shortestPath.length;
  for (let i = 0; i < m; ++i) {
    const node = shortestPath[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(dark, node, !dark ? "bg-yellow-300" : "bg-yellow-600");
    }
  }
};

export const rand = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

export const isHorizontalCut = (width, height) => {
  if (width < height) return true;
  else if (width > height) return false;
  return Math.floor(Math.random() * 2) === 1;
};

export const createNode = (row, col, start, end, heuristic) => {
  const startRow = start.row;
  const startCol = start.col;
  const endRow = end.row;
  const endCol = end.col;

  return {
    col: col,
    row: row,
    isStart: row === startRow && col === startCol,
    isEnd: row === endRow && col === endCol,
    isWall: false,
    previous: null,
    weight: 0,
    idx: -1,
  };
};

export const initGrid = (maxRow, maxCol, start, end) => {
  let nodes = [];
  for (let row = 0; row < maxRow; ++row) {
    let cur = [];
    for (let col = 0; col < maxCol; ++col) {
      cur.push(createNode(row, col, start, end));
    }
    nodes.push(cur);
  }
  return nodes;
};

export const visualize = async (
  algorithm,
  grid,
  start,
  end,
  dark,
  duration,
  isBidirection,
  allowDiagonal,
  heuristic
) => {
  const input = { start, end, grid, isBidirection, allowDiagonal, heuristic };
  const res = getAlgoResult[algorithm](input);
  const n = res.visitedNodes.length;
  const m = res.shortestPath.length;
  for (let i = 0; i < n; ++i) {
    const node = res.visitedNodes[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(
        dark,
        node,
        (!dark ? "bg-cyan-300" : "bg-cyan-700") + " fade-in"
      );
    }
    document.getElementById("no-of-steps").textContent = i;
    await delay(2 * duration);
  }
  for (let i = 0; i < m; ++i) {
    const node = res.shortestPath[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(
        dark,
        node,
        (!dark ? "bg-yellow-300" : "bg-yellow-600") + " fade-in"
      );
    }
    document.getElementById("path-length").textContent = i;
    await delay(2 * duration);
  }
  return {
    visited: res.shortestPath.length - 1,
    path: res.visitedNodes.length - 1,
  };
};

export const randomWeight = (grid) => {
  for (let row of grid) {
    for (let node of row) {
      node.weight = rand(1, 20);
      const element = document.getElementById(`${node.row}-${node.col}`);
      element.textContent = node.weight;
    }
  }
  return grid;
};

export const clearWeight = (grid) => {
  for (let row of grid) {
    for (let node of row) {
      node.weight = 0;
      const element = document.getElementById(`${node.row}-${node.col}`);
      element.textContent = "";
    }
  }
  return grid;
};

export const getNeighbours = (grid, node, allowDiagonal) => {
  const maxRow = grid.length;
  const maxCol = grid[0].length;

  let res = [];
  let { row, col } = node;

  if (row - 1 >= 0) res.push(grid[row - 1][col]);
  // down
  if (row + 1 < maxRow) res.push(grid[row + 1][col]);
  // left
  if (col - 1 >= 0) res.push(grid[row][col - 1]);
  // right
  if (col + 1 < maxCol) res.push(grid[row][col + 1]);
  // diagonal
  if (allowDiagonal) {
    // up left
    if (row - 1 >= 0 && col - 1 >= 0) res.push(grid[row - 1][col - 1]);
    // down right
    if (row + 1 < maxRow && col + 1 < maxCol) res.push(grid[row + 1][col + 1]);
    // down left
    if (row + 1 < maxRow && col - 1 >= 0) res.push(grid[row + 1][col - 1]);
    // up right
    if (row - 1 >= 0 && col + 1 < maxCol) res.push(grid[row - 1][col + 1]);
  }

  return res;
};

export const distance = (nodeA, nodeB) =>{
  let Acol = nodeA.col;
  let Bcol = nodeB.col;
  let Arow = nodeA.row;
  let Brow = nodeB.row;
  return Math.sqrt(Math.pow(Acol - Bcol, 2) + Math.pow(Arow - Brow, 2));
}

export const getPath = (node, isBidirection=true) =>{
  let path = [];
  let temp = node;
  if ((temp.isEnd || temp.isStart)&&(!isBidirection)){
    temp = temp.previous;
  }
  while (temp.previous !== null) {
    if (isBidirection){
      if (temp.isStart){
        return path;
      }
      if (temp.isEnd){
        return path;
      }
    }
    path.unshift(temp);
    temp = temp.previous;
  }
  return path;
}