import { VisualizerState } from "@/features/Visualizer";

export const clearWall = (state: VisualizerState) => {
  state.grid.forEach((e) => {
    e.forEach((f) => {
      f.isWall = false
    });
  });
}

export const randomWall = (state: VisualizerState) => {
  state.grid.forEach((e) => {
    e.forEach((f) => {
      f.isWall = Math.random()<0.3 
    });
  });
}