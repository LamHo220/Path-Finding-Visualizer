import React, { useState, useEffect } from "react";
import Node from "./Node";
import visualize from "./Handler";

const Grid = (props) => {
  const style = getComputedStyle(document.body);
  let maxRow = parseInt(style.getPropertyValue("--max-row"));
  let maxCol = parseInt(style.getPropertyValue("--max-col"));
  let startRow = parseInt(style.getPropertyValue("--node-start-row"));
  let startCol = parseInt(style.getPropertyValue("--node-start-col"));
  let endRow = parseInt(style.getPropertyValue("--node-end-row"));
  let endCol = parseInt(style.getPropertyValue("--node-end-col"));

  let {
    allowDiagonal,
    heuristic,
    heuristics,
    start,
    algorithm,
    setSteps,
    setPathLength,
    duration,
  } = props;
  let [grid, setGrid] = useState([]);
  let [prev, setPrev] = useState(null);

  const heuristicFunction = (row1, col1, row2, col2, h) => {
    let dx = Math.abs(col1 - col2);
    let dy = Math.abs(row1 - row2);
    //The Manhattan Distance Heuristic
    if (h === "Manhattan") return dx + dy;
    // let D = 1;
    // let D2 = Math.SQRT2;
    // return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);

    // The Euclidean Distance Heuristic is slower but more accurate as it cover more area
    if (h === "Euclidean") return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  };

  const createNode = (row, col) => {
    return {
      col: col,
      row: row,
      isStart: row === startRow && col === startCol,
      isEnd: row === endRow && col === endCol,
      isWall: false,
      previous: null,
      g: Infinity,
      h: heuristicFunction(col, endCol, row, endRow, heuristic),
      f: Infinity,
      neighbors: [],
    };
  };

  const handleMouseDown = (event, row, col) => {
    const initNode = grid[row][col];
    if (!(initNode.isStart || initNode.isEnd)) {
      event = event || window.event;
      event.preventDefault();
      setPrev(!initNode.isWall);

      initNode.isWall = !initNode.isWall;
      setGrid(grid);
      const row = initNode.row;
      const col = initNode.col;
      if (initNode.isWall) {
        document.getElementById(`${row}-${col}`).className =
          "node bg-gray-400 border border-grey-200 m-0 p-0";
      } else {
        document.getElementById(`${row}-${col}`).className =
          "node border border-gray-200 m-0 p-0";
      }
    } else {
      setPrev(initNode);
    }
  };

  const handleMouseEnter = (event, row, col) => {
    event = event || window.event;
    event.preventDefault();
    const node = grid[row][col];
    if (!(node.isStart || node.isEnd) && !node.isWall === prev) {
      event = event || window.event;
      event.preventDefault();
      node.isWall = prev;
      const row = node.row;
      const col = node.col;
      if (node.isWall) {
        document.getElementById(`${row}-${col}`).className =
          "node bg-gray-400 border border-grey-200 m-0 p-0";
      } else {
        document.getElementById(`${row}-${col}`).className =
          "node border border-gray-200 m-0 p-0";
      }
      setGrid(grid);
    } else if (node.isWall === prev) {
      // pass
    } else if (node.isStart || node.isEnd) {
      // pass
    } else if (prev !== null && !node.isWall) {
      // swap two node
      node.isStart = prev.isStart;
      node.isEnd = prev.isEnd;
      prev.isStart = false;
      prev.isEnd = false;

      setPrev(node);
      setGrid(grid);
    }
  };

  const handleMouseUp = () => {
    setPrev(null);
  };

  useEffect(() => {
    let nodes = [];
    for (let row = 0; row < maxRow; ++row) {
      const cur = [];
      for (let col = 0; col < maxCol; ++col) {
        cur.push(createNode(row, col));
      }
      nodes.push(cur);
    }
    setGrid(nodes);
  }, []);

  const setNeightbours = () => {
    for (let row = 0; row < maxRow; ++row) {
      for (let col = 0; col < maxCol; ++col) {
        grid[row][col].neighbors = [];
        let neighbors = grid[row][col].neighbors;
        // up
        if (row - 1 >= 0) neighbors.push(grid[row - 1][col]);
        // down
        if (row + 1 < maxRow) neighbors.push(grid[row + 1][col]);
        // left
        if (col - 1 >= 0) neighbors.push(grid[row][col - 1]);
        // right
        if (col + 1 < maxCol) neighbors.push(grid[row][col + 1]);
        // diagonal
        if (allowDiagonal) {
          // up left
          if (row - 1 >= 0 && col - 1 >= 0)
            neighbors.push(grid[row - 1][col - 1]);
          // down right
          if (row + 1 < maxRow && col + 1 < maxCol)
            neighbors.push(grid[row + 1][col + 1]);
          // down left
          if (row + 1 < maxRow && col - 1 >= 0)
            neighbors.push(grid[row + 1][col - 1]);
          // up right
          if (row - 1 >= 0 && col + 1 < maxCol)
            neighbors.push(grid[row - 1][col + 1]);
        }
      }
    }
  };

  useEffect(() => {
    console.log(12313);
  }, [grid]);

  if (start) {
    console.log(algorithm, duration);
    visualize(grid, algorithm, setSteps, setPathLength, duration);
  }

  return (
    <div className="px-5 relative sgrid">
      {grid.map((row, y) => {
        return row.map((node, x) => {
          const { isStart, isEnd, isWall } = node;
          return (
            <Node
              row={y}
              col={x}
              isWall={isWall}
              isStart={isStart}
              isEnd={isEnd}
              id={y + "-" + x}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
              onMouseUp={handleMouseUp}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
