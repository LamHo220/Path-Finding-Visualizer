const rowDir = { N: -1, S: 1, E: 0, W: 0 };
const colDir = { N: 0, S: 0, E: 1, W: -1 };

const changeClassName = async (dark, node, name="", fakeIsWall=false) => {
  const element = document.getElementById(`${node.row}-${node.col}`);
  element.className = `node ${
    node.isStart
      ? (!dark?"bg-blue-400":"bg-blue-700")
      : node.isEnd
      ? (!dark?"bg-pink-400":"bg-pink-700")
      : fakeIsWall
      ? name
      : node.isWall
      ? (!dark?"bg-gray-400":"bg-gray-600")+ " fade-in"
      : name + " hover:bg-orange-300"
  } border ${!dark?"border-gray-200":"border-gray-700"} m-0 p-0  hover:bg-orange-300`;
};

const clearPath = async (dark, grid) => {
  for (let row of grid) {
    for (let node of row) {
      changeClassName(dark, node);
    }
  }
}

const refresh = async (dark, visitedNodes, shortestPath) => {
  const n = visitedNodes.length;
  for (let i = 0; i < n; ++i) {
    const node = visitedNodes[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(dark, node, !dark?"bg-cyan-300":"bg-cyan-700");
    }
  }
  const m = shortestPath.length;
  for (let i = 0; i < m; ++i) {
    const node = shortestPath[i];
    if (!(node.isStart || node.isEnd)) {
      changeClassName(dark, node, !dark?"bg-yellow-300":"bg-yellow-700");
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

const print = (...args) => {
  console.log(...args);
}


export {
  changeClassName,
  refresh,
  rand,
  isHorizontalCut,
  delay,
  clearPath,
  rowDir,
  colDir,
  print
};
