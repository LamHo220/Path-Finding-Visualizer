import aStar from "./AStar";
import dijkstra from "./Dijkstra";

/**
 * Export a object that contains path finding algorithms.
 */
export default {
  "A*": aStar,
  Dijkstra: dijkstra,
};