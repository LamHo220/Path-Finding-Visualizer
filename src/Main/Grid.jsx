import React, { useState, useEffect } from "react";
import Node from "./Node";
import { Box } from "@mui/system";
import {
  getAlgoResult,
  generatePattern,
  changeClassName,
  refresh,
  clearPath,
  initGrid,
  updateHeuristic,
  setNeightbours,
  visualize,
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
    timeRatio,
    start,
    startMaze,
    pattern,
    darkMode,
    clear,
    isWeighted,
    onStart,
    onStartMaze,
    onClearPath,
    onSteps,
    onPathLength,
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
    event = event || window.event;
    event.preventDefault();
    if (!(initNode.isStart || initNode.isEnd)) {
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
    event = event || window.event;
    event.preventDefault();
    if (!(node.isStart || node.isEnd) && !node.isWall === prev) {
      switch (event.buttons) {
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
      onPathLength(0);
      onSteps(0);
      await clearPath(darkMode, grid);
      const startNode = grid[startRow][startCol];
      const endNode = grid[endRow][endCol];
      const { visited, path } = await visualize(
        algorithm,
        grid,
        startNode,
        endNode,
        darkMode,
        10 * timeRatio,
        onSteps,
        onPathLength
      );
      onPathLength(visited);
      onSteps(path);
      setVisualized(true);
      onStart();
    }
  }, [start]);

  useEffect(() => {
    updateHeuristic(grid.slice(), heuristic, endRow, endCol);
    if (visualized) {
      clearPath(darkMode, grid);
      const startNode = grid[startRow][startCol];
      const endNode = grid[endRow][endCol];
      let res = getAlgoResult[algorithm](startNode, endNode, grid);
      refresh(darkMode, res.visitedNodes, res.shortestPath);
      onPathLength(res.shortestPath.length - 1);
      onSteps(res.visitedNodes.length - 1);
    }
  }, [grid, algorithm]);

  useEffect(async () => {
    setVisualized(false);
    if (grid.length !== 0 && startMaze) {
      const start = grid[startRow][startCol];
      const end = grid[endRow][endCol];
      const input = {
        dark:darkMode,
        grid,
        maxRow,
        maxCol,
        start,
        end,
        timeRatio: 10 * timeRatio,
        density: 0.3,
      };
      await generatePattern[pattern](input);
      onStartMaze();
    }
  }, [startMaze]);

  useEffect(() => {
    if (clear) {
      clearPath(darkMode, grid);
      setVisualized(false);
      onClearPath(false);
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
      style={{
        cursor: "context-menu",
        alignContent: "center",
        textAlign: "center",
      }}
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
