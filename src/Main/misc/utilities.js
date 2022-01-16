import aStar from "../Algorithms/PathFinding/AStar";
import dijkstra from "../Algorithms/PathFinding/Dijkstra";
import Heuristic from "../Heuristic/Heuristic";
import Mazes from "../Maze/Mazes";

export default {
  getAlgoResult: (algorithm, start, end) => {
    switch (algorithm) {
      case "A*":
        return aStar(start, end);
      case "Dijkstra":
        return dijkstra(start, end);
      default:
        break;
    }
  },
  generatePattern: async (
    dark,
    pattern,
    grid,
    maxRow,
    maxCol,
    start = null,
    end = null,
    duration = 50,
    density = 0.3
  ) => {
    switch (pattern) {
      case "Simple Random Walls":
        await Mazes.SimpleRandomWalls(dark, grid, density);
        break;
      case "Recursive Division":
        await Mazes.RecursiveDivisionMaze(dark, grid, maxRow, maxCol, duration);
        break;
      case "Recursive Backtracking":
        await Mazes.RecursiveBacktrackingMaze(
          dark,
          grid,
          maxRow,
          maxCol,
          duration,
          start,
          end
        );
        break;
      case "Prim's Algorithm":
        await Mazes.PrimMaze(dark, grid, maxRow, maxCol, duration);
        break;
      case "Kruskal's Algorithm":
        await Mazes.Kruskal(dark, grid, maxRow, maxCol, duration);
        break;
      default:
        await Mazes.NoWalls(dark, grid);
        break;
    }
  },
  getHeuristic: (heuristic, dx, dy) => {
    switch (heuristic) {
      case "Manhattan":
        return Heuristic.Manhattan(dx, dy);
      case "Euclidean":
        return Heuristic.Euclidean(dx, dy);
      case "Octile":
        return Heuristic.Octile(dx, dy);
      case "Chebyshev":
        return Heuristic.Octile(dx, dy);
      default:
        break;
    }
  },
};
