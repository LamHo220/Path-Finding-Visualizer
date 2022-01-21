import Heuristic from "../../Heuristic/Heuristic";
import {
  getNeighbours,
  distance,
  getPath,
  toOrderedList,
} from "../../utilities/utilities";

/**
 * An algorithm that find the shortest path
 * @param {Object} start - the start node
 * @returns { visitedNodes, shortestPath } - an object that contains two array: visited nodes and shortest path
 */
export default function aStar(input) {
  const { start, end, grid, isBidirection, allowDiagonal, heuristic, dark } =
    input;

  const startRow = start.row;
  const startCol = start.col;
  const endRow = end.row;
  const endCol = end.col;

  if (isBidirection) {
    // let visitedNodesA = [];
    // let visitedNodesB = [];
    // start.g = 0;
    // end.g = 0;
    // start.f = 0;
    // end.f = 0;
    // let openA = [start];
    // let openB = [end];
    // while (!!openA && !!openB) {
    //   openA.sort((a, b) => a.f - b.f);
    //   let node = openA.shift();
    //   // changeClassName(dark, node, "bg-red-500");
    //   visitedNodesA.push(node);
    //   let neighbors = getNeighbours(grid, node, allowDiagonal).filter(
    //     (e) => !e.isWall && !visitedNodesA.includes(e)
    //   );
    //   for (let neighbor of neighbors) {
    //     if (visitedNodesB.includes(neighbor)) {
    //       console.log("doneA");
    //       return {
    //         visitedNodes: toOrderedList(visitedNodesA, visitedNodesB),
    //         shortestPath: getPath(node).concat(getPath(neighbor).reverse()),
    //       };
    //     }
    //     let tempG = node.g + distance(node, neighbor) + neighbor.weight;
    //     if (
    //       tempG < neighbor.g ||
    //       !openA.includes(neighbor) ||
    //       !openB.includes(neighbor)
    //     ) {
    //       neighbor.g = tempG;
    //       const dx = Math.abs(neighbor.col - endCol);
    //       const dy = Math.abs(neighbor.row - endRow);
    //       neighbor.f = tempG + Heuristic[heuristic](dx, dy);
    //       if (!openA.includes(neighbor)) {
    //         if (neighbor.previous === null) {
    //           neighbor.previous = node;
    //         }
    //         openA.push(neighbor);
    //       }
    //     }
    //   }
    //   openB.sort((a, b) => a.f - b.f);
    //   node = openB.shift();
    //   // changeClassName(dark, node, "bg-green-500");
    //   visitedNodesB.push(node);
    //   neighbors = getNeighbours(grid, node, allowDiagonal).filter(
    //     (e) => !e.isWall && !visitedNodesB.includes(e)
    //   );
    //   for (let neighbor of neighbors) {
    //     if (visitedNodesA.includes(neighbor)) {
    //       console.log("doneB");
    //       return {
    //         visitedNodes: toOrderedList(visitedNodesA, visitedNodesB),
    //         shortestPath: getPath(neighbor).concat(getPath(node).reverse()),
    //       };
    //     }
    //     let tempG = node.g + distance(node, neighbor) + neighbor.weight;
    //     if (
    //       tempG < neighbor.g ||
    //       !openA.includes(neighbor) ||
    //       !openB.includes(neighbor)
    //     ) {
    //       neighbor.g = tempG;
    //       const dx = Math.abs(neighbor.col - startCol);
    //       const dy = Math.abs(neighbor.row - startRow);
    //       neighbor.f = tempG + Heuristic[heuristic](dx, dy);
    //       if (!openB.includes(neighbor)) {
    //         if (neighbor.previous === null) {
    //           neighbor.previous = node;
    //         }
    //         openB.push(neighbor);
    //       }
    //     }
    //   }
    // }

    return { shortestPath: [], visitedNodes: [] };
  }

  let visitedNodes = [];
  let openSet = [start];
  start.g = 0;
  start.f = 0;

  while (!!openSet) {
    openSet.sort((a, b) => a.f - b.f);
    let current = openSet.shift();
    if (current.isEnd) {
      return { visitedNodes, shortestPath: getPath(current) };
    }
    visitedNodes.push(current);
    let neighbors = getNeighbours(grid, current, allowDiagonal).filter(
      (e) => !visitedNodes.includes(e) && !e.isWall
    );
    for (let neighbor of neighbors) {
      let tempG = current.g + neighbor.weight + distance(current, neighbor);
      if (tempG < neighbor.g || !openSet.includes(neighbor)) {
        neighbor.g = tempG;
        const dx = Math.abs(neighbor.col - endCol);
        const dy = Math.abs(neighbor.row - endRow);
        neighbor.f = tempG + Heuristic[heuristic](dx, dy);
        neighbor.previous = current;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  return { visitedNodes, shortestPath: [] };
}
