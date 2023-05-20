import { VisualizerState } from "@/features/Visualizer/visualizerSlice";

export const clearWall = (state: VisualizerState) => {
  state.grid.forEach((e) => {
    e.forEach((f) => {
      f.isWall = false;
    });
  });
  state.status = "idle";
};
