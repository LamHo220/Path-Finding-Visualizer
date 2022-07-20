import {
  getNeighbours,
  distance,
  getPath,
  getPathBi,
  getVisitedNodesBi,
} from "./utilities/utilities";

/**
 * A star algorithm, a famous path finding algorithm.
 * @author LamHo220 <https://github.com/LamHo220>
 * @param {Object} input The input arguments.
 * @param {Object} input.startNode The start node.
 * @param {Object} input.endNode The end node.
 * @param {Array<Array<Object>>} input.grid The grid to be used.
 * @param {Boolean} input.isBiDirection Whether the function is bi-direction.
 * @param {Boolean} input.isDiagonal Whether diagonal movement is allowed.
 * @param {String} input.heuristic The selected heuristic.
 * @returns {Object} The array of visited nodes and the array of shortest path of a star
 */
export default function dijkstra(input) {
  const { grid, isDiagonal, isBiDirection, startNode, endNode } = input;

  // get the unvisited nodes.
  let unvisitedNodes = grid
    .flat()
    .filter((e) => !e.isWall)
    .map((e) => {
      e.f = Infinity;
      return e;
    });

  // initial the visited nodes.
  let visitedNodes = [];

  // start's f is 0 initially.
  startNode.f = 0;

  let neighbors, tempF;

  // if the algorithm is bi-direction.
  if (isBiDirection) {
    // end's f is 0 initially.
    endNode.f = 0;

    // initial the unvisited nodes of start and end.
    let unvisitedNodesFromStart = [startNode];
    let unvisitedNodesFromEnd = [endNode];
    let visitedNodesFromStart = [];
    let visitedNodesFromEnd = [];
    let curA, curB;

    // while one of them is not empty
    while (
      unvisitedNodesFromStart.length !== 0 ||
      unvisitedNodesFromEnd.length !== 0
    ) {
      // sort the unvisited nodes
      unvisitedNodesFromStart.sort((a, b) => a.f - b.f);

      // get the node with minimum f.
      // and remove it from the unvisited nodes.
      curA = unvisitedNodesFromStart.shift();

      // if current is not undefined, we muse have neighbor(s).
      if (curA) {
        // get neighbors of current node and filter the wall nodes and visitednodes that start from start node.
        neighbors = getNeighbours(grid, curA, isDiagonal).filter(
          (e) => !e.isWall && !visitedNodesFromStart.includes(e)
        );

        // current node is visited from start node.
        visitedNodesFromStart.push(curA);

        // do the following for each neighbor:
        for (let neighbor of neighbors) {
          // if neighbor already visited in end unvisited nodes.,
          // return the visited node and shortest path.
          if (visitedNodesFromEnd.includes(neighbor)) {
            return {
              // get the shortest path.
              shortestPath: getPathBi(curA, neighbor),

              // get the visited nodes in order.
              visitedNodes: getVisitedNodesBi(
                visitedNodesFromStart.map((e, i) => {
                  return [e, i];
                }),
                visitedNodesFromEnd.map((e, i) => {
                  return [e, i];
                }),
                (a, b) => a[1] - b[1]
              ).map((e) => {
                return e[0];
              }),
            };
          }

          // calculate the potential f of this neighbor
          tempF = curA.f + neighbor.weight + distance(curA, neighbor);

          // do if the potential f is smaller then the current f
          if (tempF < neighbor.f) {
            // set neighbor's f to this f.
            neighbor.f = tempF;

            // set the neighbor's previous to current node.
            neighbor.previous = curA;
          }

          // add the neighbor to the unvisited nodes
          // if it have not been the current node yet.
          if (!unvisitedNodesFromStart.includes(neighbor)) {
            unvisitedNodesFromStart.push(neighbor);
            visitedNodesFromStart.push(neighbor);
          }
        }
      }

      // sort the unvisited nodes
      unvisitedNodesFromEnd.sort((a, b) => a.f - b.f);

      // get the node with minimum f.
      // and remove it from the unvisited nodes.
      curB = unvisitedNodesFromEnd.shift();

      // if current is not undefined, we muse have neighbor(s).
      if (curB) {
        // get neighbors of current node and filter the wall nodes and visitednodes that start from start node.
        neighbors = getNeighbours(grid, curB, isDiagonal).filter(
          (e) => !e.isWall && !visitedNodesFromEnd.includes(e)
        );

        // current node is visited from start node.
        visitedNodesFromEnd.push(curB);

        // do the following for each neighbor:
        for (let neighbor of neighbors) {
          // if neighbor already visited in end unvisited nodes.,
          // return the visited node and shortest path.
          if (visitedNodesFromStart.includes(neighbor)) {
            return {
              // get the shortest path.
              shortestPath: getPathBi(neighbor, curB),

              // get the visited nodes in order.
              visitedNodes: getVisitedNodesBi(
                visitedNodesFromStart.map((e, i) => {
                  return [e, i];
                }),
                visitedNodesFromEnd.map((e, i) => {
                  return [e, i];
                }),
                (a, b) => a[1] - b[1]
              ).map((e) => {
                return e[0];
              }),
            };
          }

          // calculate the potential f of this neighbor
          tempF = curB.f + neighbor.weight + distance(curB, neighbor);

          // do if the potential f is smaller then the current f
          if (tempF < neighbor.f) {
            // set neighbor's f to this f.
            neighbor.f = tempF;

            // set the neighbor's previous to current node.
            neighbor.previous = curB;
          }

          // add the neighbor to the unvisited nodes
          // if it have not been the current node yet.
          if (!unvisitedNodesFromEnd.includes(neighbor)) {
            unvisitedNodesFromEnd.push(neighbor);
            visitedNodesFromEnd.push(neighbor);
          }
        }
      }
    }

    // return because we cannot reach the end node.
    return {
      visitedNodes: getVisitedNodesBi(
        visitedNodesFromStart.map((e, i) => {
          return [e, i];
        }),
        visitedNodesFromEnd.map((e, i) => {
          return [e, i];
        }),
        (a, b) => a[1] - b[1]
      ).map((e) => {
        return e[0];
      }),
      shortestPath: [],
    };
  }
  let current;
  // while unvisitedNodes is not empty
  while (!!unvisitedNodes) {
    // sort the unvisited nodes
    unvisitedNodes.sort((a, b) => a.f - b.f);

    // get the node with minimum f.
    // and remove it from the unvisited nodes.
    current = unvisitedNodes.shift();

    // if current is the end node, return result.
    if (current.isEnd) {
      return { visitedNodes, shortestPath: getPath(current, false) };
    }

    // get neighbors of current node and filter the visitednodes that start from start node.
    neighbors = getNeighbours(grid, current, isDiagonal).filter(
      (e) => !visitedNodes.includes(e)
    );

    // do the following for each neighbor:
    for (let neighbor of neighbors) {
      // calculate the potential f of this neighbor
      tempF = current.f + neighbor.weight + distance(current, neighbor);
      // do if the potential f is smaller then the current f
      if (tempF < neighbor.f) {
        // set neighbor's f to this f.
        neighbor.f = tempF;

        // set the neighbor's previous to current node.
        neighbor.previous = current;
      }
    }

    // current node is visited.
    visitedNodes.push(current);
  }
  // return because we cannot reach the end node.
  return { visitedNodes, shortestPath: [] };
}
