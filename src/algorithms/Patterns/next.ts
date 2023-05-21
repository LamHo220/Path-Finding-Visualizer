import { Pos, VisualizerState } from "@/features/Visualizer/visualizerSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { randomWallNext } from "./RandomWalls";
import { Cut } from "./RecursiveDivision";
import { PrimNext } from "./Prim";

export default function _generateWallNext(
  state: VisualizerState,
  action: PayloadAction<Pos>
) {
  switch (state.pattern) {
    case "Simple Random Walls":
      randomWallNext(state, action);
      break;
    case "Recursive Division":
      Cut(state);
      break;
    case "Prim's Algorithm":
      PrimNext(state);
      break;
    default:
      break;
  }
}
