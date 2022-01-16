import { rand, changeClassName, delay, isHorizontalCut } from "../misc/misc";

const Kruskal = async (dark, grid, maxRow, maxCol, duration) => {
  let closed = [];
  let groups = new Map();
  let idx = 0;
  let bound = [];

  for (let j = 0; j < maxCol; ++j) {
    let node = grid[0][j];
    if (!(node.isStart || node.isEnd)) {
      node.idx = idx;
      bound.push(node);
    }
    node = grid[maxRow - 1][j];
    if (!(node.isStart || node.isEnd)) {
      node.idx = idx;
      bound.push(node);
    }
  }

  for (let i = 0; i < maxRow; ++i) {
    let node = grid[i][0];
    if (!(node.isStart || node.isEnd)) {
      node.idx = idx;
      bound.push(node);
    }
    node = grid[i][maxCol - 1];
    if (!(node.isStart || node.isEnd)) {
      node.idx = idx;
      bound.push(node);
    }
  }
  closed = closed.concat(bound);
  groups.set(idx++, bound);
  for (let i = 2; i < maxRow - 2; i += 2) {
    for (let j = 2; j < maxCol - 2; j += 2) {
      const node = grid[i][j];
      if (!(node.isStart || node.isEnd)) {
        node.idx = idx;
        closed.push(node);
        groups.set(idx++, [node]);
      }
    }
  }

  for (let i = 1; i < maxRow - 1; i += 2) {
    for (let j = 1; j < maxCol - 1; j += 2) {
      const node = grid[i][j];
      if (!(node.isStart || node.isEnd)) {
        closed.push(node);
      }
    }
  }

  let open = grid.flat().filter((e) => !closed.includes(e));
  while (open.length!==0) {
    const isHorizontal = isHorizontalCut(0, 0);
    const node = open[rand(0, open.length - 1)];
    open = open.filter((e) => e !== node);
    if (isHorizontal) {
      const nodeA = grid[node.row][node.col - 1];
      const nodeB = grid[node.row][node.col + 1];
      if (!(await combineGroup(dark, node, nodeA, nodeB, groups, duration))) {
        const nodeA = grid[node.row - 1][node.col];
        const nodeB = grid[node.row + 1][node.col];
        await combineGroup(dark, node, nodeA, nodeB, groups, duration);
      }
    } else {
      const nodeA = grid[node.row - 1][node.col];
      const nodeB = grid[node.row + 1][node.col];
      if (!(await combineGroup(dark, node, nodeA, nodeB, groups, duration))) {
        const nodeA = grid[node.row][node.col - 1];
        const nodeB = grid[node.row][node.col + 1];
        await combineGroup(dark, node, nodeA, nodeB, groups, duration);
      }
    }
  }
};

const combineGroup = async (dark, node, nodeA, nodeB, groups, duration) => {
  if (nodeA.idx === nodeB.idx) {
    return false;
  }
  let set1 = groups.get(nodeA.idx);
  let set2 = groups.get(nodeB.idx);
  groups.delete(nodeB.idx);
  for (let i = 0; i < set2.length; ++i) {
    set2[i].idx = nodeA.idx;
  }
  groups.set(nodeA.idx, set1.concat(set2));
  node.idx = nodeA.idx;
  if (!(node.isStart || node.isEnd)) {
    node.isWall = true;
  }
  if (!(nodeA.isStart || nodeA.isEnd)) {
    nodeA.isWall = true;
  }
  if (!(nodeB.isStart || nodeB.isEnd)) {
    nodeB.isWall = true;
  }
  changeClassName(dark,node);
  changeClassName(dark,nodeB);
  changeClassName(dark,nodeA);
  await delay(5 * duration);
  return true;
};

export default Kruskal;
