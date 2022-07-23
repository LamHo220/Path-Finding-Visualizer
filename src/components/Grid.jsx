import React, { useState, useEffect } from "react";
import Node from "./Node";
import {
  changeClassName,
  refresh,
  clearPath,
  initGrid,
  visualize,
  randomWeight,
  clearWeight,
} from "../lib/utilities/utilities";
import Mazes from "../lib/Maze/Mazes";
import PathFinding from "../lib/PathFinding/PathFinding";
import { useContext } from "react";
import { useTheme } from "@emotion/react";
import { CurrentSelections } from "../context/Context";
function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}
/**
 * A component of grid.
 * @param {Number} props.animationSpeed The speed of animation
 * @returns {JSX.Element} A Grid component
 */
const Grid = (props) => {
  const theme = useTheme();
  const selections = useContext(CurrentSelections);
  const [maxDimension, setMaxDimension] = useState({
    maxRow: window.innerHeight > window.innerWidth?31:19,
    maxCol: window.innerHeight > window.innerWidth?19:49,
  });
  const [start, setStart] = useState({
    row: window.innerHeight > window.innerWidth?15:10,
    col: window.innerHeight > window.innerWidth?5:15,
  });

  const [end, setEnd] = useState({
    row: window.innerHeight > window.innerWidth?15:10,
    col: window.innerHeight > window.innerWidth?15:35,
  });

  if (window.innerHeight > window.innerWidth) {
    document
      .querySelector(":root")
      .style.setProperty("--node-size", "5vw");}

  const [prev, setPrev] = useState(null);
  const [visualized, setVisualized] = useState(false);

  const { animationSpeed } = props;

  useEffect(() => {
    
    const debouncedHandleResize = debounce(function handleResize() {
      if (window.innerHeight > window.innerWidth) {
        document
          .querySelector(":root")
          .style.setProperty("--node-size", "5vw");
        setMaxDimension({
          maxRow: 31,
          maxCol: 19,
        });
        setStart((p) => {
          return {
            row: 15,
            col: 5,
          };
        });

        setEnd((q) => {
          return {
            row: 15,
            col: 15,
          };
        });
        setGrid((prev) =>
          initGrid(
            31,
            19,
            {
              row: 15,
              col: 5,
            },
            {
              row: 15,
              col: 15,
            }
          )
        );
      } else {
        document.querySelector(":root").style.setProperty("--node-size", "2vw");
        setMaxDimension({
          maxRow: 19,
          maxCol: 49,
        });
        setStart((p) => {
          return {
            row: 10,
            col: 15,
          };
        });

        setEnd((q) => {
          return {
            row: 10,
            col: 35,
          };
        });
        setGrid((prev) =>
          initGrid(
            20,
            49,
            {
              row: 10,
              col: 15,
            },
            {
              row: 10,
              col: 35,
            }
          )
        );
      }
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

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
      changeClassName(theme.palette.mode === "dark", initNode);
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
      changeClassName(theme.palette.mode === "dark", node);
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
      if (selections.flags.isStart) {
        selections.setResults((prev) => {
          return { ...prev, numberOfSteps: 0 };
        });
        selections.setResults((prev) => {
          return { ...prev, lengthOfPath: 0 };
        });
        await clearPath(theme.palette.mode === "dark", grid);
        const startNode = grid[start.row][start.col];
        const endNode = grid[end.row][end.col];
        const { visited, path } = await visualize(
          {
            isDarkMode: theme.palette.mode === "dark",
            isDiagonal: selections.flags.isDiagonal,
            isBiDirection: selections.flags.isBiDirection,
          },
          selections.parameters,
          grid,
          startNode,
          endNode,
          2 * animationSpeed
        );
        selections.setResults((prev) => {
          return { ...prev, numberOfSteps: path };
        });
        selections.setResults((prev) => {
          return { ...prev, lengthOfPath: visited };
        });
        setVisualized(true);
        selections.setFlags((prev) => {
          return { ...prev, isStart: false, isDisabled: false };
        });
      }
    }
    visualIt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections.flags.isStart]);

  // if the grid,algorithm, isBidirection, darkMode is changed and it is visualized, refresh.
  useEffect(() => {
    clearPath(theme.palette.mode === "dark", grid);
    if (visualized) {
      const startNode = grid[start.row][start.col];
      const endNode = grid[end.row][end.col];
      const input = {
        startNode,
        endNode,
        grid,
        isBiDirection: selections.flags.isBiDirection,
        isDiagonal: selections.flags.isDiagonal,
        heuristic: selections.parameters.heuristic,
      };
      let res = PathFinding[selections.parameters.algorithm](input);
      refresh(
        theme.palette.mode === "dark",
        res.visitedNodes,
        res.shortestPath
      );
      selections.setResults((prev) => {
        return {
          numberOfSteps: res.visitedNodes.length - 1,
          lengthOfPath: res.shortestPath.length - 1,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    grid,
    selections.parameters.algorithm,
    selections.flags.isBiDirection,
    theme.palette.mode,
  ]);

  // if the startMaze is changed and it is true, gnerate the maze.
  useEffect(() => {
    async function generateMaze() {
      setVisualized(false);
      if (selections.flags.isStartMaze) {
        const startNode = grid[start.row][start.col];
        const endNode = grid[end.row][end.col];
        const input = {
          dark: theme.palette.mode === "dark",
          grid,
          maxDimension,
          startNode,
          endNode,
          duration: 2 * animationSpeed,
          density: 0.3,
        };
        await Mazes[selections.parameters.pattern](input);
        selections.setFlags((prev) => {
          return {
            ...prev,
            isStartMaze: false,
            isDisabled: false,
          };
        });
        selections.setParameters((prev) => {
          return {
            heuristic: selections.parameters.heuristic,
            pattern: "",
            algorithm: selections.parameters.algorithm,
          };
        });
      }
    }
    generateMaze();
    console.log(theme.palette.mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections.flags.isStartMaze]);

  // if the clear is changed and it is true, clear the path.
  useEffect(() => {
    if (selections.flags.isClearPath) {
      clearPath(theme.palette.mode === "dark", grid);
      setVisualized(false);
      selections.setFlags((prev) => {
        return { ...prev, isClearPath: true };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections.flags.isClearPath]);

  // if the isWeighted is changed and it is true, weight or un-weight the grid.
  useEffect(() => {
    clearPath(theme.palette.mode === "dark", grid);
    if (selections.flags.isWeightedGrid) {
      setGrid((prevGrid) => randomWeight(prevGrid));
    } else {
      setGrid((prevGrid) => clearWeight(prevGrid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections.flags.isWeightedGrid]);

  return (
    <div
      onContextMenu={handleContextMenu}
      className={(selections.flags.isDisabled ? "pointer-events-none" : "")+" table mx-auto"}
    >
      {grid.map((row, y) => {
        return (
          <div>
            {row.map((node, x) => {
              const { isStart, isEnd, isWall } = node;
              return (
                <Node
                  dark={theme.palette.mode === "dark"}
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
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
