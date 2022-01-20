/**
 * A greedy algorithm to find the shortest path.
 * @param {Object} start - the start node
 * @returns {Object} - an object that contains: visitedNodes and shortestPath
 */
export default function dijkstra(start, end, grid) {
  let unvisitedNodes = grid.flat().filter((e) => !e.isWall);
  start.f = 0;
  let visitedNodes = [];
  while (!!unvisitedNodes) {
    unvisitedNodes.sort((a, b) => a.f - b.f);
    let current = unvisitedNodes.shift();

    if (current.isEnd) {
      let shortestPath = getPath(current);
      return { visitedNodes, shortestPath };
    }
    let neighbors = current.neighbors;
    for (let neighbor of neighbors) {
      const temp = current.f + neighbor.weight + distance(current, neighbor);
      if (temp < neighbor.f) {
        neighbor.f = temp;
        neighbor.previous = current;
      }
    }
    visitedNodes.push(current);
  }
  let shortestPath = [];
  return { visitedNodes, shortestPath };
}

/**
 * Calculate the Heuristic of node A and node B.
 * @param {Object} nodeA - the first node that will be calculated
 * @param {Object} nodeB - the second node that will be calculated
 * @returns
 */
function distance(nodeA, nodeB) {
  let Acol = nodeA.col;
  let Bcol = nodeB.col;
  let Arow = nodeA.row;
  let Brow = nodeB.row;
  return Math.sqrt(Math.pow(Acol - Bcol, 2) + Math.pow(Arow - Brow, 2));
}

/**
 * Get the shortesy path from end node.
 * @param {Object} node - the end node
 * @returns
 */
function getPath(node) {
  let path = [];
  let temp = node;
  while (temp.previous !== null) {
    path.unshift(temp);
    temp = temp.previous;
  }
  return path;
}
