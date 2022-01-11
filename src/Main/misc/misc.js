import aStar from "../Algorithms/PathFinding/AStar";
import dijkstra from "../Algorithms/PathFinding/Dijkstra";

const rowDir = { N: -1, S: 1, E: 0, W: 0 };
const colDir = { N: 0, S: 0, E: 1, W: -1 };

const changeClassName = async (node, name="", fakeIsWall=false) => {
  const element = document.getElementById(`${node.row}-${node.col}`);
  element.className = `node ${
    node.isStart
      ? "bg-blue-400 dark:bg-blue-700"
      : node.isEnd
      ? "bg-pink-400  dark:bg-pink-700"
      : fakeIsWall
      ? name
      : node.isWall
      ? "bg-gray-400 dark:bg-gray-700"
      : name
  } border border-gray-200 m-0 p-0 dark:border-gray-700 hover:bg-orange-300`;
};

const clearPath = async (grid) => {
  for (let row of grid) {
    for (let node of row) {
      changeClassName(node);
    }
  }
}

const refresh = async (visitedNodes, shortestPath) => {
  const n = visitedNodes.length;
  for (let i = 0; i < n; ++i) {
    const node = visitedNodes[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(node, "bg-cyan-300 dark:bg-cyan-700");
    }
  }
  const m = shortestPath.length;
  for (let i = 0; i < m; ++i) {
    const node = shortestPath[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(node, "bg-yellow-300 dark:bg-yellow-700");
    }
  }
};

const rand = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

const isHorizontalCut = (width, height) => {
  if (width < height) return true;
  else if (width > height) return false;
  return Math.floor(Math.random() * 2) === 1;
};

const delay = (t)=>{
  return new Promise((resolve, reject) => {
    setTimeout(resolve,t);
  });
}


export {
  changeClassName,
  refresh,
  rand,
  //reverse,
  isHorizontalCut,
  delay,
  clearPath,
  rowDir,
  colDir
};
