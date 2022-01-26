import aStar from "./AStar";
import dijkstra from "./Dijkstra";

/**
 * Export a object that contains path finding algorithms.
 */
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  "A*": aStar,
  Dijkstra: dijkstra,
};