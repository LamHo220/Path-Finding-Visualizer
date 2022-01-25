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
 * @param {Object} flags The flags in the main
 * @param {Object} parameters The parameters for the algorithms.
 * @param {Function} props.onChangeIsStart A function to change the isStart.
 * @param {Function} props.onChangeIsStartMaze A function to change the isStartMaze.
 * @param {Function} props.onChangeIsClearPath A function to set clear the path.
 * @param {Function} props.onChangeNumberOfSteps A function to set the steps of the result.
 * @param {Function} props.onChangeLengthOfPath A function to set the length of the path of the result.
 * @param {Function} props.onChangeAllResults A function to set the steps of the result and the length of the path of the result.
 * @returns {JSX.Element} A Grid component
 */
const Grid = (props) => {
  const style = getComputedStyle(document.body);
  // initalize the state
  const height = Math.floor(
    (0.9 * window.innerHeight) / parseInt(style.getPropertyValue("--node-size"))
  );

  const width = Math.floor(
    window.innerWidth / parseInt(style.getPropertyValue("--node-size"))
  );
  const [maxDimension, setMaxDimension] = useState({
    maxRow: height - (height % 2 === 0 ? 1 : 2),
    maxCol: width - (width % 2 === 0 ? 1 : 2),
  });

  const [start, setStart] = useState({
    row: Math.floor(maxDimension.maxRow / 2),
    col: Math.floor(maxDimension.maxCol / 3),
  });

  const [end, setEnd] = useState({
    row: Math.floor(maxDimension.maxRow / 2),
    col: Math.floor((maxDimension.maxCol * 2) / 3),
  });

  const [prev, setPrev] = useState(null);
  const [visualized, setVisualized] = useState(false);

  const {
    animationSpeed,
    flags,
    parameters,
    onChangeIsStart,
    onChangeIsStartMaze,
    onChangeIsClearPath,
    onChangeNumberOfSteps,
    onChangeLengthOfPath,
    onChangeAllResults,
  } = props;

  const [grid, setGrid] = useState(
    initGrid(maxDimension.maxRow, maxDimension.maxCol, start, end)
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
      const isWall = initNode.isWall;
      setPrev(!isWall);
      initNode.isWall = !isWall;
      changeClassName(flags.isDarkMode, initNode);
    } else {
      setPrev(initNode);
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
      node.isWall = prev;
      changeClassName(flags.isDarkMode, node);
      setGrid(grid.slice());
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
      if (node.isStart) {
        setStart((r) => {
          r.row = row;
          r.col = col;
          return r;
        });
      }
      if (node.isEnd) {
        setEnd((r) => {
          r.row = row;
          r.col = col;
          return r;
        });
      }
      setPrev(node);
      setGrid(grid.slice());
    }
  };

  /**
   * A function that handle the mouse up event.
   * @param {Number} row The row of the node.
   * @param {Number} col The column of the node.
   */
  const handleMouseUp = (row, col) => {
    if (grid[row][col].isStart) {
      setStart((r) => {
        r.row = row;
        r.col = col;
        return r;
      });
    }
    if (grid[row][col].isEnd) {
      setEnd((r) => {
        r.row = row;
        r.col = col;
        return r;
      });
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
  useEffect(() => {
    async function visualIt() {
      if (flags.isStart) {
        onChangeLengthOfPath(0);
        onChangeNumberOfSteps(0);
        await clearPath(flags.isDarkMode, grid);
        const startNode = grid[start.row][start.col];
        const endNode = grid[end.row][end.col];
        const { visited, path } = await visualize(
          flags,
          parameters,
          grid,
          startNode,
          endNode,
          2 * animationSpeed
        );
        onChangeLengthOfPath(visited);
        onChangeNumberOfSteps(path);
        setVisualized(true);
        onChangeIsStart(false);
      }
    }
    visualIt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.isStart]);

  // if the grid,algorithm, isBidirection, darkMode is changed and it is visualized, refresh.
  useEffect(() => {
    clearPath(flags.isDarkMode, grid);
    if (visualized) {
      const startNode = grid[start.row][start.col];
      const endNode = grid[end.row][end.col];
      const input = {
        startNode,
        endNode,
        grid,
        isBiDirection: flags.isBiDirection,
        isDiagonal: flags.isDiagonal,
        heuristic: parameters.heuristic,
      };
      let res = PathFinding[parameters.algorithm](input);
      refresh(flags.isDarkMode, res.visitedNodes, res.shortestPath);
      onChangeAllResults(
        res.visitedNodes.length - 1,
        res.shortestPath.length - 1
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, parameters.algorithm, flags.isBiDirection, flags.isDarkMode]);

  // if the startMaze is changed and it is true, gnerate the maze.
  useEffect(() => {
    async function generateMaze() {
      setVisualized(false);
      if (flags.isStartMaze) {
        const startNode = grid[start.row][start.col];
        const endNode = grid[end.row][end.col];
        const input = {
          dark: flags.isDarkMode,
          grid,
          maxDimension,
          startNode,
          endNode,
          duration: 2 * animationSpeed,
          density: 0.3,
        };
        await Mazes[parameters.pattern](input);
        onChangeIsStartMaze();
      }
    }
    generateMaze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.isStartMaze]);

  // if the clear is changed and it is true, clear the path.
  useEffect(() => {
    if (flags.isClearPath) {
      clearPath(flags.isDarkMode, grid);
      setVisualized(false);
      onChangeIsClearPath(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.isClearPath]);

  // if the isWeighted is changed and it is true, weight or unweight the grid.
  useEffect(() => {
    clearPath(flags.isDarkMode, grid);
    if (flags.isWeightedGrid) {
      setGrid((prevGrid) => randomWeight(prevGrid));
    } else {
      setGrid((prevGrid) => clearWeight(prevGrid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags.isWeightedGrid]);

  const handleResize = () => {
    setVisualized(false);
    setMaxDimension((prev) => {
      const height = Math.floor(
        (0.9 * window.innerHeight) /
          parseInt(style.getPropertyValue("--node-size"))
      );
      const width = Math.floor(
        window.innerWidth / parseInt(style.getPropertyValue("--node-size"))
      );

      prev.maxRow = height - (height % 2 === 0 ? 1 : 2);
      prev.maxCol = width - (width % 2 === 0 ? 1 : 2);
      return prev;
    });
    setStart((prev) => {
      prev.row = Math.floor(maxDimension.maxRow / 2);
      prev.col = Math.floor(maxDimension.maxCol / 3);
      return prev;
    });
    setEnd((prev) => {
      prev.row = Math.floor(maxDimension.maxRow / 2);
      prev.col = Math.floor((maxDimension.maxCol * 2) / 3);
      return prev;
    });
    setGrid((prev) => {
      const newGrid = initGrid(
        maxDimension.maxRow,
        maxDimension.maxCol,
        start,
        end
      );
      prev = newGrid;
      return prev;
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onContextMenu={handleContextMenu}
      className={flags.isDisabled ? "pointer-events-none" : ""}
    >
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${maxDimension.maxCol}, 40px)`}
        gridTemplateRows={`repeat(${maxDimension.maxRow}, 40px)`}
        sx={{
          width: window.innerWidth,
        }}
      >
        {grid.map((row, y) => {
          return row.map((node, x) => {
            const { isStart, isEnd, isWall } = node;
            return (
              <Node
                dark={flags.isDarkMode}
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
