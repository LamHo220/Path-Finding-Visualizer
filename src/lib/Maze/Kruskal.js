import {
  changeClassName,
  delay,
  rand
} from "../utilities/utilities";
import { isHorizontalCut } from "./utilities/utilities";

/**
 * The time to be waited.
 */
var deltaTime;

/**
 * A function to generate a maze by Randomized Kruskal algorithm.
 * @param {Object} input The input of the algorithm.
 * @param {Array<Array<Object>>} input.grid The grid to be used.
 * @param {Object} input.maxDimension The maximum row and column of the grid.
 * @param {Object} input.maxDimension.maxRow The maximum row of the grid.
 * @param {Object} input.maxDimension.maxCol The maximum column of the grid.
 * @param {Number} input.duration The time to be waited.
 * @param {Boolean} input.dark Whether currently is dark mode or not.
 * @param {Object} input.startNode The start node.
 * @param {Object} input.endNode The end node.
 */
const Kruskal = async (input) => {
  const { dark, grid, maxDimension, duration, startNode, endNode } = input;
  const { maxCol, maxRow } = maxDimension;
  deltaTime = duration;

  // initalize the following:
  // the closed set.
  let closed = [startNode, endNode];

  // the groups of set.
  // groups := {idx:set}
  let groups = new Map();

  // the idx (based 0) of the group.
  let idx = 0;

  // the boundary of the grid is the first group.
  let bound = [];
  for (let j = 0; j < maxCol; ++j) {
    let node = grid[0][j];
    if (!(node.isStart || node.isEnd)) {
      node.idx = idx;
      bound.push(node);
    }
    node = grid[maxRow - 1][j];
    if (!(node.isStart || node.isEnd)) {
      node.idx = idx;
      bound.push(node);
    }
  }

  for (let i = 0; i < maxRow; ++i) {
    let node = grid[i][0];
    if (!(node.isStart || node.isEnd)) {
      node.idx = idx;
      bound.push(node);
    }
    node = grid[i][maxCol - 1];
    if (!(node.isStart || node.isEnd)) {
      node.idx = idx;
      bound.push(node);
    }
  }

  // add the boundary to the closed set and the group.
  closed = closed.concat(bound);
  groups.set(idx++, bound);

  /**
   * for each node,
   * if the row and column is divisible by 2
   * label them as a new group.
   * The final ids of the grid will be something like:
   * [[0, 0, 0, 0, 0, 0, 0]],
   * [[0,-1,-1,-1,-1,-1, 0]],
   * [[0,-1, 1,-1, 2,-1, 0]],
   * [[0,-1,-1,-1,-1,-1,-1]],
   * [[0, 0, 0, 0, 0, 0, 0]]
   */
  for (let i = 2; i < maxRow - 2; i += 2) {
    for (let j = 2; j < maxCol - 2; j += 2) {
      const node = grid[i][j];
      if (!(node.isStart || node.isEnd)) {
        node.idx = idx;
        closed.push(node);
        groups.set(idx++, [node]);
      }
    }
  }

  /**
   * For each node not near the nodes with non-negative idx:
   * add them to the closed set.
   * near mean the closed horizonal/vertical nodes,
   * not near means the closed diagonal nodes
   */
  for (let i = 1; i < maxRow - 1; i += 2) {
    for (let j = 1; j < maxCol - 1; j += 2) {
      const node = grid[i][j];
      if (!(node.isStart || node.isEnd)) {
        closed.push(node);
      }
    }
  }

  // get the nodes to be visited in the future.
  let open = grid.flat().filter((e) => !closed.includes(e));

  // loop until the open set is empty.
  while (open.length !== 0) {
    // randomly determin this node should horizontally divide the sub-grid or not.
    const isHorizontal = isHorizontalCut(0, 0);

    // ranodmly get a node from the open set.
    const node = open[rand(0, open.length - 1)];

    // remove the node from the open set.
    open = open.filter((e) => e !== node);

    // horizontal cut.
    if (isHorizontal) {
      const nodeA = grid[node.row][node.col - 1];
      const nodeB = grid[node.row][node.col + 1];

      // if horizontal cut is not allowed, try vertical cut.
      if (!(await combineGroup(dark, node, nodeA, nodeB, groups))) {
        const nodeA = grid[node.row - 1][node.col];
        const nodeB = grid[node.row + 1][node.col];
        // vertical cut
        await combineGroup(dark, node, nodeA, nodeB, groups);
      }
    } else {
      // vertical cut.
      const nodeA = grid[node.row - 1][node.col];
      const nodeB = grid[node.row + 1][node.col];

      // if vertical cut is not allowed, try horizontal cut.
      if (!(await combineGroup(dark, node, nodeA, nodeB, groups))) {
        const nodeA = grid[node.row][node.col - 1];
        const nodeB = grid[node.row][node.col + 1];
        // horizontal cut
        await combineGroup(dark, node, nodeA, nodeB, groups);
      }
    }
  }
};

/**
 * A function to combine the vertical/horizontal nodes.
 * @param {Boolean} dark Whether currently is dark mode or not.
 * @param {Object} node The select node.
 * @param {Object} nodeA The nearest node.
 * @param {Object} nodeB The nearest node.
 * @param {Map} groups The map of groups.
 * @returns {Promise} Whether this cut is allowed or not.
 */
const combineGroup = async (dark, node, nodeA, nodeB, groups) => {
  // if idx of the nearest nodes are the same,
  // there will be the closed loop,
  // thus return false
  if (nodeA.idx === nodeB.idx || nodeA.isStart || nodeA.isEnd|| nodeB.isStart || nodeB.isEnd) {
    return false;
  }

  // get the set 1 of nodeA.
  let set1 = groups.get(nodeA.idx);

  // get the set 2 of nodeB.
  let set2 = groups.get(nodeB.idx);

  // delete the group of nodeB.
  groups.delete(nodeB.idx);

  // change the group that nodeB in to the idx of the nodeA.
  for (let i = 0; i < set2.length; ++i) {
    set2[i].idx = nodeA.idx;
  }

  // update the group of nodeA belongs to.
  groups.set(nodeA.idx, set1.concat(set2));
  node.idx = nodeA.idx;

  // change node, nodeA, nodeB to a wall node.
  if (!(node.isStart || node.isEnd)) {
    node.isWall = true;
  }
  if (!(nodeA.isStart || nodeA.isEnd)) {
    nodeA.isWall = true;
  }
  if (!(nodeB.isStart || nodeB.isEnd)) {
    nodeB.isWall = true;
  }
  changeClassName(dark, node);
  changeClassName(dark, nodeB);
  changeClassName(dark, nodeA);
  await delay(5 * deltaTime);
  // return true because the cut is allowed.
  return true;
};

export default Kruskal;
