import { VisualizerState } from "@/features/Visualizer";
import { distance, getNeighbours, getPath, resetSearching } from "./uttils";

export default function Dijkstra(state: VisualizerState) {
  resetSearching(state);
  const startNode = state.grid
    .find((row) => row.find((node) => node.isStart))
    ?.find((e) => e.isStart);

  if (!startNode) {
    console.warn("start node not found");
    return;
  }

  startNode.f = 0;
  state.frontier.push(startNode);
  if (state.status === "answered") {
    while (!state.frontier) {
      DijkstraNext(state);
    }
  }
}

export const DijkstraNext = (state: VisualizerState) => {
  if (state.frontier.length !== 0) {
    state.frontier.sort((a, b) => a.f - b.f);

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
      const f = current.f + neighbour.weight + distance(current, neighbour);
      if (f < neighbour.f) {
        neighbour.f = f;

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
