import { VisualizerState } from "@/features/Visualizer/visualizerSlice";
import { randomWall } from "./RandomWalls";
import { RecursiveDivision, initRecursizeDivision } from "./RecursiveDivision";

export default function _generateWall(state: VisualizerState) {
  state.RDParam = initRecursizeDivision;
  switch (state.pattern) {
    case "Simple Random Walls":
      randomWall(state);
      break;
    case "Recursive Division":
      if (state.grid[0][0].isWall) {
        RecursiveDivision(state);
        return;
      }
      state.status = "generating boundary";
      break;
    default:
      break;
  }
}
