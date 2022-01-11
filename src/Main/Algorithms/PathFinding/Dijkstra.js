/**
 * A greedy algorithm to find the shortest path.
 * @param {Object} start - the start node
 * @returns {Object} - an object that contains: visitedNodes and shortestPath
 */
export default function dijkstra(start) {
  // Initially, start.f = 0 because the distance between start node to start node = 0
  start.f = 0;
  // an array named openSet store the nodes that are pretend to be visited
  let openSet = [];
  openSet.push(start);
  

  // initialize an array store the nodes that are visited
  let visitedNodes = [];

  // loop untill there is no other nodes can be visited
  while (!!openSet.length) {

    // sort the openSet by distance
    openSet.sort((a, b) => a.f - b.f);

    // get the minimum of the distance in the univisied nodes
    let current = openSet.shift();

    // current is visited
    visitedNodes.push(current);

    // return result if current is the end node.
    if (current.isEnd) {
      let shortestPath = getPath(current);
      return { visitedNodes, shortestPath };
    }

    let neighbors = current.neighbors;
    for (let neighbor of neighbors) {
      // pass if the neighbor is visited or neighbor is a wall
      if (visitedNodes.includes(neighbor) || neighbor.isWall) {
        continue;
      }
      // if neighbor doesn't exist in the open set, add it and calcualate the f
      if (!openSet.includes(neighbor)) {
        neighbor.f = current.f + h(current, neighbor);
        neighbor.previous = current;
        openSet.push(neighbor);
      }
    }
  }
  // shortest path is empty
  let shortestPath = [];
  return { visitedNodes, shortestPath };
}

/**
 * Calculate the Heuristic of node A and node B.
 * @param {Object} nodeA - the first node that will be calculated
 * @param {Object} nodeB - the second node that will be calculated
 * @returns 
 */
function h(nodeA, nodeB) {
  let Acol = nodeA.col;
  let Bcol = nodeB.col;
  let Arow = nodeA.row;
  let Brow = nodeB.row;
  let col = Math.pow(Acol - Bcol, 2);
  let row = Math.pow(Arow - Brow, 2);
  return Math.sqrt(col + row);
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
