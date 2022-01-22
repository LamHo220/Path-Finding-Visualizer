/**
 * The movement of row dirction.
 */
export const rowDir = { N: -1, S: 1, E: 0, W: 0 };

/**
 * The movement of column dirction.
 */
export const colDir = { N: 0, S: 0, E: 1, W: -1 };

/**
 * The heuristic functions.
 */
export const heuristics = {
  false: ["Euclidean", "Manhattan", "Octile", "Chebyshev"],
  true: ["Euclidean", "Octile", "Chebyshev"],
};

/**
 * The allowed algorithms.
 */
export const algorithms = ["A*", "Dijkstra"];

/**
 * The allowed maze patterns.
 */
export const patterns = [
  "No Walls",
  "Simple Random Walls",
  "Recursive Division",
  "Prim's Algorithm",
  "Kruskal's Algorithm",
  "Recursive Backtracking",
];