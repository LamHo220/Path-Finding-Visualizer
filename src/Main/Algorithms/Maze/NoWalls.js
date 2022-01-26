import { changeClassName, delay } from "../../utilities/utilities";

/**
 * A function to clean the walls os of grid.
 * @param {Object} input The input for this function.
 * @param {Boolean} input.dark Whether currently is dark mode or not.
 * @param {Array<Array<Object>>} input.grid The grid to be cleaned.
 */
const NoWalls = async (input) => {
  const { dark, grid } = input;
  for (let row of grid) {
    for (let node of row) {
      if (node.isStart || node.isEnd) {
        continue;
      }
      node.isWall = false;
      changeClassName(dark, node);
    }
  }
  await delay(10);
};
export default NoWalls;
