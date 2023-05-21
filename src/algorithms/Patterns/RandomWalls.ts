import { GRID_MAX_COL, GRID_MAX_ROW } from "@/Constants";
import { Pos, VisualizerState } from "@/features/Visualizer/visualizerSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export const randomWall = (state: VisualizerState) => {
  state.grid[0][0]._visited = true;
  if (Math.random() < 0.3) {
    if (state.grid[0][0].isStart || state.grid[0][0].isEnd) {
      return;
    }
    state.grid[0][0].isWall = !state.grid[0][0].isWall;
  }
};

export const randomWallNext = (
  state: VisualizerState,
  action: PayloadAction<Pos>
) => {
  const { row, col } = action.payload;
  let _row = row;
  let _col = col + 1;
  if (_col >= GRID_MAX_COL) {
    _col = 0;
    _row += 1;
  }
  if (state.grid[_row] !== undefined && state.grid[_row][_col] !== undefined) {
    state.grid[_row][_col]._visited = true;
    if (Math.random() < 0.3) {
      if (state.grid[_row][_col].isStart || state.grid[_row][_col].isEnd) {
        return;
      }
      state.grid[_row][_col].isWall = !state.grid[_row][_col].isWall;
    }
  }
  if (row === GRID_MAX_ROW - 1 && col === GRID_MAX_COL - 1) {
    state.status = "idle";
    state.grid.forEach((row) => {
      row.forEach((node) => {
        node._visited = false;
      });
    });
  }
};
