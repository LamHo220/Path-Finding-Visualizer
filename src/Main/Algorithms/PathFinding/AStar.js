/**
 * An algorithm that find the shortest path
 * @param {Object} start - the start node
 * @returns { visitedNodes, shortestPath } - an object that contains two array: visited nodes and shortest path
 */

export default function aStar(start) {
  // initialize an open list and push the start node to the open list.
  let openSet = [start];

  // distance between start and start is 0
  start.g = 0;
  // initially, f = g + h = 0 + h = h
  start.f = start.h;

  // an array that storing the visited nodes.
  let visitedNodes = [];

  while (!!openSet.length) {
    // sort the openSet by f
    openSet.sort((a, b) => a.f - b.f);
    // get the minimum of the distance in the univisied nodes
    let current = openSet.shift();
    if (current.isEnd) {
      let shortestPath = getPath(current);
      return { visitedNodes, shortestPath };
    }
    // current is visited
    visitedNodes.push(current);
    let neighbors = current.neighbors;
    for (let neighbor of neighbors) {
      if (neighbor.isWall || visitedNodes.includes(neighbor)) {
        continue;
      }
      let tempG = current.g + distance(current, neighbor);

      if (tempG < neighbor.g || !openSet.includes(neighbor)) {
        neighbor.g = tempG;
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  let shortestPath = [];
  return { visitedNodes, shortestPath };
}

/**
 * Calculate the heuristic
 * @param {Object} nodeA - the first node
 * @param {Object} nodeB - the second node
 * @returns
 */
function distance(nodeA, nodeB) {
  let Acol = nodeA.col;
  let Bcol = nodeB.col;
  let Arow = nodeA.row;
  let Brow = nodeB.row;
  return Math.sqrt(Math.pow(Acol - Bcol, 2) + Math.pow(Arow - Brow, 2));
}

function getPath(endNode) {
  let path = [];
  let temp = endNode;
  while (temp.previous) {
    path.unshift(temp);
    temp = temp.previous;
  }
  return path;
}
