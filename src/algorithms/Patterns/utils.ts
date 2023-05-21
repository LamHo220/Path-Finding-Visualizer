import { VisualizerState } from "@/features/Visualizer/visualizerSlice";

export const clearWall = (state: VisualizerState) => {
  state.grid.forEach((e) => {
    e.forEach((f) => {
      f.isWall = false;
      f.isBoundary = true;
      f.isPath = false;
      f.visited = false;
      f._visited = false;
      f.isBoundary = false;
      f.f = Infinity;
      f.g = Infinity;
    });
  });
  state.status = "idle";
};

export const reverse = (state: VisualizerState) => {
  state.grid.forEach((e) => {
    e.forEach((f) => {
      f.isWall = true;
      f.isBoundary = true;
    });
  });
  state.status = "reversed";
};
