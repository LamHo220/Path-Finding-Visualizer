import { TNode, VisualizerState } from "@/features/Visualizer";
import { PayloadAction } from "@reduxjs/toolkit";

export const getPath = (node: TNode, state: VisualizerState) => {
  let ptr: TNode | undefined = node;
  while (ptr !== undefined) {
    state.solution.unshift(ptr);
    if (ptr.isStart) {
      ptr.isPath = true;
    }
    ptr = ptr.parent;
  }
};

export const distance = (A: TNode, B: TNode) => {
  const Acol = A.pos.col;
  const Bcol = B.pos.col;
  const Arow = A.pos.row;
  const Brow = B.pos.row;

  return Math.sqrt(Math.pow(Acol - Bcol, 2) + Math.pow(Arow - Brow, 2));
};

export const getNeighbours = (node: TNode, state: VisualizerState) => {
  const maxRow = state.grid.length;
  const maxCol = state.grid[0].length;

  let res = [];
  let {
    pos: { row, col },
  } = node;

  if (row - 1 >= 0) res.push(state.grid[row - 1][col]);
  // down
  if (row + 1 < maxRow) res.push(state.grid[row + 1][col]);
  // left
  if (col - 1 >= 0) res.push(state.grid[row][col - 1]);
  // right
  if (col + 1 < maxCol) res.push(state.grid[row][col + 1]);
  // diagonal
  if (state.allowDiagonal) {
    // up left
    if (row - 1 >= 0 && col - 1 >= 0) res.push(state.grid[row - 1][col - 1]);
    // down right
    if (row + 1 < maxRow && col + 1 < maxCol)
      res.push(state.grid[row + 1][col + 1]);
    // down left
    if (row + 1 < maxRow && col - 1 >= 0)
      res.push(state.grid[row + 1][col - 1]);
    // up right
    if (row - 1 >= 0 && col + 1 < maxCol)
      res.push(state.grid[row - 1][col + 1]);
  }

  return res;
};

// swap node with prev node (moving start / end node)
export const swap = (state: VisualizerState, action: PayloadAction<TNode>) => {
  const _node = action.payload;
  const node = state.grid[_node.pos.row][_node.pos.col];
  const _prev = state.prev;
  if (!_prev) {
    return;
  }
  const next = state.grid[_prev.pos.row][_prev.pos.col];
  node.isStart = _prev.isStart;
  node.isEnd = _prev.isEnd;

  next.isStart = false;
  next.isEnd = false;
  state.prev = node;
};

export const resetSearching = (state: VisualizerState) => {
  state.solution = [];
  state.frontier = [];
  state.exploredLength = 0;
  state.pathLength = 0;
  state.grid.forEach((e) => {
    e.forEach((f) => {
      f.g = Infinity;
      f.f = Infinity;
      f.isPath = false;
      f.visited = false;
      f._visited = false;
      f.parent = undefined;
    });
  });
};
