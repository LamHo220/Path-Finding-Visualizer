import Heuristics from "@/algorithms/Searching/Heuristics";
import {
  TRecursizeDivision,
  initRecursizeDivision,
} from "@/algorithms/Patterns/RecursiveDivision";
import _generateWall from "@/algorithms/Patterns/generate";
import _generateWallNext from "@/algorithms/Patterns/next";
import { comparePos } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { GRID_MAX_COL, GRID_MAX_ROW } from "@/Constants";

export interface TNode {
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  pos: Pos;
  visited: boolean;
  _visited: boolean;
  inQueue: boolean;
  parent?: TNode;
  g: number;
  f: number;
  weight: number;
  isBoundary: boolean;
}

export type Pos = { row: number; col: number };

export type Grid = Array<Array<TNode>>;

export type Status =
  | "idle"
  | "searching"
  | "answering"
  | "answered"
  | "paused"
  | "generating walls"
  | "cutting"
  | "cutted"
  | "horizontal cutting"
  | "vertical cutting"
  | "reversed"
  | "removing walls"
  | "removing walls II"
  | "generating boundary";
export type Algorithm = "A*" | "Dijkstra";
export type Heuristic = "Euclidean" | "Octile" | "Chebyshev" | "Manhattan";
export type Pattern =
  | "No Walls"
  | "Simple Random Walls"
  | "Recursive Division"
  | "Prim's Algorithm"
  | "Kruskal's Algorithm"
  | "Recursive Backtracking";

export type Algorithms = { name: Algorithm; description: string }[];
export type Heuristics = { name: Heuristic; description: string }[];
export type Patterns = { name: Pattern; description: string }[];

export const algorithms: Algorithms = [
  {
    name: "A*",
    description: "description of A*",
  },
  {
    name: "Dijkstra",
    description: "description of Dijkstra",
  },
];

export const patterns: Patterns = [
  { name: "No Walls", description: "description of No Walls" },
  {
    name: "Simple Random Walls",
    description: "description of Simple Random Walls",
  },
  {
    name: "Recursive Division",
    description: "description of Recursive Division",
  },
  { name: "Prim's Algorithm", description: "description of Prim's Algorithm" },
  {
    name: "Kruskal's Algorithm",
    description: "description of Kruskal's Algorithm",
  },
  {
    name: "Recursive Backtracking",
    description: "description of Recursive Backtracking",
  },
];

export const heuristics: Heuristics = [
  { name: "Euclidean", description: "description of Euclidean" },
  { name: "Manhattan", description: "description of Manhattan" },
  { name: "Octile", description: "description of Octile" },
  { name: "Chebyshev", description: "description of Chebyshev" },
];

export interface VisualizerState {
  exploredLength: number;
  pathLength: number;
  grid: Grid;
  status: Status;
  prev?: TNode;
  algorithm: Algorithm;
  heuristic: Heuristic;
  pattern: Pattern;
  isBidirectional: boolean;
  allowDiagonal: boolean;
  isWeighted: boolean;
  frontier: TNode[];
  solution: TNode[];
  animationSpeed: 10 | 100 | 500;
  RDParam: TRecursizeDivision;
  primStarted: boolean;
  memo: TRecursizeDivision[];
}

const initStartNode: TNode = {
  isStart: true,
  isEnd: false,
  isWall: false,
  isPath: false,
  _visited: false,
  g: Infinity,
  visited: false,
  weight: 0,
  inQueue: false,
  f: Infinity,
  isBoundary: true,
  pos: { row: Math.floor(GRID_MAX_ROW / 2), col: Math.floor(GRID_MAX_COL / 5) },
};

const initEndNode: TNode = {
  isStart: false,
  isEnd: true,
  isWall: false,
  isPath: false,
  _visited: false,
  g: Infinity,
  visited: false,
  weight: 0,
  inQueue: false,
  f: Infinity,
  isBoundary: true,
  pos: {
    row: Math.floor(GRID_MAX_ROW / 2),
    col: Math.floor((4 * GRID_MAX_COL) / 5),
  },
};

const initGrid = Array(GRID_MAX_ROW)
  .fill(0)
  .map((_, i) =>
    Array(GRID_MAX_COL)
      .fill(0)
      .map((_, j) => ({
        pos: { row: i, col: j },
        isStart: comparePos(initStartNode, i, j),
        isEnd: comparePos(initEndNode, i, j),
        isPath: false,
        g: Infinity,
        visited: false,
        _visited: false,
        weight: 0,
        inQueue: false,
        f: Infinity,
        isBoundary: true,
        isWall: false,
        isHole: false,
      }))
  );

const initialState: VisualizerState = {
  exploredLength: 0,
  pathLength: 0,
  grid: initGrid,
  status: "idle",
  algorithm: "A*",
  pattern: "No Walls",
  heuristic: "Manhattan",
  isBidirectional: false,
  allowDiagonal: false,
  isWeighted: false,
  frontier: [],
  solution: [],
  animationSpeed: 10,
  RDParam: initRecursizeDivision,
  primStarted: false,
  memo: [],
};

export const visualizerSlice = createSlice({
  name: "visualizer",
  initialState,
  reducers,
});

export const getNode = (state: VisualizerState, ownProps: Pos) =>
  state.grid[ownProps.row][ownProps.col];

export const {
  setPrev,
  setExploredLength,
  setPathLength,
  setVisualizeStatus,
  changeAlgorithm,
  changeHeuristic,
  changePattern,
  setIsBirectional,
  setAllowDiagonal,
  setIsWeighted,
  startVisualizeSearchingAlgo,
  nextStateOfSearchingAlgo,
  setStatus,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  nextOfSolution,
  setVisited,
  setPath,
  setGrid,
  setAnimationSpeed,
  generateWall,
  generateWallNext,
  generateBoundary,
  generateBoundaryNext,
} = visualizerSlice.actions;

export default visualizerSlice.reducer;
