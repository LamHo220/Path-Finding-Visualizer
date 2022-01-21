import { getNeighbours, distance, getPath } from "../../utilities/utilities";

/**
 * A greedy algorithm to find the shortest path.
 * @param {Object} start - the start node
 * @returns {Object} - an object that contains: visitedNodes and shortestPath
 */
export default function dijkstra(input) {
  const { grid, allowDiagonal, isBidirection, start, end} = input;

  let unvisitedNodes = grid
  .flat()
  .filter((e) => !e.isWall)
  .map((e) => {
    e.f = Infinity;
    return e;
  });

  let visitedNodes=[];
  if (isBidirection){
    start.f=0;
    end.f = 0
    let unvisitedNodesA = [start];
    let unvisitedNodesB = [end];
    let visitedNodesA = [];
    let visitedNodesB = [];
    let neighbors, curA, curB;
    while (unvisitedNodesA.length!==0 || unvisitedNodesB.length!==0){
      unvisitedNodesA.sort((a,b)=>a.f-b.f);
      curA = unvisitedNodesA.shift();
      if (curA){
        neighbors = getNeighbours(grid, curA,allowDiagonal).filter(e=>
        !e.isWall && !visitedNodesA.includes(e)
        )
        visitedNodesA.push(curA);
        for (let neighbor of neighbors) {
          if (visitedNodesB.includes(neighbor)){
            visitedNodes = visitedNodesA
                            .map((e,i)=>{
                              return [e,i];
                            })
                            .concat(visitedNodesB
                                    .map((e,i)=>{
                                      return [e,i];
                                    })
                            );
            visitedNodes.sort((a,b)=>a[1]-b[1]);
            visitedNodes = visitedNodes.map(e=>{
              return e[0];
            })
            return {shortestPath:getPath(curA).concat(getPath(neighbor).reverse()), 
              visitedNodes};
          }
          const temp = curA.f + neighbor.weight + distance(curA, neighbor);
          if (temp < neighbor.f) {
            neighbor.f = temp;
            neighbor.previous = curA;
          }
          if (!unvisitedNodesA.includes(neighbor)){
            unvisitedNodesA.push(neighbor);
            visitedNodesA.push(neighbor);
          }
        }
      }

      unvisitedNodesB.sort((a,b)=>a.f-b.f);
      curB = unvisitedNodesB.shift();
      if (curB){
        neighbors = getNeighbours(grid, curB,allowDiagonal).filter(e=>
          !e.isWall && !visitedNodesB.includes(e)
        )
        visitedNodesB.push(curB);
        for (let neighbor of neighbors) {
          if (visitedNodesA.includes(neighbor)){
            visitedNodes = visitedNodesA
                            .map((e,i)=>{
                              return [e,i];
                            })
                            .concat(visitedNodesB
                                    .map((e,i)=>{
                                      return [e,i];
                                    })
                            );
            visitedNodes.sort((a,b)=>a[1]-b[1]);
            visitedNodes = visitedNodes.map(e=>{
              return e[0];
            });
            return {shortestPath:getPath(neighbor).concat(getPath(curB).reverse()), 
              visitedNodes}
          }
          const temp = curB.f + neighbor.weight + distance(curB, neighbor);
          if (temp < neighbor.f) {
            neighbor.f = temp;
            neighbor.previous = curB;
          }
          if (!unvisitedNodesB.includes(neighbor)){
            unvisitedNodesB.push(neighbor);
            visitedNodesB.push(neighbor);
          }
        }
      }
    }
    return {visitedNodes:[], shortestPath:[]};
  }
  start.f = 0;
  while (!!unvisitedNodes) {
    unvisitedNodes.sort((a, b) => a.f - b.f);
    let current = unvisitedNodes.shift();
    if (current.isEnd) {
      return { visitedNodes, shortestPath: getPath(current, false) };
    }
    let neighbors = getNeighbours(grid, current, allowDiagonal).filter(e=>!visitedNodes.includes(e));
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
