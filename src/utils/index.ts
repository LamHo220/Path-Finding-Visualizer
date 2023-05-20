import { TNode } from "@/features/Visualizer/visualizerSlice";

export const compare = (A: TNode, B: TNode) => {
  return A.pos.row === B.pos.row && A.pos.col === B.pos.col;
};

export const comparePos = (A: TNode, row: number, col: number) => {
  return A.pos.row === row && A.pos.col === col;
};
