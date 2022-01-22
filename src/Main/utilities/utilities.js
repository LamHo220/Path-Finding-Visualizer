import PathFinding from "../Algorithms/PathFinding/PathFinding";

/**
 * A promise that delay for some ms.
 * @param {Number} time The time to be delayed (in ms).
 * @returns {Promise} A Promise that wait for some ms.
 */
export const delay = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

/**
 * A function to change the class name of the node.
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {Object} node The required node.
 * @param {String} name The name to be changed.
 * @param {Boolean} fakeIsWall Whether the node is a fake wall.
 */
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

/**
 * A function to clean the path of the grid.
 * @param {Boolean} dark Whether currently is dark mode or not
 * @param {Array<Array<Object>>} grid The grid to be cleaned.
 */
export const clearPath = async (dark, grid) => {
  for (let row of grid) {
    for (let node of row) {
      changeClassName(dark, node);
    }
  }
};

/**
 * A function to refresh the visited nodes and shortest path.
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {Array<Object>} visitedNodes The visited node that returned from the path finding algorithm.
 * @param {Array<Object>} shortestPath The shortset path that returned from the path findign algorithm.
 */
export const refresh = async (dark, visitedNodes, shortestPath) => {
  // refrest the visited nodes.
  const n = visitedNodes.length;
  for (let i = 0; i < n; ++i) {
    const node = visitedNodes[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(dark, node, !dark ? "bg-cyan-300" : "bg-cyan-700");
    }
  }

  // refresh the shortest path.
  const m = shortestPath.length;
  for (let i = 0; i < m; ++i) {
    const node = shortestPath[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(dark, node, !dark ? "bg-yellow-300" : "bg-yellow-600");
    }
  }
};

/**
 * A function to return a random Integer. 
 * @param {Number} from Value of from.
 * @param {Number} to Value to.
 * @returns {Number} A random integer in range [from, to].
 */
export const rand = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

/**
 * A function to determine the sub grid should be horizontally cutted or not.
 * @param {Number} width The width of the sub grid.
 * @param {Number} height The height of the sub grid.
 * @returns {Boolean} Whether the sub grid should be horizontally cutted or not
 */
export const isHorizontalCut = (width, height) => {
  if (width < height) return true;
  else if (width > height) return false;
  return Math.floor(Math.random() * 2) === 1;
};

/**
 * A function to create a node.
 * @param {Number} row The row of the node
 * @param {Number} col The column of the node
 * @param {Object} start The start node.
 * @param {Number} start.row The row of start.
 * @param {Number} start.col The column of start.
 * @param {Object} end The end node.
 * @param {Number} end.row The row of end.
 * @param {Number} end.col The column of end.
 * @returns {Object} The created node.
 */
export const createNode = (row, col, start, end) => {
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

/**
 * A function to initialize the grid.
 * @param {Number} maxRow The maximum row of the grid.
 * @param {Number} maxCol The maximum column of the grid.
 * @param {Object} start The start node.
 * @param {Number} start.row The row of start.
 * @param {Number} start.col The column of start.
 * @param {Object} end The end node.
 * @param {Number} end.row The row of end.
 * @param {Number} end.col The column of end.
 * @returns {Array<Array<Object>>} The created grid.
 */
export const initGrid = (maxRow, maxCol, start, end) => {
  let nodes = [];
  for (let row = 0; row < maxRow; ++row) {
    let currentRow = [];

    for (let col = 0; col < maxCol; ++col) {
      currentRow.push(createNode(row, col, start, end));
    }
    nodes.push(currentRow);
  }
  return nodes;
};

/**
 * A function to visualize the algorithm.
 * @param {String} algorithm The selected algorithm.
 * @param {Array<Array<Object>>} grid The current grid.
 * @param {Object} start The start node.
 * @param {Object} end The end node.
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {Number} duration The duration to be waited.
 * @param {Boolean} isBidirection Whether the algorithm is bi-direction.
 * @param {Boolean} allowDiagonal Whether the diagonal movement is allowed.
 * @param {String} heuristic The selected heuristic.
 * @returns {Object} The length of visited node and shortesr path.
 */
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
  const res = PathFinding[algorithm](input);
  const n = res.visitedNodes.length;
  const m = res.shortestPath.length;

  // visualize the vistited nodes.
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

  // visualize the shortest path.
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

  // return the length of visited node and shortesr path.
  return {
    visited: res.shortestPath.length - 1,
    path: res.visitedNodes.length - 1,
  };
};

/**
 * A function to randomly weight the grid for each node.
 * @param {Array<Array<Object>>} grid The grid to be weighted.
 * @returns {Array<Array<Object>>} A grid that evey node are randomly weighted.
 */
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

/**
 * A function to clear the weights of each node in the grid.
 * @param {Array<Array<Object>>} grid The grid to be cleaned.
 * @returns {Array<Array<Object>>} A grid that evey node are not weighted.
 */
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

/**
 * A function to get the neighbors of the node.
 * @param {Array<Array<Object>>} grid The grid that the node in.
 * @param {Objcet} node The required node.
 * @param {Boolean} allowDiagonal Whether the diagonal movement is allowed.
 * @returns {Array<Object>} An array of neighbor of the required node.
 */
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

/**
 * A function to get the distance between two nodes.
 * @param {Object} nodeA The first node.
 * @param {Object} nodeB The second node.
 * @returns {Number} The distance between two nodes.
 */
export const distance = (nodeA, nodeB) => {
  let Acol = nodeA.col;
  let Bcol = nodeB.col;
  let Arow = nodeA.row;
  let Brow = nodeB.row;

  return Math.sqrt(Math.pow(Acol - Bcol, 2) + Math.pow(Arow - Brow, 2));
};

/**
 * A function to get the path of the algorithm.
 * @param {Object} node The node start with.
 * @param {Boolean} isBidirection Whether the algorithm is bi-direction.
 * @returns {Array<Object>} The path of the algorithm.
 */
export const getPath = (node, isBidirection) => {
  let path = [];
  let temp = node;
  if ((temp.isEnd || temp.isStart) && !isBidirection) {
    temp = temp.previous;
  }
  while (temp.previous !== null) {
    if (isBidirection) {
      if (temp.isStart) {
        return path;
      }
      if (temp.isEnd) {
        return path;
      }
    }
    path.unshift(temp);
    temp = temp.previous;
  }
  return path;
};

/**
 * A function to get the path of the bi-direction algorithm.
 * @param {Object} nodeA The first node.
 * @param {Object} nodeB The second node.
 * @returns {Array<Object>} The path of the bi-direction algorithm.
 */
export const getPathBi = (nodeA, nodeB) => {
  return getPath(nodeA, true).concat(getPath(nodeB, true).reverse());
};

/**
 * A function to get the visitedNodes of the bi-direction algorithm
 * @param {Object} nodeA The first node.
 * @param {Object} nodeB The second node.
 * @param {Function} f The function: (a,b)=>{...}
 * @returns {Array<Object>} The visitedNodes of the bi-direction algorithm.
 */
export const getVisitedNodesBi = (nodeA, nodeB, f) => {
  return nodeA.concat(nodeB).sort(f);
};
