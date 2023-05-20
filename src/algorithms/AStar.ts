import { TNode, VisualizerState } from "@/features/Visualizer";
import Heuristics from "./Heuristics";
import { distance, getNeighbours, getPath, resetSearching } from "./uttils";

export default function AStar(state: VisualizerState) {
  resetSearching(state);
  const startNode = state.grid
    .find((row) => row.find((node) => node.isStart))
    ?.find((e) => e.isStart);
  const endNode = state.grid
    .find((row) => row.find((node) => node.isEnd))
    ?.find((e) => e.isEnd);

  if (!startNode) {
    console.warn("start node not found");
    return;
  }
  if (!endNode) {
    console.warn("end node not found");
    return;
  }

  const startRow = startNode.pos.row;
  const startCol = startNode.pos.col;
  const endRow = endNode.pos.row;
  const endCol = endNode.pos.col;

  const dx = Math.abs(startCol - endCol);
  const dy = Math.abs(startRow - endRow);

  startNode.g = 0;
  startNode.f = Heuristics[state.heuristic](dx, dy);

  state.frontier.push(startNode);
  if (state.status === "answered") {
    while (!state.frontier) {
      AStarNext(state);
    }
  }
}

export const AStarNext = (state: VisualizerState) => {
  const endNode = state.grid
    .find((row) => row.find((node) => node.isEnd))
    ?.find((e) => e.isEnd);
  if (!endNode) {
    return;
  }
  const endRow = endNode.pos.row;
  const endCol = endNode.pos.col;

  if (state.frontier.length !== 0) {
    state.frontier.sort((a: TNode, b: TNode) => a.f - b.f);
    const current = state.frontier.shift();
    if (!current) {
      return;
    }

    if (current.isEnd) {
      state.status = "answering";
      state.frontier = [];
      getPath(current, state);
      return;
    }

    state.grid[current.pos.row][current.pos.col].visited = true;
    state.grid[current.pos.row][current.pos.col]._visited = true;

    state.exploredLength += 1;

    const neighbours = getNeighbours(current, state).filter(
      (e) => !e._visited && !e.isWall
    );

    for (const neighbour of neighbours) {
      const g = current.g + neighbour.weight + distance(current, neighbour);
      if (g < neighbour.g || !state.frontier.includes(neighbour)) {
        neighbour.g = g;

        const dx = Math.abs(neighbour.pos.col - endCol);
        const dy = Math.abs(neighbour.pos.row - endRow);
        neighbour.f = g + Heuristics[state.heuristic](dx, dy);

        neighbour.parent = current;

        if (!state.frontier.includes(neighbour)) {
          state.frontier.push(neighbour);
          neighbour._visited = true;
        }
      }
    }
  } else {
    state.status = "idle";
  }
};
