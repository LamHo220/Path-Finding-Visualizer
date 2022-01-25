import Heuristic from "../../Heuristic/Heuristic";
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
 * @param {Object} input.start The start node.
 * @param {Object} input.end The end node.
 * @param {Array<Array<Object>>} input.grid The grid to be used.
 * @param {Boolean} input.isDiagonal Whether diagonal movement is allowed.
 * @param {Boolean} input.isBiDirection Whether the function is bi-direction.
 * @param {String} input.heuristic The selected heuristic.
 * @returns {Object} The array of visited nodes and the array of shortest path of a star
 */
export default function aStar(input) {
  const { startNode, endNode, grid, isBiDirection, isDiagonal, heuristic } =
    input;

  const startRow = startNode.row;
  const startCol = startNode.col;
  const endRow = endNode.row;
  const endCol = endNode.col;

  // dx and dy are used for calculating initial heuristic of start and end.
  const dx = Math.abs(startCol - endCol);
  const dy = Math.abs(startRow - endRow);

  // initial the current node and the neighbors of current node.
  let current, neighborsOfCurrent, tempG;

  // if this is bidirection, do this
  if (isBiDirection) {
    // the visited nodes started from start node and end node.
    let visitedNodesFromStart = [];
    let visitedNodesFromEnd = [];

    // the open set started from start node.
    // initially, f = g + h = h.
    startNode.g = 0;
    startNode.f = Heuristic[heuristic](dx, dy);
    let startOpenSet = [startNode];

    // the open set started from end node.
    // initially, f = g + h = h.
    endNode.g = 0;
    endNode.f = Heuristic[heuristic](dx, dy);
    let endOpenSet = [endNode];

    // loop untill two open set are empty.
    while (startOpenSet.length !== 0 || endOpenSet.length !== 0) {
      // sort the start open set
      startOpenSet.sort((a, b) => a.f - b.f);

      // get the current node with the minimum f in statr open set.
      // and remove it from the open set
      current = startOpenSet.shift();

      // if current is not undefined, we muse have neighbor(s).
      if (current) {
        // current node is came from start node.
        visitedNodesFromStart.push(current);

        // get neighbors of current node and filter the wall and visitednodes that start from start node.
        neighborsOfCurrent = getNeighbours(grid, current, isDiagonal).filter(
          (e) => !e.isWall && !visitedNodesFromStart.includes(e)
        );

        // do the following for each neighbor:
        for (let neighbor of neighborsOfCurrent) {
          // if neighbor already visited in end open set,
          // return the visited node and shortest path.
          if (visitedNodesFromEnd.includes(neighbor)) {
            return {
              // get the visited nodes in order.
              visitedNodes: getVisitedNodesBi(
                visitedNodesFromStart,
                visitedNodesFromEnd,
                (a, b) => a.g - b.g
              ),

              // get the shortest path.
              shortestPath: getPathBi(current, neighbor),
            };
          }

          // calculate the potential g.
          tempG = current.g + distance(current, neighbor);

          // check if g is smaller than current g of neighbor or not in open set.
          if (
            tempG < neighbor.g ||
            !startOpenSet.includes(neighbor) ||
            !endOpenSet.includes(neighbor)
          ) {
            // set neighbor's g to this g.
            neighbor.g = tempG;

            // update the neighbor's f.
            const dx = Math.abs(neighbor.col - endCol);
            const dy = Math.abs(neighbor.row - endRow);
            neighbor.f = tempG + Heuristic[heuristic](dx, dy) + neighbor.weight;

            // set the neighbor's previous to current node.
            neighbor.previous = current;

            // add to open set if neighbor not in open set.
            if (!startOpenSet.includes(neighbor)) {
              startOpenSet.push(neighbor);
              visitedNodesFromStart.push(neighbor);
            }
          }
        }
      }
      // sort the end open set.
      endOpenSet.sort((a, b) => a.f - b.f);

      // get the current node with the minimum f in end open set.
      // and remove it from the open set
      current = endOpenSet.shift();

      // if current is not undefined, we muse have neighbor(s).
      if (current) {
        // current node is came from end node.
        visitedNodesFromEnd.push(current);

        // get neighbors of current node and filter the wall and visitednodes that start from start node.
        neighborsOfCurrent = getNeighbours(grid, current, isDiagonal).filter(
          (e) => !e.isWall && !visitedNodesFromEnd.includes(e)
        );

        // do the following for each neighbor:
        for (let neighbor of neighborsOfCurrent) {
          // if neighbor already visited in start open set,
          // return the visited node and shortest path.
          if (visitedNodesFromStart.includes(neighbor)) {
            return {
              // get the visited nodes in order.
              visitedNodes: getVisitedNodesBi(
                visitedNodesFromStart,
                visitedNodesFromEnd,
                (a, b) => a.g - b.g
              ),

              // get the shortest path.
              shortestPath: getPathBi(neighbor, current),
            };
          }

          // calculate the potential g.
          tempG = current.g + distance(current, neighbor);
          if (
            tempG < neighbor.g ||
            !startOpenSet.includes(neighbor) ||
            !endOpenSet.includes(neighbor)
          ) {
            // set neighbor's g to this g.
            neighbor.g = tempG;

            // update the neighbor's f.
            const dx = Math.abs(neighbor.col - startCol);
            const dy = Math.abs(neighbor.row - startRow);
            neighbor.f = tempG + Heuristic[heuristic](dx, dy) + neighbor.weight;

            // set the neighbor's previous to current node.
            neighbor.previous = current;

            // add to open set if neighbor not in open set.
            if (!endOpenSet.includes(neighbor)) {
              endOpenSet.push(neighbor);
              visitedNodesFromEnd.push(neighbor);
            }
          }
        }
      }
    }
    // return because we cannot reach the end node.
    let visitedNodes = visitedNodesFromStart.concat(visitedNodesFromEnd);
    visitedNodes.sort((a, b) => a.f - b.f);
    return { shortestPath: [], visitedNodes };
  }

  // the visited nodes to be returned.
  let visitedNodes = [];

  // the open set started from start node.
  // initially, f = g + h = h.
  startNode.g = 0;
  startNode.f = Heuristic[heuristic](dx, dy);
  let openSet = [startNode];

  // loop untill open set is empty.
  while (!!openSet) {
    // sort the open set
    openSet.sort((a, b) => a.f - b.f);

    // get the current node with the minimum f in open set.
    current = openSet.shift();

    // return the result if current is the end node.
    if (current.isEnd) {
      return { visitedNodes, shortestPath: getPath(current, false) };
    }

    // current node is visited.
    visitedNodes.push(current);

    // get neighbors of current node and filter the wall and visitednodes.
    neighborsOfCurrent = getNeighbours(grid, current, isDiagonal).filter(
      (e) => !visitedNodes.includes(e) && !e.isWall
    );

    // do the following for each neighbor:
    for (let neighbor of neighborsOfCurrent) {
      // calculate the potential g.
      tempG = current.g + neighbor.weight + distance(current, neighbor);

      // check if g is smaller than current g of neighbor or not in open set.
      if (tempG < neighbor.g || !openSet.includes(neighbor)) {
        // set neighbor's g to this g.
        neighbor.g = tempG;

        // update the neighbor's f.
        const dx = Math.abs(neighbor.col - endCol);
        const dy = Math.abs(neighbor.row - endRow);
        neighbor.f = tempG + Heuristic[heuristic](dx, dy);

        // set the neighbor's previous to current.
        neighbor.previous = current;

        // add to open set if neighbor not in open set.
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
          visitedNodes.push(neighbor);
        }
      }
    }
  }
  // return because we cannot reach the end node.
  return { visitedNodes, shortestPath: [] };
}
