const changeClassName = (node, name) => {
  const element = document.getElementById(`${node.row}-${node.col}`);
  element.className = `node ${
    node.isStart
      ? "bg-emerald-400"
      : node.isEnd
      ? "bg-pink-400"
      : node.isWall
      ? "bg-gray-400"
      : name
  } border border-gray-200 m-0 p-0`;
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
          ? "bg-emerald-400"
          : node.isEnd
          ? "bg-pink-400"
          : node.isWall
          ? "bg-gray-400"
          : ""
      } border border-gray-200 m-0 p-0`;
    }
  }
};
export default changeClassName;