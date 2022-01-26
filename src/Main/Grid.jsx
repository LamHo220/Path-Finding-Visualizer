import React, { useState, useEffect } from "react";
import Node from "./Node";
import { Box } from "@mui/system";
import {
  changeClassName,
  refresh,
  clearPath,
  initGrid,
  visualize,
  randomWeight,
  clearWeight,
} from "./utilities/utilities";
import Mazes from "./Algorithms/Maze/Mazes";
import PathFinding from "./Algorithms/PathFinding/PathFinding";

/**
 * A component of grid.
 * @param {Object} props The props of this component
 * @param {Boolean} props.allowDiagonal Whether we allow the diagonal move
 * @param {String} props.heuristic The selected heuristic.
 * @param {String} props.algorithm The selected algorithm.
 * @param {Number} props.timeRatio The time to be waited.
 * @param {Boolean} props.start Whether we should start visualizing the path finding algorithm.
 * @param {Boolean} props.startMaze Whether we should start visualizing the maze generating algorithm.
 * @param {String} props.pattern The selected pattern 
 * @param {Boolean} props.darkMode Whether currently is dark mode or not.
 * @param {Boolean} props.clear Whether we should clear the path or not.
 * @param {Boolean} props.isWeighted Whether the nodes should be weighted.
 * @param {Boolean} props.isBidirection Whether the algorithm should viualized in bi-direction.
 * @param {Function} props.onStart A function to change the start.
 * @param {Function} props.onClearPath A function to set clear the path.
 * @param {Function} props.onSteps A function to set the steps of the result.
 * @param {Function} props.onPathLength A function to set the length of the path of the result.
 * @returns {JSX.Element} A Grid component
 */
const Grid = (props) => {
  const style = getComputedStyle(document.body);
  // initalize the state
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
    isBidirection,
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
      { row: endRow, col: endCol }
    )
  );

  /**
   * A function that handle the mouse down event.
   * @param {Event} event The event of this handler.
   * @param {Number} row The row of the node.
   * @param {Number} col The column of the node.
   */
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

  /**
   * A function that handle the mouse enter event.
   * @param {Event} event The event of this handler.
   * @param {Number} row The row of the node.
   * @param {Number} col The column of the node.
   */
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

  /**
   * A function that handle the mouse up event.
   * @param {Number} row The row of the node.
   * @param {Number} col The column of the node.
   */
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

  /**
   * A function that handle the context menu.
   * @param {Event} event The event of this handler.
   */
  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  // if the start is changed and it is false, visualize.
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
        2 * timeRatio,
        isBidirection,
        allowDiagonal,
        heuristic
      );
      onPathLength(visited);
      onSteps(path);
      setVisualized(true);
      onStart();
    }
  }, [start]);

  // if the grid,algorithm, isBidirection, darkMode is changed and it is visualized, refresh.
  useEffect(() => {
    if (visualized) {
      clearPath(darkMode, grid);
      const startNode = grid[startRow][startCol];
      const endNode = grid[endRow][endCol];
      const input = {
        start: startNode,
        end: endNode,
        grid,
        isBidirection,
        allowDiagonal,
        heuristic,
      };
      let res = PathFinding[algorithm](input);
      refresh(darkMode, res.visitedNodes, res.shortestPath);
      onPathLength(res.shortestPath.length - 1);
      onSteps(res.visitedNodes.length - 1);
    }
  }, [grid, algorithm, isBidirection, darkMode]);

  // if the startMaze is changed and it is true, gnerate the maze.
  useEffect(async () => {
    setVisualized(false);
    if (startMaze) {
      const start = grid[startRow][startCol];
      const end = grid[endRow][endCol];
      const input = {
        dark: darkMode,
        grid,
        maxRow,
        maxCol,
        start,
        end,
        timeRatio: 2 * timeRatio,
        density: 0.3,
      };
      await Mazes[pattern](input);
      onStartMaze();
    }
  }, [startMaze]);

  // if the clear is changed and it is true, clear the path.
  useEffect(() => {
    if (clear) {
      clearPath(darkMode, grid);
      setVisualized(false);
      onClearPath(false);
    }
  }, [clear]);

  // if the isWeighted is changed and it is true, weight or unweight the grid.
  useEffect(() => {
    if (isWeighted) {
      setGrid((prevGrid) => randomWeight(prevGrid));
    } else {
      setGrid((prevGrid) => clearWeight(prevGrid));
    }
  }, [isWeighted]);

  return (
    <div onContextMenu={handleContextMenu}>
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${maxCol}, 1fr)`}
        gridTemplateRows={`repeat(${maxRow}, 3vh)`}
      >
        {grid.map((row, y) => {
          return row.map((node, x) => {
            const { isStart, isEnd, isWall } = node;
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
