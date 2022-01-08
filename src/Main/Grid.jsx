import React, { useState, useEffect } from "react";
import Node from "./Node";
import aStar from "./Algorithms/AStar";
import dijkstra from "./Algorithms/Dijkstra";
import {
  changeClassName,
  refresh,
} from "./misc/misc";
import patternVisualize from "./Algorithms/patterns";

const Grid = (props) => {
  const style = getComputedStyle(document.body);
  const [maxRow, setMaxRow] = useState(
    parseInt(style.getPropertyValue("--max-row"))
  );
  const [maxCol, setMaxCol] = useState(
    parseInt(style.getPropertyValue("--max-col"))
  );
  const [startRow, setStartRow] = useState(
    parseInt(style.getPropertyValue("--node-start-row"))
  );
  const [startCol, setStartCol] = useState(
    parseInt(style.getPropertyValue("--node-start-col"))
  );
  const [endRow, setEndRow] = useState(
    parseInt(style.getPropertyValue("--node-end-row"))
  );
  const [endCol, setEndCol] = useState(
    parseInt(style.getPropertyValue("--node-end-col"))
  );
  const [grid, setGrid] = useState([]);
  const [prev, setPrev] = useState(null);
  const [visualized, setVisualized] = useState(false);

  const {
    allowDiagonal,
    heuristic,
    algorithm,
    setSteps,
    setPathLength,
    duration,
    setStart,
  } = props;

  const heuristicFunction = (row1, col1, row2, col2, h) => {
    const dx = Math.abs(col1 - col2);
    const dy = Math.abs(row1 - row2);
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
      h: heuristicFunction(row, col, endRow, endCol, heuristic),
      f: Infinity,
      neighbors: [],
    };
  };

  const handleMouseDown = (event, row, col) => {
    let initNode = grid[row][col];
    if (!(initNode.isStart || initNode.isEnd)) {
      event = event || window.event;
      event.preventDefault();
      setPrev(!initNode.isWall);
      const isWall = grid[row][col].isWall;
      grid[row][col].isWall = !isWall;
      setGrid(grid);
      const initRow = initNode.row;
      const initCol = initNode.col;
      if (initNode.isWall) {
        document.getElementById(`${initRow}-${initCol}`).className =
          "node bg-gray-400 border border-grey-200 m-0 p-0";
      } else {
        document.getElementById(`${initRow}-${initCol}`).className =
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
      grid[row][col].isWall = prev;
      const nrow = node.row;
      const ncol = node.col;
      if (node.isWall) {
        document.getElementById(`${nrow}-${ncol}`).className =
          "node bg-gray-400 border border-grey-200 m-0 p-0";
      } else {
        document.getElementById(`${nrow}-${ncol}`).className =
          "node border border-gray-200 m-0 p-0";
      }
    } else if (node.isWall === prev) {
      // pass
    } else if (node.isStart || node.isEnd) {
      // pass
    } else if (prev !== null && !node.isWall) {
      // swap two node
      grid[row][col].isStart = prev.isStart;
      grid[row][col].isEnd = prev.isEnd;
      prev.isStart = false;
      prev.isEnd = false;
      setPrev(node);
    }
  };

  const handleMouseUp = (row, col) => {
    if (grid[row][col].isStart) {
      setStartCol(col);
      setStartRow(row);
    }
    if (grid[row][col].isEnd) {
      setEndCol(col);
      setEndRow(row);
    }
    setGrid(updateHeuristic(grid.slice()));
    setPrev(null);
  };

  // initialize the grid
  useEffect(() => {
    let nodes = [];
    for (let row = 0; row < maxRow; ++row) {
      const cur = [];
      for (let col = 0; col < maxCol; ++col) {
        cur.push(createNode(row, col));
      }
      nodes.push(cur);
    }
    setGrid(setNeightbours(nodes));
  }, []);

  const setNeightbours = (nodes) => {
    for (let row = 0; row < maxRow; ++row) {
      for (let col = 0; col < maxCol; ++col) {
        nodes[row][col].neighbors = [];
        let neighbors = nodes[row][col].neighbors;
        // up
        if (row - 1 >= 0) neighbors.push(nodes[row - 1][col]);
        // down
        if (row + 1 < maxRow) neighbors.push(nodes[row + 1][col]);
        // left
        if (col - 1 >= 0) neighbors.push(nodes[row][col - 1]);
        // right
        if (col + 1 < maxCol) neighbors.push(nodes[row][col + 1]);
        // diagonal
        if (allowDiagonal) {
          // up left
          if (row - 1 >= 0 && col - 1 >= 0)
            neighbors.push(nodes[row - 1][col - 1]);
          // down right
          if (row + 1 < maxRow && col + 1 < maxCol)
            neighbors.push(nodes[row + 1][col + 1]);
          // down left
          if (row + 1 < maxRow && col - 1 >= 0)
            neighbors.push(nodes[row + 1][col - 1]);
          // up right
          if (row - 1 >= 0 && col + 1 < maxCol)
            neighbors.push(nodes[row - 1][col + 1]);
        }
      }
    }
    return nodes;
  };

  useEffect(() => {
    if (grid != 0) {
      setGrid(setNeightbours(grid));
    }
  }, [props.allowDiagonal]);

  const updateHeuristic = (nodes) => {
    if (nodes === undefined) {
      return [];
    }
    for (let row of nodes) {
      for (let node of row) {
        node.g = Infinity;
        node.f = Infinity;
        node.h = heuristicFunction(
          node.row,
          node.col,
          endRow,
          endCol,
          heuristic
        );
        node.previous = null;
      }
    }
    return setNeightbours(nodes);
  };

  useEffect(() => {
    if (grid.length !== 0) {
      setGrid(updateHeuristic(grid));
    }
  }, [props.heuristic]);

  useEffect(() => {
    if (props.start) {
      const clearPath = async () => {
        // clear path
        for (let row of grid) {
          for (let node of row) {
            document.getElementById(
              `${node.row}-${node.col}`
            ).className = `node ${
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
      setPathLength(0);
      setSteps(0);
      clearPath()
        .then(() => {
          if (algorithm === "A*") {
            return aStar(grid[startRow][startCol]);
          } else if (algorithm === "Dijkstra") {
            return dijkstra(grid[startRow][startCol]);
          }
        })
        .then(({ visitedNodes, shortestPath }) => {
          // visualize visited nodes
          return new Promise((resolve) => {
            const n = visitedNodes.length;
            for (let i = 0; i < n; ++i) {
              const node = visitedNodes[i];
              setTimeout(() => {
                if (!(node.isStart || node.isEnd)) {
                  changeClassName(node, "bg-cyan-300");
                }
                setSteps(i);
              }, 0 * i);
            }
            setTimeout(() => {
              resolve(shortestPath);
            }, 0 * n);
          });
        })
        .then((shortestPath) => {
          // visualize shortest path
          return new Promise((resolve) => {
            const n = shortestPath.length;
            for (let i = 0; i < n; ++i) {
              setTimeout(() => {
                const node = shortestPath[i];
                if (!(node.isStart || node.isEnd)) {
                  changeClassName(node, "bg-yellow-300");
                }
                setPathLength(i);
              }, 0 * i);
            }
            setTimeout(() => {
              resolve(n);
            }, 0 * n);
          });
        })
        .then((n) => {
          setVisualized(!visualized);
          setTimeout(() => {
            setStart();
          }, n * 0);
        });
    }
  }, [props.start]);

  useEffect(() => {
    if (visualized) {
      for (let row of grid) {
        for (let node of row) {
          changeClassName(node, "");
        }
      }
      if (algorithm === "A*") {
        let { visitedNodes, shortestPath } = aStar(grid[startRow][startCol]);
        refresh(visitedNodes, shortestPath);
        setPathLength(shortestPath.length);
        setSteps(visitedNodes.length);
      } else if (algorithm === "Dijkstra") {
        let { visitedNodes, shortestPath } = dijkstra(grid[startRow][startCol]);
        refresh(visitedNodes, shortestPath);
        setPathLength(shortestPath.length);
        setSteps(visitedNodes.length);
      }
    }
  }, [grid]);

  useEffect(() => {
    setVisualized(false);
    if (grid.length!==0){
      const start = grid[startRow][startCol];
      const end = grid[endRow][endCol];
      patternVisualize(grid,props.pattern, maxRow, maxCol, start, end);
    }
      
  }, [props.pattern]);

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
