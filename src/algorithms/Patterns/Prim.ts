import { TNode, VisualizerState } from "@/features/Visualizer/visualizerSlice";
import { rand } from "../Searching/uttils";
import { GRID_MAX_COL, GRID_MAX_ROW, colDir, rowDir } from "@/Constants";

export const Prim = (state: VisualizerState) => {
  state.primStarted = false;
  const row = Math.floor(rand(GRID_MAX_ROW / 3, GRID_MAX_ROW - 2) / 2) * 2 + 1;
  const col = Math.floor(rand(GRID_MAX_COL / 2, GRID_MAX_COL - 2) / 2) * 2 + 1;

  state.frontier = [state.grid[row][col]];
  state.grid[row][col]._visited = true;
  state.status = "removing walls";
};

export const PrimNext = (state: VisualizerState) => {
  if (state.frontier.length === 0) {
    state.grid.forEach((e) =>
      e.forEach((f) => {
        f.inQueue = false;
        if (f.isStart || f.isEnd) {
          f.isWall = false;
        }
      })
    );
    return;
  }
  const i = rand(0, state.frontier.length - 1);
  const current = state.frontier[i];
  state.frontier = state.frontier.filter((e) => e !== current);
  if (state.primStarted) {
    connectTwoNode(current, state);
  }
  const crow = current.pos.row;
  const ccol = current.pos.col;
  state.grid[crow][ccol].isWall = false;

  // get the allowed direction of current.
  const dir = getPrimDir(current, state);
  if (dir.length !== 0) {
    for (let direction of dir) {
      const col = ccol + colDir[direction] * 2;
      const row = crow + rowDir[direction] * 2;

      // add new node to queue
      state.frontier.push(state.grid[row][col]);
    }
  }
  state.primStarted = true;
  if (state.status === "removing walls"){
    state.status = "removing walls II"
  } else {
    state.status = "removing walls"
  }
};

const connectTwoNode = (toNode: TNode, state: VisualizerState) => {
  let toRow = toNode.pos.row;
  let toCol = toNode.pos.col;
  let fromNode;
  let fromArr = [];
  let tempNode;
  if (toRow - 2 >= 0) {
    tempNode = state.grid[toRow - 2][toCol];
    if (!tempNode.isWall) fromArr.push(tempNode);
  }
  if (toRow + 2 < GRID_MAX_ROW) {
    tempNode = state.grid[toRow + 2][toCol];
    if (!tempNode.isWall) fromArr.push(tempNode);
  }
  if (toCol + 2 < GRID_MAX_COL) {
    tempNode = state.grid[toRow][toCol + 2];
    if (!tempNode.isWall) fromArr.push(tempNode);
  }
  if (toCol - 2 >= 0) {
    tempNode = state.grid[toRow][toCol - 2];
    if (!tempNode.isWall) fromArr.push(tempNode);
  }
  fromNode = fromArr[rand(0, fromArr.length - 1)];
  let fromRow = fromNode.pos.row;
  let fromCol = fromNode.pos.col;
  let next;
  if (toRow - fromRow === 2) {
    // South
    next = state.grid[fromRow + 1][fromCol];
  } else if (toCol - fromCol === 2) {
    // East
    next = state.grid[fromRow][fromCol + 1];
  } else if (toRow - fromRow === -2) {
    // North
    next = state.grid[fromRow - 1][fromCol];
  } else if (toCol - fromCol === -2) {
    // West
    next = state.grid[fromRow][fromCol - 1];
  }
  if (!next) {
    console.warn("next node is undefined");
    return;
  }
  state.grid[next.pos.row][next.pos.col].isWall = false;
  state.grid[toNode.pos.row][toNode.pos.col].isWall = false;
};

const getPrimDir = (node: TNode, state: VisualizerState) => {
  let row = node.pos.row;
  let col = node.pos.col;
  let result: ("N" | "E" | "S" | "W")[] = [];
  let next;
  if (row - 2 >= 0) {
    next = state.grid[row - 2][col];
    if (next.isWall) {
      state.grid[next.pos.row][next.pos.col].inQueue = true;
      result.push("N");
    }
  }
  if (row + 2 < GRID_MAX_ROW) {
    next = state.grid[row + 2][col];
    if (next.isWall) {
      state.grid[next.pos.row][next.pos.col].inQueue = true;
      result.push("S");
    }
  }
  if (col + 2 < GRID_MAX_COL) {
    next = state.grid[row][col + 2];
    if (next.isWall) {
      state.grid[next.pos.row][next.pos.col].inQueue = true;
      result.push("E");
    }
  }
  if (col - 2 >= 0) {
    next = state.grid[row][col - 2];
    if (next.isWall) {
      state.grid[next.pos.row][next.pos.col].inQueue = true;
      result.push("W");
    }
  }
  return result;
};
