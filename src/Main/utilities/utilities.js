import PathFinding from "../Algorithms/PathFinding/PathFinding";
import { pause } from "../Constants/Constants";

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
 * @param {Boolean} darkMode Whether currently is dark mode or not.
 * @param {Object} node The required node.
 * @param {String} name The name to be changed.
 * @param {Boolean} fakeIsWall Whether the node is a fake wall.
 */
export const changeClassName = (
  darkMode,
  node,
  name = "",
  fakeIsWall = false
) => {
  const element = document.getElementById(`${node.row}-${node.col}`);
  element.className = `node ${
    node.isStart
      ? !darkMode
        ? "bg-blue-400"
        : "bg-blue-700"
      : node.isEnd
      ? !darkMode
        ? "bg-pink-400"
        : "bg-pink-700"
      : fakeIsWall
      ? name
      : node.isWall
      ? (!darkMode ? "bg-gray-400" : "bg-gray-600") + " fade-in"
      : name + " hover:bg-orange-300"
  } border ${
    !darkMode ? "border-gray-200" : "border-gray-700"
  } m-0 p-0 hover:bg-orange-300`;
};

/**
 * A function to clean the path of the grid.
 * @param {Boolean} darkMode Whether currently is dark mode or not
 * @param {Array<Array<Object>>} grid The grid to be cleaned.
 */
export const clearPath = async (darkMode, grid) => {
  for (let row of grid) {
    for (let node of row) {
      node.previous = null;
      node.g = Infinity;
      node.f = Infinity;
      changeClassName(darkMode, node);
    }
  }
};

/**
 * A function to refresh the visited nodes and shortest path.
 * @param {Boolean} darkMode Whether currently is dark mode or not.
 * @param {Array<Object>} visitedNodes The visited node that returned from the path finding algorithm.
 * @param {Array<Object>} shortestPath The shortset path that returned from the path findign algorithm.
 */
export const refresh = async (darkMode, visitedNodes, shortestPath) => {
  // refrest the visited nodes.
  const n = visitedNodes.length;
  for (let i = 0; i < n; ++i) {
    const node = visitedNodes[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(
        darkMode,
        node,
        !darkMode ? "bg-cyan-300" : "bg-cyan-700"
      );
    }
  }

  // refresh the shortest path.
  const m = shortestPath.length;
  for (let i = 0; i < m; ++i) {
    const node = shortestPath[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(
        darkMode,
        node,
        !darkMode ? "bg-yellow-300" : "bg-yellow-600"
      );
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
 * @param {Object} flags The flags
 * @param {Boolean} flags.isDarkMode Whether currently is dark mode or not.
 * @param {Boolean} flags.isBiDirection Whether the algorithm is bi-direction.
 * @param {Boolean} flags.isDiagonal Whether the diagonal movement is allowed.
 * @param {Object} parameters The input parameters for algorithm.
 * @param {String} parameters.algorithm The selected algorithm.
 * @param {String} parameters.heuristic The selected heuristic.
 * @param {Array<Array<Object>>} grid The current grid.
 * @param {Object} startNode The start node.
 * @param {Object} endNode The end node.
 * @param {Number} duration The duration to be waited.
 * @returns {Object} The length of visited node and shortesr path.
 */
export const visualize = async (
  flags,
  parameters,
  grid,
  startNode,
  endNode,
  duration
) => {
  const { isDarkMode, isBiDirection, isDiagonal } = flags;
  const { algorithm, heuristic } = parameters;
  const input = {
    startNode,
    endNode,
    grid,
    isBiDirection,
    isDiagonal,
    heuristic,
  };
  const res = PathFinding[algorithm](input);
  const n = res.visitedNodes.length;
  const m = res.shortestPath.length;

  // visualize the vistited nodes.
  for (let i = 0; i < n; ++i) {
    while (pause.getFlag()) {
      await delay(10);
    }
    const node = res.visitedNodes[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(
        isDarkMode,
        node,
        (!isDarkMode ? "bg-cyan-300" : "bg-cyan-700") + " fade-in"
      );
    }
    document.getElementById("no-of-steps").textContent = i;
    await delay(2 * duration);
  }

  // visualize the shortest path.
  for (let i = 0; i < m; ++i) {
    while (pause.getFlag()) {
      await delay(10);
    }
    const node = res.shortestPath[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(
        isDarkMode,
        node,
        (!isDarkMode ? "bg-yellow-300" : "bg-yellow-600") + " fade-in"
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
