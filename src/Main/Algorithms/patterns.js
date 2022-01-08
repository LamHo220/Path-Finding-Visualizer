import { asyncFunction, buildBoundaries, reverseGrid } from "../misc/misc";
import NoWalls from "./NoWalls";
import RandomWalls from "./RandomWalls";
import RecursiveBacktracker from "D:/Projects/path-finding-visualizer/src/Main/Algorithms/RecursiveBacktracking.js";
import RecursiveDivision from "./RecursiveDivision";
import SimpleRandomWalls from "./SimpleRandomWalls";
import Prim from "./Prim";

const patternVisualize = (
  grid,
  pattern,
  maxRow,
  maxCol,
  start,
  end,
  duration
) => {
  switch (pattern) {
    case "Simple Random Walls":
      NoWalls(grid).then(() => {
        setTimeout(() => {
          SimpleRandomWalls(grid, 0.3);
        }, 10);
      });
      break;
    case "Recursive Division":
      NoWalls(grid)
        .then(() => {
          setTimeout(() => {
            buildBoundaries(grid, 50);
          }, 10);
        })
        .then(() => {
          setTimeout(() => {
            RecursiveDivision(grid, maxRow, maxCol);
          }, 50 * Math.max(maxRow, maxCol));
        });
      break;
    case "Random Walls":
      NoWalls(grid).then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            RandomWalls(grid, maxRow, maxCol);
          }, 10);
        });
      });
      break;
    case "Recursive Backtracking":
      NoWalls(grid)
        .then(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(reverseGrid(grid, maxRow, maxCol));
            }, 10);
          });
        })
        .then((n) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(RecursiveBacktracker(grid, maxRow, maxCol, start, end));
            }, (30 * n) / 12);
          });
        });
      break;
    case "Prim's Algorithm":
      NoWalls(grid)
        .then(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(reverseGrid(grid, maxRow, maxCol));
            }, 10);
          });
        })
        .then((n) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              Prim(grid, maxRow, maxCol);
            }, (30 * n) / 12);
          });
        });
      break;
    // case "Kruskal's Algorithm":
    //   NoWalls(grid)
    //     .then(() => {
    //       return new Promise((resolve, reject) => {
    //         resolve(reverseGrid(grid, maxRow, maxCol));
    //       });
    //     })
    //     .then((n) => {
    //       return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //           Kurskal(grid, maxRow, maxCol);
    //         }, (30 * n) / 12);
    //       });
    //     });
    //   break;
    default:
      NoWalls(grid);
      break;
  }
};
export default patternVisualize;
