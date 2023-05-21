import { GRID_MAX_COL, GRID_MAX_ROW } from "@/Constants";
import { Pos, VisualizerState } from "@/features/Visualizer/visualizerSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export const _generateBoundary = (state: VisualizerState) => {
  state.grid[0][0].isWall = true;
};

export const _generateBoundaryNext = (
  state: VisualizerState,
  action: PayloadAction<Pos>
) => {
  const { row, col } = action.payload;
  if (row === 0 && col === 0) {
    state.grid[0][1].isWall = true;
    return;
  }

  if (row === 0) {
    if (col + 1 < GRID_MAX_COL) {
      state.grid[row][col + 1].isWall = true;
    } else {
      state.grid[row + 1][col].isWall = true;
    }
    return;
  }
  if (col === GRID_MAX_COL - 1) {
    if (row + 1 < GRID_MAX_ROW) {
      state.grid[row + 1][col].isWall = true;
    } else {
      state.grid[row][col - 1].isWall = true;
    }
    return;
  }
  if (row === GRID_MAX_ROW - 1) {
    if (col - 1 >= 0) {
      state.grid[row][col - 1].isWall = true;
    } else {
      state.grid[row - 1][col].isWall = true;
    }
    return;
  }
  if (row - 1 !== 0) {
    state.grid[row - 1][0].isWall = true;
  }
  if (row === 1 && col === 0) {
    state.status = "generating walls";
  }
};
