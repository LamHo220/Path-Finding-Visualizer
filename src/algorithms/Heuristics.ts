export default {
  Manhattan: (dx: number, dy: number) => {
    return dx + dy;
  },
  Euclidean: (dx: number, dy: number) => {
    return Math.sqrt(dx * dx + dy * dy);
  },
  Octile: (dx: number, dy: number) => {
    const F = Math.SQRT2 - 1;
    return dx + dy + F * Math.min(dx, dy);
  },
  Chebyshev: (dx: number, dy: number) => {
    return Math.max(dx, dy);
  },
};
