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
  generatePattern: (
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
        Mazes.SimpleRandomWalls(grid, density);
        break;
      case "Recursive Division":
        Mazes.RecursiveDivisionMaze(grid, maxRow, maxCol, duration);
        break;
      case "Recursive Backtracking":
        Mazes.RecursiveBacktrackingMaze(
          grid,
          maxRow,
          maxCol,
          start,
          end,
          duration
        );
        break;
      case "Prim's Algorithm":
        Mazes.PrimMaze(grid, maxRow, maxCol, duration);
        break;
      case "Kruskal's Algorithm":
        Mazes.Kruskal(grid, maxRow, maxCol, duration);
        break;
      default:
        Mazes.NoWalls(grid);
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
