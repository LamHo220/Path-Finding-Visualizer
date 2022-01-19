import aStar from "../Algorithms/PathFinding/AStar";
import dijkstra from "../Algorithms/PathFinding/Dijkstra";
import Heuristic from "../Heuristic/Heuristic";
import Mazes from "../Algorithms/Maze/Mazes";

export const getAlgoResult = (algorithm) => {
  switch (algorithm) {
    case "A*":
      return aStar;
    case "Dijkstra":
      return dijkstra;
    default:
      break;
  }
};

export const generatePattern = async (
  dark,
  pattern,
  grid,
  maxRow,
  maxCol,
  start = null,
  end = null,
  duration = 50,
  density = 0.3
) => {
  switch (pattern) {
    case "Simple Random Walls":
      await Mazes.SimpleRandomWalls(dark, grid, density);
      break;
    case "Recursive Division":
      await Mazes.RecursiveDivisionMaze(dark, grid, maxRow, maxCol, duration);
      break;
    case "Recursive Backtracking":
      await Mazes.RecursiveBacktrackingMaze(
        dark,
        grid,
        maxRow,
        maxCol,
        duration,
        start,
        end
      );
      break;
    case "Prim's Algorithm":
      await Mazes.PrimMaze(dark, grid, maxRow, maxCol, duration);
      break;
    case "Kruskal's Algorithm":
      await Mazes.Kruskal(dark, grid, maxRow, maxCol, duration);
      break;
    default:
      await Mazes.NoWalls(dark, grid);
      break;
  }
};

export const getHeuristic = (heuristic) => {
  switch (heuristic) {
    case "Manhattan":
      return Heuristic.Manhattan;
    case "Euclidean":
      return Heuristic.Euclidean;
    case "Octile":
      return Heuristic.Octile;
    case "Chebyshev":
      return Heuristic.Octile;
    default:
      return (dx, dy) => {
        return dx + dy;
      };
  }
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
      : node.isWeight
      ? (!dark ? "bg-orange-400" : "bg-orange-600") + " fade-in"
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
    g: Infinity,
    h: getHeuristic(heuristic)(Math.abs(row - endRow), Math.abs(col - endCol)),
    f: Infinity,
    neighbors: [],
    weight: 0,
    isWeight: false,
    idx: -1,
  };
};

export const initGrid = (
  maxRow,
  maxCol,
  start,
  end,
  heuristic,
  allowDiagonal
) => {
  let nodes = [];
  for (let row = 0; row < maxRow; ++row) {
    let cur = [];
    for (let col = 0; col < maxCol; ++col) {
      cur.push(createNode(row, col, start, end, heuristic));
    }
    nodes.push(cur);
  }
  return setNeightbours(nodes, maxRow, maxCol, allowDiagonal);
};

export const setNeightbours = (nodes, maxRow, maxCol, allowDiagonal) => {
  for (let row = 0; row < maxRow; ++row) {
    for (let col = 0; col < maxCol; ++col) {
      nodes[row][col].neighbors = [];
      let neighbors = nodes[row][col].neighbors;
      // up
      if (row - 1 >= 0) neighbors.push(nodes[row - 1][col]);
      // down
      if (row + 1 < maxRow) neighbors.push(nodes[row + 1][col]);
      // left
      if (col - 1 >= 0) neighbors.push(nodes[row][col - 1]);
      // right
      if (col + 1 < maxCol) neighbors.push(nodes[row][col + 1]);
      // diagonal
      if (allowDiagonal) {
        // up left
        if (row - 1 >= 0 && col - 1 >= 0)
          neighbors.push(nodes[row - 1][col - 1]);
        // down right
        if (row + 1 < maxRow && col + 1 < maxCol)
          neighbors.push(nodes[row + 1][col + 1]);
        // down left
        if (row + 1 < maxRow && col - 1 >= 0)
          neighbors.push(nodes[row + 1][col - 1]);
        // up right
        if (row - 1 >= 0 && col + 1 < maxCol)
          neighbors.push(nodes[row - 1][col + 1]);
      }
    }
  }
  return nodes;
};

export const updateHeuristic = (nodes, heuristic, endRow, endCol) => {
  for (let row of nodes) {
    for (let node of row) {
      node.g = Infinity;
      node.f = Infinity;
      const dx = Math.abs(node.col - endCol);
      const dy = Math.abs(node.row - endRow);
      node.h = getHeuristic(heuristic)(dx, dy);
      node.previous = null;
    }
  }
  return nodes;
};

export const visualize = async (algorithm, start, end, dark, duration) => {
  const res = getAlgoResult(algorithm)(start, end);
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
