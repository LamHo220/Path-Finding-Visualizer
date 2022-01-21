import { getNeighbours, distance, getPath } from "../../utilities/utilities";

/**
 * A greedy algorithm to find the shortest path.
 * @param {Object} start - the start node
 * @returns {Object} - an object that contains: visitedNodes and shortestPath
 */
export default function dijkstra(input) {
  const { grid, allowDiagonal, isBidirection} = input;
  let unvisitedNodes = grid
    .flat()
    .filter((e) => !e.isWall)
    .map((e) => {
      if (e.isStart) {
        e.f = 0;
        return e;
      } else if (e.isEnd && isBidirection){
        e.f = 0;
        return e;
      }
      else {
        e.f = Infinity;
        return e;
      }
    });
  let visitedNodes = [];
  while (!!unvisitedNodes) {
    unvisitedNodes.sort((a, b) => a.f - b.f);
    let current = unvisitedNodes.shift();

    if (current.isEnd) {
      // if (isBidirection){
      //   return { visitedNodes:[], shortestPath: [] };
      // }
      return { visitedNodes, shortestPath: getPath(current) };
    }
    let neighbors = getNeighbours(grid, current, allowDiagonal);
    for (let neighbor of neighbors) {
      const temp = current.f + neighbor.weight + distance(current, neighbor);
      if (temp < neighbor.f) {
        neighbor.f = temp;
        neighbor.previous = current;
      }
    }
    visitedNodes.push(current);
  }
  return { visitedNodes, shortestPath: [] };
}
