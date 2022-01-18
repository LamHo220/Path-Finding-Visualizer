import React, { useState, useEffect } from "react";
import Node from "./Node";
import { Box } from "@mui/system";
import {
  getAlgoResult,
  generatePattern,
  changeClassName,
  refresh,
  delay,
  clearPath,
  initGrid,
  updateHeuristic,
  setNeightbours,
  visualize,
  rand,
  randomWeight,
  clearWeight,
} from "./utilities/utilities";

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
  const [prev, setPrev] = useState(null);
  const [visualized, setVisualized] = useState(false);

  const {
    allowDiagonal,
    heuristic,
    algorithm,
    setSteps,
    setPathLength,
    timeRatio,
    start,
    startMaze,
    setStart,
    setStartMaze,
    pattern,
    darkMode,
    clear,
    setClearPath,
    isWeighted,
  } = props;

  const [grid, setGrid] = useState(
    initGrid(
      maxRow,
      maxCol,
      { row: startRow, col: startCol },
      { row: endRow, col: endCol },
      heuristic,
      allowDiagonal
    )
  );

  const handleMouseDown = (event, row, col) => {
    let initNode = grid[row][col];
    if (!(initNode.isStart || initNode.isEnd)) {
      event = event || window.event;
      event.preventDefault();
      switch (event.buttons) {
        case 1:
          const isWall = initNode.isWall;
          setPrev(!isWall);
          initNode.isWall = !isWall;
          changeClassName(darkMode, initNode);
          break;
        default:
          break;
      }
    } else {
      switch (event.buttons) {
        case 1:
          setPrev(initNode);
        default:
          break;
      }
    }
  };

  const handleMouseEnter = (event, row, col) => {
    const node = grid[row][col];
    if (!(node.isStart || node.isEnd) && !node.isWall === prev) {
      event = event || window.event;
      event.preventDefault();
      switch (event.buttons ) {
        case 1:
          node.isWall = prev;
          changeClassName(darkMode, node);
          break;
        default:
          break;
      }
    } else if (node.isWall === prev) {
      // pass
    } else if (node.isStart || node.isEnd) {
      // pass
    } else if (prev !== null && !node.isWall) {
      // swap two node
      switch (event.buttons) {
        case 1:
          node.isStart = prev.isStart;
          node.isEnd = prev.isEnd;
          prev.isStart = false;
          prev.isEnd = false;
          if (node.isStart) {
            setStartRow(row);
            setStartCol(col);
          }
          if (node.isEnd) {
            setEndRow(row);
            setEndCol(col);
          }
          setPrev(node);
          break;

        default:
          break;
      }
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
    setGrid(grid.slice());
    setPrev(null);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setGrid(setNeightbours(grid.slice(), maxRow, maxCol, allowDiagonal));
  }, [allowDiagonal, heuristic]);

  useEffect(async () => {
    if (start) {
      setPathLength(0);
      setSteps(0);
      await clearPath(darkMode, grid);
      const startNode = grid[startRow][startCol];
      const endNode = grid[endRow][endCol];
      await visualize(
        algorithm,
        startNode,
        endNode,
        darkMode,
        10 * timeRatio,
        setSteps,
        setPathLength
      );
      setVisualized(true);
      setStart();
    }
  }, [start]);

  useEffect(() => {
    updateHeuristic(grid.slice(), heuristic, endRow, endCol);
    if (visualized) {
      clearPath(darkMode, grid);
      const startNode = grid[startRow][startCol];
      const endNode = grid[endRow][endCol];
      let res = getAlgoResult(algorithm)(startNode, endNode);
      refresh(darkMode, res.visitedNodes, res.shortestPath);
      setPathLength(res.shortestPath.length - 1);
      setSteps(res.visitedNodes.length - 1);
    }
  }, [grid]);

  useEffect(async () => {
    setVisualized(false);
    if (grid.length !== 0 && startMaze) {
      const start = grid[startRow][startCol];
      const end = grid[endRow][endCol];
      await generatePattern(
        darkMode,
        pattern,
        grid,
        maxRow,
        maxCol,
        start,
        end,
        10 * timeRatio,
        0.3
      );
      setStartMaze();
    }
  }, [startMaze]);

  useEffect(() => {
    if (clear) {
      clearPath(darkMode, grid);
      setVisualized(false);
      setClearPath(false);
    }
  }, [clear]);

  useEffect(() => {
    if (isWeighted) {
      setGrid(randomWeight(grid.slice()));
    } else {
      setGrid(clearWeight(grid.slice()));
    }
  }, [isWeighted]);

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{ cursor: "context-menu", alignContent: "center", textAlign: "center" }}
    >
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${maxCol}, 3vh)`}
        gridTemplateRows={`repeat(${maxRow}, 3vh)`}
      >
        {grid.map((row, y) => {
          return row.map((node, x) => {
            const { isStart, isEnd, isWall, isWeight } = node;
            return (
              <Node
                dark={darkMode}
                row={y}
                col={x}
                isWall={isWall}
                isStart={isStart}
                isEnd={isEnd}
                isWeight={isWeight}
                id={y + "-" + x}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            );
          });
        })}
      </Box>
    </div>
  );
};

export default Grid;
