import { changeClassName } from "../../utilities/utilities";

/**
 * A function that simply generate some wall on the grid.
 * @param {Object} input 
 * @param {Boolean} input.dark Whether currently is dark mode or not.
 * @param {Array<Array<Object>>} input.grid The grid to be used.
 * @param {Number} input.density The density of the walls.
 */
const SimpleRandomWalls = (input) => {
  const { dark, grid, density } = input;
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart || node.isEnd) {
        continue;
      }
      if (Math.random() < density) {
        node.isWall = true;
        changeClassName(dark, node);
      }
    }
  }
};

export default SimpleRandomWalls;
