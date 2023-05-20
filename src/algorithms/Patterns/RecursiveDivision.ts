import { VisualizerState } from "@/features/Visualizer/visualizerSlice";
import { rand } from "../Searching/uttils";

export const isHorizontalCut = (width: number, height: number) => {
  if (width < height) return true;
  else if (width > height) return false;
  return Math.floor(Math.random() * 2) === 1;
};

type Iter = {
  from: number;
  to: number;
  isHorizontal: boolean;
};
export interface TRecursizeDivision {
  fromRow: number;
  fromCol: number;
  toRow: number;
  toCol: number;
  isHorizontal: boolean;
  wallRow: number;
  wallCol: number;
  passRow: number;
  passCol: number;
  iter: Iter;
  memo: TRecursizeDivision[];
}
export const initRecursizeDivision: TRecursizeDivision = {
  fromRow: 1,
  fromCol: 1,
  toRow: 18,
  toCol: 48,
  isHorizontal: isHorizontalCut(50, 20),
  wallRow: 0,
  wallCol: 0,
  passRow: 0,
  passCol: 0,
  iter: {
    from: 0,
    to: 0,
    isHorizontal: false,
  },
  memo: [],
};

export const RecursiveDivision = (state: VisualizerState) => {
  console.log(state.RDParam.memo.length);
  let param = state.RDParam.memo.shift();
  if (param === undefined) {
    param = state.RDParam;
  }
  const { fromRow, fromCol, toRow, toCol, isHorizontal } = param;

  if (isHorizontal) {
    if (toCol - fromCol < 2) {
      return;
    }
    state.RDParam.wallRow = Math.floor(rand(fromRow + 1, toRow - 1) / 2) * 2;
    state.RDParam.passCol = Math.floor(rand(fromCol, toCol) / 2) * 2 + 1;
    const node = state.grid[state.RDParam.wallRow][fromCol];

    state.status = "horizontal cutting";

    state.RDParam.iter = {
      from: fromCol,
      to: toCol,
      isHorizontal,
    };
    state.grid[state.RDParam.wallRow][fromCol].isWall = !(
      node.isStart || node.isEnd
    );
  } else {
    if (toRow - fromRow < 2) {
      return;
    }
    state.RDParam.wallCol = Math.floor(rand(fromCol + 1, toCol - 1) / 2) * 2;
    state.RDParam.passRow = Math.floor(rand(fromRow, toRow) / 2) * 2 + 1;
    const node = state.grid[state.RDParam.wallRow][fromRow];

    state.status = "vertical cutting";

    state.RDParam.iter = {
      from: fromRow,
      to: toRow,
      isHorizontal,
    };
    state.grid[fromRow][state.RDParam.wallCol].isWall = !(
      node.isStart || node.isEnd
    );
  }
};

export const Cut = (state: VisualizerState) => {
  const { isHorizontal } = state.RDParam.iter;
  if (isHorizontal) {
    HorizontalCut(state);
  } else {
    VerticalCut(state);
  }
};

const HorizontalCut = (state: VisualizerState) => {
  const { from, to } = state.RDParam.iter;
  if (from + 1 <= to) {
    const node = state.grid[state.RDParam.wallRow][from + 1];
    if (from + 1 === state.RDParam.passCol) {
      state.RDParam.iter.from += 1;
      HorizontalCut(state);
      return;
    }
    state.grid[state.RDParam.wallRow][from + 1].isWall = !(
      node.isStart || node.isEnd
    );
    state.RDParam.iter.from += 1;
  } else {
    state.status = "cutting";
    // unshift : top
    // push : bottom
    const { fromCol, toCol, fromRow, toRow, wallRow } = state.RDParam;

    state.RDParam.memo.unshift({
      ...state.RDParam,
      toRow: wallRow - 1,
      isHorizontal: isHorizontalCut(toCol - fromCol, wallRow - 1 - fromRow),
    });
    state.RDParam.memo.push({
      ...state.RDParam,
      fromRow: wallRow + 1,
      isHorizontal: isHorizontalCut(toCol - fromCol, toRow - wallRow - 1),
    });
  }
};

const VerticalCut = (state: VisualizerState) => {
  const { from, to } = state.RDParam.iter;
  const { wallCol, passRow } = state.RDParam;
  if (from + 1 <= to) {
    const node = state.grid[from + 1][wallCol];
    if (from + 1 === passRow) {
      state.RDParam.iter.from += 1;
      VerticalCut(state);
      return;
    }
    state.grid[from + 1][wallCol].isWall = !(node.isStart || node.isEnd);
    state.RDParam.iter.from += 1;
  } else {
    state.status = "cutting";

    // unshift : left
    // push : right
    const { fromCol, toCol, fromRow, toRow, wallCol } = state.RDParam;
    state.RDParam.memo.unshift({
      ...state.RDParam,
      toCol: wallCol - 1,
      isHorizontal: isHorizontalCut(wallCol - 1 - fromCol, toRow - fromRow),
    });
    state.RDParam.memo.push({
      ...state.RDParam,
      fromCol: wallCol + 1,
      isHorizontal: isHorizontalCut(toCol - wallCol - 1, toRow - fromRow),
    });
  }
};
