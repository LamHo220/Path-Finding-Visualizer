import { PayloadAction } from "@reduxjs/toolkit";
import { Algorithm, Heuristic, Pattern, Pos, Status, TNode, VisualizerState } from "../visualizerSlice";
import AStar, { AStarNext } from "@/algorithms/Searching/AStar";
import { clearWall } from "@/algorithms/Patterns/utils";
import Dijkstra, { DijkstraNext } from "@/algorithms/Searching/Dijkstra";
import { swap } from "@/algorithms/Searching/uttils";
import _generateWall from "@/algorithms/Patterns/generate";
import _generateWallNext from "@/algorithms/Patterns/next";
import { _generateBoundary, _generateBoundaryNext } from "@/algorithms/Patterns/Boundary";

export default {
  // set the prev node
  setPrev: (state:VisualizerState, action: PayloadAction<TNode | undefined>) => {
    state.prev = action.payload;
  },
  // set the length of explored nodes (Array)
  setExploredLength: (state:VisualizerState, action: PayloadAction<number>) => {
    state.exploredLength = action.payload;
  },
  // set the length of final path (Array)
  setPathLength: (state:VisualizerState, action: PayloadAction<number>) => {
    state.pathLength = action.payload;
  },
  // set the status of visualizer
  setVisualizeStatus: (state:VisualizerState, action: PayloadAction<Status>) => {
    if (state.status === action.payload) {
      console.warn("status equals to action payload");
    }
    state.status = action.payload;
  },
  changeAlgorithm: (state:VisualizerState, action: PayloadAction<Algorithm>) => {
    state.algorithm = action.payload;

    if (state.status === "answered") {
      state.status = "searching";
      AStar(state);
    }
  },
  changeHeuristic: (state:VisualizerState, action: PayloadAction<Heuristic>) => {
    state.heuristic = action.payload;

    if (state.status === "answered") {
      state.status = "searching";
      AStar(state);
    }
  },
  changePattern: (state:VisualizerState, action: PayloadAction<Pattern>) => {
    clearWall(state);
    state.pattern = action.payload;
    if (state.pattern === "No Walls") {
      return;
    }
    state.status = "generating walls";
  },
  setIsBirectional: (state:VisualizerState, action: PayloadAction<boolean>) => {
    state.isBidirectional = action.payload;

    if (state.status === "answered") {
      state.status = "searching";
      AStar(state);
    }
  },
  setAllowDiagonal: (state:VisualizerState, action: PayloadAction<boolean>) => {
    state.allowDiagonal = action.payload;

    if (state.status === "answered") {
      state.status = "searching";
      AStar(state);
    }
  },
  setIsWeighted: (state:VisualizerState, action: PayloadAction<boolean>) => {
    state.isWeighted = action.payload;

    if (state.status === "answered") {
      state.status = "searching";
      AStar(state);
    }
  },
  startVisualizeSearchingAlgo: (state: VisualizerState) => {
    if (state.algorithm === "A*") {
      AStar(state);
    } else if (state.algorithm === "Dijkstra") {
      Dijkstra(state);
    }
    state.status = "searching";
  },
  nextStateOfSearchingAlgo: (state: VisualizerState) => {
    if (state.algorithm === "A*") {
      AStarNext(state);
    } else if (state.algorithm === "Dijkstra") {
      DijkstraNext(state);
    }
  },
  setStatus: (state:VisualizerState, action: PayloadAction<Status>) => {
    state.status = action.payload;
  },
  handleMouseDown: (state:VisualizerState, action: PayloadAction<TNode>) => {
    const node = action.payload;
    state.prev = node;
    if (!(node.isStart || node.isEnd)) {
      state.grid[node.pos.row][node.pos.col].isWall =
        !state.grid[node.pos.row][node.pos.col].isWall;
    }
  },
  handleMouseEnter: (state:VisualizerState, action: PayloadAction<TNode>) => {
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
  handleMouseUp: (state: VisualizerState) => {
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
  nextOfSolution: (state: VisualizerState) => {
    const node = state.solution.shift();
    if (node) {
      state.grid[node.pos.row][node.pos.col].isPath = true;
      state.pathLength += 1;
    }
    if (state.solution.length === 0) {
      state.status = "answered";
    }
  },
  setVisited: (state:VisualizerState, action: PayloadAction<Pos>) => {
    const pos = action.payload;
    state.grid[pos.row][pos.col].visited = true;
  },
  setPath: (state:VisualizerState, action: PayloadAction<Pos>) => {
    const pos = action.payload;
    state.grid[pos.row][pos.col].isPath = true;
  },
  setGrid: (state: VisualizerState) => {
    if (state.isWeighted) {
      state.grid.forEach((e) => {
        e.forEach((f) => {
          f.weight = Math.floor(Math.random() * 10 + 1);
        });
      });
    } else {
      state.grid.forEach((e) => {
        e.forEach((f) => {
          f.weight = 0;
        });
      });
    }
  },
  setAnimationSpeed: (state:VisualizerState, action: PayloadAction<10 | 100 | 500>) => {
    state.animationSpeed = action.payload;
  },
  generateWall: (state: VisualizerState) => {
    _generateWall(state)
  },
  generateWallNext: (state:VisualizerState, action: PayloadAction<Pos>) => {
    _generateWallNext(state,action)
  },
  generateBoundary: (state: VisualizerState) => {
    _generateBoundary(state);
  },
  generateBoundaryNext: (state:VisualizerState, action: PayloadAction<Pos>) => {
    _generateBoundaryNext(state, action);
  },
}