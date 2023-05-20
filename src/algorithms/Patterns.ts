import { Pos, VisualizerState } from "@/features/Visualizer";
import { PayloadAction } from "@reduxjs/toolkit";

export const clearWall = (state: VisualizerState) => {
  state.grid.forEach((e) => {
    e.forEach((f) => {
      f.isWall = false;
    });
  });
  state.status = "idle";
};

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
  if (_col >= 50) {
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
  console.log(row, col);
  if (row === 19 && col === 49) {
    state.status = "idle";
    state.grid.forEach((row) => {
      row.forEach((node) => {
        node._visited = false;
      });
    });
  }
};

export const makeBoundary = (state: VisualizerState) => {
  state.grid[0][0].isWall = true;
};

export const makeBoundaryNext = (
  state: VisualizerState,
  action: PayloadAction<Pos>
) => {
  const { row, col } = action.payload;
  if (row === 0 && col === 0) {
    state.grid[0][1].isWall = true;
    return;
  }

  if (row === 0) {
    if (col + 1 < 50) {
      state.grid[row][col + 1].isWall = true;
    } else {
      state.grid[row + 1][col].isWall = true;
    }
    return;
  }
  if (col === 49) {
    if (row + 1 < 20) {
      state.grid[row + 1][col].isWall = true;
    } else {
      state.grid[row][col - 1].isWall = true;
    }
    return;
  }
  if (row === 19) {
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
