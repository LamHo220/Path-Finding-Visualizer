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
