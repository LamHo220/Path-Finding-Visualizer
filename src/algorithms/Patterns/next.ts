import { Pos, VisualizerState } from "@/features/Visualizer/visualizerSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { randomWallNext } from "./RandomWalls";
import { Cut, RecursiveDivision } from "./RecursiveDivision";

export default function _generateWallNext(
  state: VisualizerState,
  action: PayloadAction<Pos>
) {
  switch (state.pattern) {
    case "Simple Random Walls":
      randomWallNext(state, action);
      break;
    case "Recursive Division":
      if (state.status === "cutting") {
        RecursiveDivision(state);
      } else {
        Cut(state);
      }
      break;
    default:
      break;
  }
}
