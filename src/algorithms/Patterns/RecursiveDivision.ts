import { VisualizerState } from "@/features/Visualizer/visualizerSlice";
import { rand } from "../Searching/uttils";
import { GRID_MAX_COL, GRID_MAX_ROW } from "@/Constants";

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
  flag: boolean;
}

export const initRecursizeDivision: TRecursizeDivision = {
  fromRow: 1,
  fromCol: 1,
  toRow: GRID_MAX_ROW - 2,
  toCol: GRID_MAX_COL - 2,
  isHorizontal: isHorizontalCut(GRID_MAX_COL, GRID_MAX_ROW),
  wallRow: 0,
  wallCol: 0,
  passRow: 0,
  passCol: 0,
  iter: {
    from: 0,
    to: 0,
    isHorizontal: false,
  },
  flag: false,
};

// status == cutting
export const RecursiveDivision = (state: VisualizerState) => {
  if (state.memo.length === 0 && state.RDParam.flag) {
    state.status = "idle";
    return;
  }

  const param = state.memo.shift();

  const param2 = state.RDParam;

  const { fromRow, fromCol, toRow, toCol, isHorizontal } = param ?? param2;

  if (isHorizontal) {
    if (toCol - fromCol < 2) {
      // state.status = "cutting";
      state.RDParam = {
        ...state.RDParam,
        flag: true,
      };
      RecursiveDivision(state);
      return;
    }

    const wallRow = Math.floor(rand(fromRow + 1, toRow - 1) / 2) * 2;
    const passCol = Math.floor(rand(fromCol, toCol) / 2) * 2 + 1;

    state.RDParam = { ...state.RDParam, wallRow };
    state.RDParam = { ...state.RDParam, passCol };

    state.RDParam = {
      ...state.RDParam,
      iter: {
        from: fromCol,
        to: toCol,
        isHorizontal,
      },
    };

    state.memo.unshift({
      ...state.RDParam,
      fromRow: wallRow + 1,
      fromCol,
      toRow,
      toCol,
      isHorizontal: isHorizontalCut(toCol - fromCol, toRow - wallRow - 1),
    });

    state.memo.unshift({
      ...state.RDParam,
      fromRow,
      fromCol,
      toRow: wallRow - 1,
      toCol,
      isHorizontal: isHorizontalCut(toCol - fromCol, wallRow - 1 - fromRow),
    });
  } else {
    if (toRow - fromRow < 2) {
      // state.status = "cutting";
      state.RDParam = {
        ...state.RDParam,
        flag: true,
      };
      RecursiveDivision(state);
      return;
    }

    const wallCol = Math.floor(rand(fromCol + 1, toCol - 1) / 2) * 2;
    const passRow = Math.floor(rand(fromRow, toRow) / 2) * 2 + 1;

    state.RDParam = { ...state.RDParam, wallCol };
    state.RDParam = { ...state.RDParam, passRow };

    state.RDParam = {
      ...state.RDParam,
      iter: {
        from: fromRow,
        to: toRow,
        isHorizontal,
      },
    };
    state.memo.unshift({
      ...state.RDParam,
      fromRow,
      fromCol: wallCol + 1,
      toRow,
      toCol,
      isHorizontal: isHorizontalCut(toCol - wallCol - 1, toRow - fromRow),
    });
    state.memo.unshift({
      ...state.RDParam,
      fromRow,
      fromCol,
      toRow,
      toCol: wallCol - 1,
      isHorizontal: isHorizontalCut(wallCol - 1 - fromCol, toRow - fromRow),
    });
  }
  state.status = "cutting";
  Cut(state);
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
  const { wallRow, passCol } = state.RDParam;
  if (from <= to) {
    const node = state.grid[wallRow][from];
    state.grid[wallRow][from].isBoundary = false;
    if (from === passCol) {
      state.RDParam = {
        ...state.RDParam,
        iter: { ...state.RDParam.iter, from: from + 1 },
      };
      return;
    }
    state.grid[wallRow][from].isWall = !(node.isStart || node.isEnd);
    state.RDParam = {
      ...state.RDParam,
      iter: { ...state.RDParam.iter, from: from + 1 },
    };
  } else {
    state.status = "cutted";
  }
};

const VerticalCut = (state: VisualizerState) => {
  const { from, to } = state.RDParam.iter;
  const { wallCol, passRow } = state.RDParam;
  if (from <= to) {
    const node = state.grid[from][wallCol];
    state.grid[from][wallCol].isBoundary = false;
    if (from === passRow) {
      state.RDParam = {
        ...state.RDParam,
        iter: { ...state.RDParam.iter, from: from + 1 },
      };
      return;
    }
    state.grid[from][wallCol].isWall = !(node.isStart || node.isEnd);
    state.RDParam = {
      ...state.RDParam,
      iter: { ...state.RDParam.iter, from: from + 1 },
    };
  } else {
    state.status = "cutted";
  }
};
