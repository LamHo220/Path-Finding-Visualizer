/**
 * Export a object that contains the heuristic functions.
 */
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  Manhattan: (dx, dy) => {
    return dx + dy;
  },
  Euclidean: (dx, dy) => {
    return Math.sqrt(dx * dx + dy * dy);
  },
  Octile: (dx, dy) => {
    const F = Math.SQRT2 - 1;
    return (dx + dy) + F * Math.min(dx,dy);
  },
  Chebyshev: (dx, dy) => {
    return Math.max(dx, dy);
  },
};
