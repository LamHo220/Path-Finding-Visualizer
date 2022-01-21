import Heuristic from "../../Heuristic/Heuristic";
import {
  getNeighbours,
  distance,
  getPath,
} from "../../utilities/utilities";

export default function aStar(input) {
  const { start, end, grid, isBidirection, allowDiagonal, heuristic } =
    input;

  const startRow = start.row;
  const startCol = start.col;
  const endRow = end.row;
  const endCol = end.col;

  if (isBidirection) {
    let visitedNodesA = [];
    let visitedNodesB = [];
    start.g = 0;
    end.g = 0;
    start.f = 0;
    end.f = 0;
    let openA = [start];
    let openB = [end];
    while (openA.length!==0 || openB.length!==0) {
      let node, neighbors;
      openA.sort((a, b) => a.f - b.f);
      node = openA.shift();
      if (node){
        visitedNodesA.push(node);
        let neighbors = getNeighbours(grid, node, allowDiagonal).filter(
          (e) => !e.isWall && !visitedNodesA.includes(e) 
        );
        for (let neighbor of neighbors) {
          if (visitedNodesB.includes(neighbor)) {
            let visitedNodes = visitedNodesA.concat(visitedNodesB);
            visitedNodes.sort((a,b)=>a.g-b.g);
            return {
              visitedNodes,
              shortestPath: getPath(node).concat(getPath(neighbor).reverse()),
            };
          }
          let tempG = node.g + distance(node, neighbor) + neighbor.weight;
          if (
            tempG < neighbor.g ||
            !openA.includes(neighbor) ||
            !openB.includes(neighbor)
          ) {
            neighbor.g = tempG;
            const dx = Math.abs(neighbor.col - endCol);
            const dy = Math.abs(neighbor.row - endRow);
            neighbor.f = tempG + Heuristic[heuristic](dx, dy);
            neighbor.previous = node;
            if (!openA.includes(neighbor)) {
              openA.push(neighbor);
              visitedNodesA.push(neighbor);
            }
          }
        }
      }
      openB.sort((a, b) => a.f - b.f);
      node = openB.shift();
      if (node){
        visitedNodesB.push(node);
        neighbors = getNeighbours(grid, node, allowDiagonal).filter(
          (e) => !e.isWall && !visitedNodesB.includes(e)
        );
        for (let neighbor of neighbors) {
          if (visitedNodesA.includes(neighbor)) {
            let visitedNodes = visitedNodesA.concat(visitedNodesB);
            visitedNodes.sort((a,b)=>a.g-b.g);
            return {
              visitedNodes,
              shortestPath: getPath(neighbor).concat(getPath(node).reverse()),
            };
          }
          let tempG = node.g + distance(node, neighbor) + neighbor.weight;
          if (
            tempG < neighbor.g ||
            !openA.includes(neighbor) ||
            !openB.includes(neighbor)
          ) {
            neighbor.g = tempG;
            const dx = Math.abs(neighbor.col - startCol);
            const dy = Math.abs(neighbor.row - startRow);
            neighbor.f = tempG + Heuristic[heuristic](dx, dy);
            neighbor.previous = node;
            if (!openB.includes(neighbor)) {
              openB.push(neighbor);
              visitedNodesB.push(neighbor);
            }
          }
        }
      }
    }
    let visitedNodes = visitedNodesA.concat(visitedNodesB);
    visitedNodes.sort((a,b)=>a.f-b.f);
    return { shortestPath: [], visitedNodes };
  }

  let visitedNodes = [];
  let openSet = [start];
  start.g = 0;
  start.f = 0;

  while (!!openSet) {
    openSet.sort((a, b) => a.f - b.f);
    let current = openSet.shift();
    if (current.isEnd) {
      return { visitedNodes, shortestPath: getPath(current, false) };
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
          visitedNodes.push(neighbor);
        }
      }
    }
  }
  return { visitedNodes, shortestPath: [] };
}
