import AStar, { AStarNext } from "@/algorithms/AStar";
import Dijkstra, { DijkstraNext } from "@/algorithms/Dijkstra";
import Heuristics from "@/algorithms/Heuristics";
import { clearWall, randomWall } from "@/algorithms/Patterns";
import { swap } from "@/algorithms/uttils";
import { comparePos } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TNode {
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isPath: boolean;
  pos: Pos;
  visited: boolean;
  _visited: boolean;
  parent?: TNode;
  g: number;
  f: number;
  weight: number;
}

export type Pos = { row: number; col: number };

export type Grid = Array<Array<TNode>>;

export type Status = "idle" | "searching" | "answering" | "answered" | "paused";
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
  f: Infinity,
  pos: { row: 10, col: 10 },
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
  f: Infinity,
  pos: { row: 10, col: 40 },
};

const initGrid = Array(20)
  .fill(0)
  .map((_, i) =>
    Array(50)
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
        f: Infinity,
        isWall: false,
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
};

export const visualizerSlice = createSlice({
  name: "visualizer",
  initialState,
  reducers: {
    // add a new wall or remove a wall
    setWall: (state, action: PayloadAction<Pos>) => {
      const { row, col } = action.payload;
      state.grid[row][col].isWall = !state.grid[row][col].isWall;
    },
    // set the prev node
    setPrev: (state, action: PayloadAction<TNode | undefined>) => {
      state.prev = action.payload;
    },
    // set the length of explored nodes (Array)
    setExploredLength: (state, action: PayloadAction<number>) => {
      state.exploredLength = action.payload;
    },
    // set the length of final path (Array)
    setPathLength: (state, action: PayloadAction<number>) => {
      state.pathLength = action.payload;
    },
    // set the status of visualizer
    setVisualizeStatus: (state, action: PayloadAction<Status>) => {
      if (state.status === action.payload) {
        console.warn("status equals to action payload");
      }
      state.status = action.payload;
    },
    changeAlgorithm: (state, action: PayloadAction<Algorithm>) => {
      state.algorithm = action.payload;
      
      if (state.status === "answered") {
        state.status = "searching";
        AStar(state);
      }
    },
    changeHeuristic: (state, action: PayloadAction<Heuristic>) => {
      state.heuristic = action.payload;
      
      if (state.status === "answered") {
        state.status = "searching";
        AStar(state);
      }
    },
    changePattern: (state, action: PayloadAction<Pattern>) => {
      state.pattern = action.payload;
      clearWall(state);
      if (state.pattern==="Simple Random Walls") {
        randomWall(state);
      }
    },
    setIsBirectional: (state, action: PayloadAction<boolean>) => {
      state.isBidirectional = action.payload;
      
      if (state.status === "answered") {
        state.status = "searching";
        AStar(state);
      }
    },
    setAllowDiagonal: (state, action: PayloadAction<boolean>) => {
      state.allowDiagonal = action.payload;
      
      if (state.status === "answered") {
        state.status = "searching";
        AStar(state);
      }
    },
    setIsWeighted: (state, action: PayloadAction<boolean>) => {
      state.isWeighted = action.payload;
      
      if (state.status === "answered") {
        state.status = "searching";
        AStar(state);
      }
    },
    startVisualizeSearchingAlgo: (state) => {
      if (state.algorithm === "A*") {
        AStar(state);
      } else if (state.algorithm === "Dijkstra") {
        Dijkstra(state);
      }
      state.status = "searching";
    },
    nextStateOfSearchingAlgo: (state) => {
      if (state.algorithm === "A*") {
        AStarNext(state);
      } else if (state.algorithm === "Dijkstra") {
        DijkstraNext(state);
      }
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    handleMouseDown: (state, action: PayloadAction<TNode>) => {
      const node = action.payload;
      state.prev = node;
      if (!(node.isStart || node.isEnd)) {
        state.grid[node.pos.row][node.pos.col].isWall =
          !state.grid[node.pos.row][node.pos.col].isWall;
      }
    },
    handleMouseEnter: (state, action: PayloadAction<TNode>) => {
      const node = action.payload;
      if (state.prev === undefined) {
        return;
      }
      if (
        !state.prev.isStart &&
        !state.prev.isEnd &&
        state.prev.isWall === node.isWall
      ) {
        state.grid[node.pos.row][node.pos.col].isWall =
          !state.grid[node.pos.row][node.pos.col].isWall;
      } else if (
        ((state.prev.isStart && !node.isEnd) ||
          (state.prev.isEnd && !node.isStart)) &&
        !node.isWall
      ) {
        swap(state, action);
      }
    },
    handleMouseUp: (state) => {
      if (!state.prev) {
        state.prev = undefined;
        return;
      }
      state.prev = undefined;

      if (state.status === "answered") {
        state.status = "searching";
        AStar(state);
      }
    },
    nextOfSolution: (state) => {
      const node = state.solution.shift();
      if (node) {
        state.grid[node.pos.row][node.pos.col].isPath = true;
        state.pathLength += 1;
      }
      if (state.solution.length === 0) {
        state.status = "answered";
      }
    },
    setVisited: (state, action: PayloadAction<Pos>) => {
      const pos = action.payload;
      state.grid[pos.row][pos.col].visited = true;
    },
    setPath: (state, action: PayloadAction<Pos>) => {
      const pos = action.payload;
      state.grid[pos.row][pos.col].isPath = true;
    },
    setGrid:(state)=>{
      if (state.isWeighted) {
        state.grid.forEach(e=>{
          e.forEach((f)=>{
            f.weight = Math.floor(Math.random()*10+1)
          })
        })
      }else {
        state.grid.forEach(e=>{
          e.forEach((f)=>{
            f.weight = 0
          })
        })
      }
    },
    setAnimationSpeed: (state,  action: PayloadAction<10 | 100 |500>)=> {
      state.animationSpeed = action.payload
    }
  },
});

export const getNode = (state: VisualizerState, ownProps: Pos) =>
  state.grid[ownProps.row][ownProps.col];

export const {
  setWall,
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
  setAnimationSpeed
} = visualizerSlice.actions;

export default visualizerSlice.reducer;
