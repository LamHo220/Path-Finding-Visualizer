import aStar from "./Algorithms/AStar";
import dijkstra from "./Algorithms/Dijkstra";

const getStartNode = (grid) => {
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart) {
        return node;
      }
    }
  }
};

const visualize = (
  grid,
  algorithm,
  setNumberOfSteps,
  setLengthOfPath,
  duration
) => {
  clearPath(grid);
  const startNode = getStartNode(grid);
  if (algorithm === "A*") {
    let { visitedNodes, shortestPath } = aStar(startNode);
    animate(
      visitedNodes,
      shortestPath,
      setNumberOfSteps,
      setLengthOfPath,
      duration
    );
  } else {
    let { visitedNodes, shortestPath } = dijkstra(startNode);
    animate(
      visitedNodes,
      shortestPath,
      setNumberOfSteps,
      setLengthOfPath,
      duration
    );
  }
};

const animate = async (
  visitedNodes,
  shortestPath,
  setNumberOfSteps,
  setLengthOfPath,
  duration
) => {
  await animateVisitedNodes(visitedNodes, setNumberOfSteps, duration);
  await animateShortestPath(shortestPath, setLengthOfPath, duration);
  return;
};

const animateVisitedNodes = (path, setNumberOfSteps, duration) => {
  return new Promise((resolve) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        if (!(node.isStart || node.isEnd)) {
          changeClassName(
            node,
            "bg-cyan-300 transition ease-in-out delay-150 hover:scale-125 duration-30"
          );
        }
        setNumberOfSteps(i);
      }, duration * i);
    }
    setTimeout(resolve, duration * path.length);
  });
};

const animateShortestPath = (path, setLengthOfPath, duration) => {
  return new Promise((resolve) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        if (!(node.isStart || node.isEnd)) {
          changeClassName(
            node,
            "bg-yellow-300 transition ease-in-out delay-150 hover:scale-125 duration-30"
          );
        }
        setLengthOfPath(i);
      }, duration * i);
    }
    setTimeout(resolve, duration * path.length);
  });
};

const changeClassName = (node, name) => {
  console.log(123)
  const element = document.getElementById(`${node.row}-${node.col}`);
  element.className = `node ${
    node.isStart
      ? "bg-sky-300"
      : node.isEnd
      ? "bg-pink-300"
      : node.isWall
      ? "bg-gray-400"
      : name
  } border border-gray-200 m-0 p-0`;
};

const clearPath = (grid) => {
  for (let row of grid) {
    for (let node of row) {
      document.getElementById(`${node.row}-${node.col}`).className = `node ${
        node.isStart
          ? "bg-sky-300"
          : node.isEnd
          ? "bg-pink-300"
          : node.isWall
          ? "bg-gray-400"
          : "transition ease-in-out delay-150 hover:scale-125 duration-300"
      } border border-gray-200 m-0 p-0`;
    }
  }
};

const clearBoard = (grid) => {
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart || node.isEnd) {
        continue;
      }
      node.isWall = false;
      document.getElementById(`${node.row}-${node.col}`).className = `node ${
        node.isStart
          ? "bg-sky-300"
          : node.isEnd
          ? "bg-pink-300"
          : node.isWall
          ? "bg-gray-400"
          : "transition ease-in-out delay-150 hover:scale-125 duration-300"
      } border border-gray-200 m-0 p-0`;
    }
  }
};
export default visualize;